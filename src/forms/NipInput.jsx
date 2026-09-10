import React, { useRef } from 'react';
import Input from './Input';

const NipInput = ({value, field, max, ...props}) => {
    console.log('NipInput');
    const ref = useRef(null);
    const handleChange = (value) => {
        console.log(value);
        var newValue = value.replace(/\D/g, '');
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