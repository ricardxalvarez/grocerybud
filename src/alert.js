import React, {useEffect} from "react";
const Alert = ({type,msg, removeAlert, list})=>{
useEffect(()=>{
    const timeout = setTimeout(()=>{
    return removeAlert()
    },3000) 
},[list])

return <p className={`alert alert-${type}`}>{msg}</p>

}

export default Alert