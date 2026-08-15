import React from 'react';
import axios from 'axios';
import FormField from './FormField';
import Dialog from './Dialog';
import { useForm } from '@tanstack/react-form'


export default function Form(data) {
  const [showSuccessDialog, setShowSuccessDialog] = React.useState(false);
  const form = useForm({
    defaultValues: Object.fromEntries(
      Object.keys(data.fields).map(key => [key, data.fields[key].type === 'image' ? null : ''])
    ),
    onSubmit: ({value,formApi}) => {
      console.log(value);
      axios.post(`/form/${data.id}`, value).
      then(() => {
        setShowSuccessDialog(true);
        form.reset();
      }).
      catch((error) => {
        const apiErrors = error.response.data.errors;
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
        {data.layout && data.layout.length > 0 ? (
          data.layout.map((row, rowIndex) => (
            <div key={rowIndex} className={`input-row ${data.id}-input-row`}>
              {row.map(key => (
                <FormField
                  form={form}
                  key={key}
                  field={data.fields[key]}
                  fieldName={key}
                  form_id={data.id}
                />
              ))}
            </div>
          ))
        ) : (
          Object.keys(data.fields).map(key => (
            <FormField
              form={form}
              key={key}
              field={data.fields[key]}
              fieldName={key}
              form_id={data.id}
            />
          ))
        )}
        <button type="submit">{data.submit_text}</button>
      </form>
      <Dialog 
        isOpen={showSuccessDialog} 
        onClose={() => setShowSuccessDialog(false)}
        title="Success"
      >
        {data.success_msg || 'Form submitted successfully'}
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