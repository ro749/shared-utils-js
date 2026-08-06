import React, { useRef } from 'react';
import Input from './Input';

const NipInput = ({value, max, ...props}) => {
    const ref = useRef(null);
    const handleChange = (e) => {
        value.current = value.current.replace(/\D/g, '');
        if (max !== undefined && value.current.length > max) {
            value.current = value.current.substring(0, max);
            ref.current.value = value.current;
        }
        if(props.onChange) {
            props.onChange(value.current);
        }
    };
 
    return (
        <Input 
            ref={ref}
            onChange={handleChange}
            type="password"
            value={value}
            {...props}
            
        />
    )
}

export default NipInput;