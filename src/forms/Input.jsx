import React, { useRef, useEffect } from 'react';

const Input = ({ outRef=null, value, field, onChange, ...props }) => {
  const internalRef = useRef(null);
    const inputRef = outRef || internalRef;
    useEffect(() => {
      }, []);
    function handleChange(e){
        if(field != undefined){
            field.handleChange(e.target.value);
        }
        if(onChange != undefined){
            onChange(e.target.value);
        }
    }
    return (
        <input
            ref={inputRef}
            id={props.id}
            name={props.id}
            type={props.type || "text"}
            value={value}
            className="form-control"
            onChange={handleChange}
            placeholder={props.placeholder}
            onKeyDown={(e) => props.onKeyDown!=null && props.onKeyDown(e)}
        />
    )
}

export default Input;
