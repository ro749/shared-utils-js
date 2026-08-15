import React, { useRef } from 'react';
import Input from './Input';

const PhoneInput = ({value, field, ...props}) => {
    const handleChange = (e) => {
        var newValue = e.target.value.replace(/\D/g, '');
        field.handleChange(newValue);
    };

    return (
        <Input 
            onChange={handleChange}
            type="tel"
            value={value}
            {...props}
        />
    )
}

export default PhoneInput;
