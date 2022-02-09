import {React, useState, useEffect, useRef} from 'react'
import Alert from './alert'
import List from './list'
function App() {
  const input = useRef(null)
  const getLocalStorage = ()=>{
    let list = localStorage.getItem('list')
    if (list){
      return JSON.parse(localStorage.getItem('list'))
    } else return []
}
  const [alert, setAlert] = useState({
    show: false,
    type: '',
    msg: ''
  })
  const [list, setList] = useState(getLocalStorage)
  const [name, setName] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [editId, setEditId] = useState(null)
  const handleSubmit = (e)=>{
    e.preventDefault()
    if(!name){
      showAlert(true,'red','please enter a value')
    }
    else if (name && isEditing){
      showAlert(true, 'green', 'element edited successfully')
      setList(list.map((item)=>{
        if (item.id === editId){
          setName('')
          setIsEditing(false)
          return {...item, title:name}
        } 
        return item
      }))
      setName('')
      setEditId(null)
    } else {
      showAlert(true, 'green', 'element added to the list')
      const newItem = {id: new Date().getTime().toString(), title:name}
      setList([...list, newItem])
      setName('')
    }
  }
  const showAlert = (show=false, type='', msg='')=>{
    setAlert({show,type,msg})
  }
  const clearItem = (id)=>{
    const newList = list.filter((item)=> item.id !== id)
    setList(newList)
  }
  const editItem = (id)=>{
    const specificItem = list.find((item)=> item.id === id)
    setIsEditing(true)
    setEditId(id)
    setName(specificItem.title)
  }
  const removeAlert = ()=>{
    setAlert({show: false, type:'', msg:''})
  }
  useEffect(()=>{
    localStorage.setItem('list',JSON.stringify(list))
  },[list])
  useEffect(()=>{
    input.current.focus()
  },[list])
  return (
    <section>
      <form>
        <h3>Grocery bud</h3>
        {alert.show && <Alert {...alert} removeAlert={removeAlert} list={list}/>}
        <div className="form-control">
          <input type="text"
            value={name}
             placeholder='Ex. Eggs'
             ref={input}
             onChange={(e)=> setName(e.target.value)}/>
          <button type="submit" onClick={handleSubmit}>{isEditing? 'Edit': 'Submit'}</button>
        </div>
      </form>
      { list.length > 0 &&
      <div className="grocery-list">
        <List list={list} clearItem={clearItem} editItem={editItem}/>
        <button className='clear-all' onClick={(e)=>{
          e.preventDefault()
          setList([])
        }}>Clear All</button>
      </div>
      }
    </section>
  );
}

export default App;
