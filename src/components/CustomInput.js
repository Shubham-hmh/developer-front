import React from 'react'

const CustomInput = (props) => {
  const { type, name, placeholder, value, classname, onChange, onBlur ,disabled } = props;
  return (
    <div>
      <input id={name} type={type} name={name} placeholder={placeholder} value={value} onChange={onChange} disabled={disabled} onBlur={onBlur} className={`form-control ${classname}`} />
    </div>


  )
}

export default CustomInput