import React from 'react'
import "./style.css"
const Input = ({label,state,setState,placeholder,type}) => {
  return (
    <div className='input-wrapper'>
        <label>{label}</label>
        <div className='label-input'>
             <input
             value={state}
             placeholder={placeholder}
             onChange={(e)=>setState(e.target.value)}
             className='custom-input'
             type={type}>
                 
             </input>
        </div>
    </div>
  )
}

export default Input