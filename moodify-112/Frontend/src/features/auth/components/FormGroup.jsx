import React from 'react'

const FormGroup = ({label,placeholder,onChange,value}) => {
  return (
    <div className='form-group'>

        <label>{label}</label>
        <input 
        onChange={onChange}
        value={value}
        type="text" id={label} name={label} placeholder={placeholder} />
    </div>
  )
}

export default FormGroup