import React, { useRef } from 'react';
import Input from './Input';

const NipInput = ({value, max, ...props}) => {
    const ref = useRef(null);
    const handleChange = (e) => {
        const newValue = e.target.value.replace(/\D/g, ''); 
        if (max !== undefined && newValue.length > max) {
            value = value.substring(0, max);
        }
        if(props.onChange) {
            props.onChange(newValue);
        }
    };
 
    return (
        <Input 
            ref={ref}
            onChange={handleChange}
            type="password"
            {...props}
            
        />
    )
}

export default NipInput;