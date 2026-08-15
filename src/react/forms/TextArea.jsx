import React, { useRef } from 'react';

export default function TextArea({ value, field, ...props }) {
    const ref = useRef(null);

    const handleChange = (e) => {
        field.handleChange(e.target.value);
        props.onChange && props.onChange(e.target.value);
    };

    return (
        <textarea
            ref={ref}
            onChange={handleChange}
            {...props}
        />
    );
}
