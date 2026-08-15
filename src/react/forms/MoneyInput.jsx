import React, { useRef, useEffect } from 'react';
import Input from './Input';
const MoneyInput = ({value, field, ...props}) => {
    const ref = useRef(null);
    const cursorRef = useRef(0);
    
    useEffect(() => {
        ref.current.setSelectionRange(cursorRef.current, cursorRef.current);
    }, [value]);

    function format(value) {
        if (value === '') return '';
        const [integer, decimal] = value.split('.');
        const integerWithFormat = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return decimal !== undefined ? `${integerWithFormat}.${decimal}` : integerWithFormat;
    }

    function handleKeyDown(e) {
        const teclasDeNavegacion = [
            'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown',
            'Home', 'End', 'Tab', 'Shift', 'Control', 'Meta'
        ];

        if (teclasDeNavegacion.includes(e.key)) {
            return; 
        }
        e.preventDefault();
        var cursor = e.target.selectionStart;
        const noNumericChars = e.target.value.slice(0, cursor).replace(/[0-9]/g, '').length;
        cursor -= noNumericChars;
        if(/^[0-9]$/.test(e.key)){
            var newValue = value.slice(0, cursor) + e.key + value.slice(cursor);
            cursor += 1;
        }
        else if(e.key == 'Backspace'){
            if(cursor == 0){
                return;
            }
            cursor -= 1;
            var newValue = value.slice(0, cursor) + value.slice(cursor + 1);
        }
        else{
            return;
        }
        var currentCount = 0;
        var currentPosition = 0;
        var formatedValue = '$'+format(newValue);
        while(currentCount != cursor && currentPosition <= formatedValue.length){
            var char = formatedValue[currentPosition];
            if(char == '.' || /^[0-9]$/.test(char) ){
                currentCount+=1;
            }
            currentPosition+=1;
        }
        if(currentCount == cursor){
            cursorRef.current = currentPosition;
        }
        field.handleChange(newValue);
    }
    return (
        <Input 
            ref={ref}
            onKeyDown={handleKeyDown}
            value={'$' + format(value)}
            field={field}
            {...props}
        />
    )
}

export default MoneyInput;