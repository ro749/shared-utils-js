import React, { useRef } from 'react';
import Input from './Input';

const MailInput = ({value, ...props}) => {
    const ref = useRef(null);

    return (
        <Input 
            ref={ref}
            type="email"
            value={value}
            {...props}
        />
    )
}

export default MailInput;
