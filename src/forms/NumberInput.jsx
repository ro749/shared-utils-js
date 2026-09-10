import React, { useRef } from 'react';
import Input from './Input';

const NumberInput = ({value, field, max, ...props}) => {
    const ref = useRef(null);
    const handleChange = (value) => {
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
            type="text"
            value={value}
            field={field}
            {...props}
            
        />
    )
}

export default NumberInput;