import React, { useRef } from 'react';
import axios from 'axios';
import FormField from './FormField';
import Dialog from '../dialogs/Dialog';
import { useForm, useSelector } from '@tanstack/react-form'
import useRecordForm from './useRecordForm';
export default function Form(config) {
  
  const inputRefs = useRef(new Set());
  function setInputRef(ref) {
    if (ref) {
      inputRefs.current.add(ref);
    }
  }
  const reset = () => { 
    inputRefs.current.forEach(input => input.reset?.());
  };
  const { form, showSuccessDialog, setShowSuccessDialog } = useRecordForm(config, undefined, reset);
  const isDirty = useSelector(form.store, (state) => state.isDirty)

  return (
    <>
      <form 
      onSubmit={async (e) => {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
      >
        {config.layout && config.layout.length > 0 ? (
          config.layout.map((row, rowIndex) => (
            <div key={rowIndex} className={`input-row ${config.id}-input-row`}>
              {row.map(key => (
                <FormField
                  form={form}
                  key={key}
                  field={config.fields[key]}
                  fieldName={key}
                  form_id={config.id}
                  ref={setInputRef}
                />
              ))}
            </div>
          ))
        ) : (
          Object.keys(config.fields).map(key => (
            <FormField
              form={form}
              key={key}
              field={config.fields[key]}
              fieldName={key}
              form_id={config.id}
              ref={setInputRef}
            />
          ))
        )}
        <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'row', gap: '6rem'}}>
          {config.reset_text && isDirty && <button type="button" onClick={() => {form.reset(); reset();}}>{config.reset_text}</button>}
          <button type="submit">{config.submit_text}</button>
        </div>
      </form>
      <Dialog 
        isOpen={showSuccessDialog} 
        onClose={() => setShowSuccessDialog(false)}
        title="Success"
      >
        {config.success_msg || 'Form submitted successfully'}
      </Dialog>
    </>
  );
};

/*export default function Form({ fields, onSubmit }) {
  const [form, setForm] = React.useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      {fields.map((field) => (
        <Input
          key={field.name}
          {...field}
          onChange={handleChange}
          value={form[field.name] || ''}
        />
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};
*/