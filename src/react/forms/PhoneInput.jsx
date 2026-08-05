import React, { useRef } from 'react';
import Input from './Input';

const PhoneInput = ({value, ...props}) => {
    const ref = useRef(null);
    const handleChange = (e) => {
        value.current = value.current.replace(/\D/g, '');
        ref.current.value = value.current;
        if(props.onChange) {
            props.onChange(value.current);
        }
    };

    return (
        <Input 
            ref={ref}
            onChange={handleChange}
            type="tel"
            value={value}
            {...props}
        />
    )
}

export default PhoneInput;
