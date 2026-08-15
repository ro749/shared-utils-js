import React, { useRef } from 'react';
import Input from './Input';

const MailInput = ({value, field, ...props}) => {

    return (
        <Input 
            type="email"
            value={value}
            field={field}
            {...props}
        />
    )
}

export default MailInput;
