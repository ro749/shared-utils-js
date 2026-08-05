import React, { useRef } from 'react';

const Input = ({ref, value, ...props}) => {
      const internalRef = useRef(null);
        const inputRef = ref || internalRef;

    const handleChange = (e) => {
        if (value) {
            value.current = e.target.value;
        }
        if (props.onChange) {
            props.onChange(e);
        }
    };

    return (
        <input 
            ref={inputRef}
            onChange={handleChange}
            onKeyDown={props.onKeyDown}
            className="form-control"
            id={props.id}
            type={props.type || 'text'}
        />
    )
}

export default Input;
