import React, { useRef } from 'react';
import Input from './Input';

const PercentInput = ({value,field,onChange, ...props}) => {
    const ref = useRef(null);
    const handleChange = (value) => {
        var val = value.replace(/[^0-9]/g, '');
        if(val[0] == '0'){
            val = val.slice(1);
        }
        if(field != undefined){
            field.handleChange(val);
        }
        if(onChange){
            onChange(val);
        }
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
            value={((typeof value == 'string' && value.includes(".")) || value%1 != 0 ? parseFloat(value).toFixed(2) : value)+'%'}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            {...props}
            
        />
    )
}

export default PercentInput;
