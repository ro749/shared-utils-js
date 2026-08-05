import React, { useRef } from 'react';
import Input from './Input';

const PercentInput = ({value, ...props}) => {
    const ref = useRef(null);
    const handleChange = (e) => {
        value.current = e.target.value.replace(/[^0-9]/g, '');
        ref.current.value = value.current + '%';
        if (props.onChange) {
            props.onChange(e);
        }
    };
 
    return (
        <Input 
            ref={ref}
            onChange={handleChange}
            {...props}
            
        />
    )
}

export default PercentInput;
