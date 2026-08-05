import React, { useRef } from 'react';

export default function TextArea({ value, onChange, ...props }) {
    const ref = useRef(null);

    const handleChange = (e) => {
        if (value) {
            value.current = e.target.value;
        }
        if (onChange) {
            onChange(e);
        }
    };

    return (
        <textarea
            ref={ref}
            onChange={handleChange}
            {...props}
        />
    );
}
