import React,{useState} from "react";
import {AiFillDelete, AiFillEdit} from 'react-icons/ai'
const List = ({list, clearItem, editItem})=>{
        return (

            <div className="grocery-list">
 {list.map((item)=>{
     const {id, title} = item
     if (title !== ''){

         return (
             <article className="grocery-item" key={id}>
                 <p>{title}</p>
                 <div className="button-container">
                     <button onClick={()=> clearItem(id)}><AiFillDelete/></button>
                     <button onClick={()=> editItem(id)}><AiFillEdit/></button>
                 </div>
             </article>
             )
     }
        })}
        </div>
    )
    }
    


export default List