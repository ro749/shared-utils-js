import React, { useRef, useCallback } from 'react';
import ReactSelect from 'react-select';
import AsyncSelect from 'react-select/async';

const Select = ({value, field, options, dynamic, ...props}) => {
    const ref = useRef(null);

    const handleChange = (selectedOption) => {
        field.handleChange(selectedOption ? selectedOption.value : '');
    };
    const selectOptions = Object.keys(options).map(key => ({
            value: key,
            label: options[key]
        }));
    if(!dynamic){
        

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
                isSearchable={props.search !== undefined ? props.search : false}
            />
        )
    }
    else{
        const loadOptions = useCallback(async (inputValue) => {
            if (!inputValue || inputValue.length < 1) return [];
            try {
                const response = await axios.get('/form/' + props.form_id + '/search/' + props.id, {
                    params: {
                        q: inputValue
                    }
                });
                const data = await response.data;
                return Object.keys(data).map(key => ({
                    value: key,
                    label: data[key]
                }));
            } catch (error) {
                console.error('Error fetching options:', error);
                return [];
            }
        }, ['/form/' + props.form_id + '/search/' + props.name]);

        return (
            <AsyncSelect
                ref={ref}
                onChange={handleChange}
                loadOptions={loadOptions}
                defaultOptions={selectOptions}
                classNamePrefix="select"
                id={props.id}
                name={props.name}
                isClearable={props.isClearable !== undefined ? props.isClearable : true}
                isSearchable={true}
                placeholder="Buscar..."
            />
        );
    }

    
}

export default Select;
