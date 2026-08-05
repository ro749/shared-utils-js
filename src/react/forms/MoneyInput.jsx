import React, { useRef } from 'react';
import Input from './Input';
const MoneyInput = ({value, ...props}) => {
    const ref = useRef(null);
    const cursorRef = useRef(0);
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
            cursor += 1;
            var newValue = value.current.slice(0, cursor) + e.key + value.current.slice(cursor);
        }
        else if(e.key == 'Backspace'){
            if(cursor == 0){
                return;
            }
            cursor -= 1;
            var newValue = value.current.slice(0, cursor) + value.current.slice(cursor + 1);
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
        value.current = newValue;
        ref.current.value = '$' + format(newValue);
    }

    return (
        <Input 
            ref={ref}
            onKeyDown={handleKeyDown}
            {...props}
        />
    )
}

export default MoneyInput;