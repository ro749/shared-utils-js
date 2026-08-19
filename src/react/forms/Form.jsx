import React from 'react';
import axios from 'axios';
import FormField from './FormField';
import Dialog from './Dialog';
import { useForm } from '@tanstack/react-form'


export default function Form(config) {
  const [showSuccessDialog, setShowSuccessDialog] = React.useState(false);
  const form = useForm({
    defaultValues: Object.fromEntries(
      Object.keys(config.fields).map(key => [key, config.fields[key].type === 'image' ? null : ''])
    ),
    onSubmit: ({value,formApi}) => {
      console.log(value);
      axios.post(`/form/${config.id}`, value).
      then(() => {
        setShowSuccessDialog(true);
        form.reset();
      }).
      catch((error) => {
        const apiErrors = error.response.config.errors;
        const fieldErrors = Object.fromEntries(
          Object.entries(apiErrors).map(([field, messages]) => [field, messages])
        );

        formApi.setErrorMap({
          onSubmit: {
            fields: fieldErrors,
            form: "Submission failed. Please correct the errors below."
          }
        });
      });
    }
  });
  return (
    <>
      <form 
      onSubmit={(e) => {
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
            />
          ))
        )}
        <button type="submit">{config.submit_text}</button>
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