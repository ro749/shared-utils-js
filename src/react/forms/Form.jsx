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
    valueRefs[key] = React.useRef(data.fields[key].type === 'image' ? null : '');
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    const newErrors = {};
    
    Object.keys(data.fields).forEach(key => {
      const fieldValue = valueRefs[key].current;
      const isImageField = data.fields[key].type === 'image';
      if (data.fields[key].required) {
        if (isImageField && fieldValue === null) {
          newErrors[key] = `${data.fields[key].label} is required`;
        } else if (!isImageField && !fieldValue) {
          newErrors[key] = `${data.fields[key].label} is required`;
        }
      }
      if (isImageField) {
        if (fieldValue) {
          formData.append(key, fieldValue);
        }
      } else {
        formData.append(key, fieldValue || '');
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    axios.post('/form/' + data.id, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(response => {
        setShowSuccessDialog(true);
        Object.keys(data.fields).forEach(key => {
          valueRefs[key].current = data.fields[key].type === 'image' ? null : '';
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
  console.log('working');
  console.log(data.layout && data.layout.length > 0);
  return (
    <>
      <form onSubmit={handleSubmit}>
        {data.layout && data.layout.length > 0 ? (
          data.layout.map((row, rowIndex) => (
            <div key={rowIndex} className={`input-row ${data.id}-input-row`}>
              {row.map(key => (
                <FormField
                  key={key}
                  field={data.fields[key]}
                  fieldName={key}
                  value={valueRefs[key]}
                  form_id={data.id}
                  error={errors[key]}
                  resetKey={resetKey}
                />
              ))}
            </div>
          ))
        ) : (
          Object.keys(data.fields).map(key => (
            <FormField
              key={key}
              field={data.fields[key]}
              fieldName={key}
              value={valueRefs[key]}
              form_id={data.id}
              error={errors[key]}
              resetKey={resetKey}
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