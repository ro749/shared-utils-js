import React, { useRef } from 'react';

const Input = ({ref, value, field, ...props}) => {
    const internalRef = useRef(null);
        const inputRef = ref || internalRef;

    
    return (
        <input 
            ref={inputRef}
            id={props.id}
            name={props.id}
            type={props.type || "text"}
            value={value}
            className="form-control"
            onChange={(e) => props.onChange ? props.onChange(e) : field.handleChange(e.target.value)}
            onKeyDown={(e) => props.onKeyDown!=null && props.onKeyDown(e)}
        />
    )
}

export default Input;
