import React, { useRef } from 'react';
import ReactSelect from 'react-select';

const Select = ({value, options, ...props}) => {
    const ref = useRef(null);

    const handleChange = (selectedOption) => {
        if (value) {
            value.current = selectedOption ? selectedOption.value : '';
        }
        if (props.onChange) {
            props.onChange(selectedOption);
        }
    };
    const selectOptions = options ? (Array.isArray(options) ? options.map(opt => ({
        value: opt.value !== undefined ? opt.value : opt,
        label: opt.label !== undefined ? opt.label : opt
    })) : Object.keys(options).map(key => ({
        value: key,
        label: options[key]
    }))) : [];

    const selectedValue = value && value.current ? selectOptions.find(opt => opt.value === value.current) : null;

    return (
        <ReactSelect
            ref={ref}
            onChange={handleChange}
            options={selectOptions}
            classNamePrefix="select"
            id={props.id}
            name={props.name}
            isClearable={props.isClearable !== undefined ? props.isClearable : true}
        />
    )
}

export default Select;
