import React, { useRef } from 'react';
import Input from './Input';

const NipInput = ({value, field, max, ...props}) => {
    const ref = useRef(null);
    const handleChange = (e) => {
        var newValue = e.target.value.replace(/\D/g, '');
        if (max !== undefined && newValue.length > max) {
            newValue = newValue.substring(0, max);
            
        }
        field.handleChange(newValue);
    };
 
    return (
        <Input 
            ref={ref}
            onChange={handleChange}
            type="password"
            value={value}
            field={field}
            {...props}
            
        />
    )
}

export default NipInput;