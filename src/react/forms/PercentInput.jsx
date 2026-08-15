import React, { useRef } from 'react';
import Input from './Input';

const PercentInput = ({value,field, ...props}) => {
    const ref = useRef(null);
    const handleChange = (e) => {
        field.handleChange(e.target.value.replace(/[^0-9]/g, ''));
    };

    function handleKeyDown(e){
        if(e.key == 'Backspace' && ref.current.selectionStart == e.target.value.length){
            ref.current.setSelectionRange(e.target.value.length-1, e.target.value.length-1);
        }
    }
 
    return (
        <Input 
            ref={ref}
            field={field}
            value={value+'%'}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            {...props}
            
        />
    )
}

export default PercentInput;
