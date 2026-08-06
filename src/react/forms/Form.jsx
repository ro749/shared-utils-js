import React from 'react';
import axios from 'axios';
import FormField from './FormField';
import Dialog from './Dialog';

export default function Form(data) {
  const valueRefs = {};
  const [errors, setErrors] = React.useState({});
  const [resetKey, setResetKey] = React.useState(0);
  const [showSuccessDialog, setShowSuccessDialog] = React.useState(false);
  Object.keys(data.fields).forEach(key => {
    valueRefs[key] = React.useRef('');
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {};
    const newErrors = {};
    
    Object.keys(data.fields).forEach(key => {
      formData[key] = valueRefs[key].current;
      if (data.fields[key].required && !valueRefs[key].current) {
        newErrors[key] = `${data.fields[key].label} is required`;
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    axios.post('/form/' + data.id, formData)
      .then(response => {
        setShowSuccessDialog(true);
        Object.keys(data.fields).forEach(key => {
          valueRefs[key].current = '';
        });
        setErrors({});
        setResetKey(prev => prev + 1);
      })
      .catch(error => {
        if (error.response && error.response.data && error.response.data.errors) {
          setErrors(error.response.data.errors);
        }
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {Object.keys(data.fields).map(key => (
          <FormField
            key={key}
            field={data.fields[key]}
            fieldName={key}
            value={valueRefs[key]}
            form_id={data.id}
            error={errors[key]}
          />
        ))}
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