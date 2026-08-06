import React from 'react';
import axios from 'axios';
import Input from './Input';
import MoneyInput from './MoneyInput';
import PercentInput from './PercentInput';
import NipInput from './NipInput';
import TextArea from './TextArea';
import PhoneInput from './PhoneInput';
import MailInput from './MailInput';
import Select from './Select';

export default function Form(data) {
  const INPUT_COMPONENTS = {
    text: Input,
    email: MailInput,
    tel: PhoneInput,
    password: Input,
    number: Input,
    money: MoneyInput,
    percentage: PercentInput,
    pin: NipInput,
    textarea: TextArea,
    selector: Select,
    selector_db: Select
  };
  const valueRefs = {};
  const [errors, setErrors] = React.useState({});
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

    axios.post('/form/' + data.id, formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {Object.keys(data.fields).map(key => {
        const Component = INPUT_COMPONENTS[data.fields[key].type];
        return (
        <label>
          {data.fields[key].label}{data.fields[key].required && <span>*</span>}
          <Component value={valueRefs[key]} id={key} name={key} form_id={data.id} max={data.fields[key].max} options={data.fields[key].options} search={data.fields[key].search} dynamic={data.fields[key].dynamic}/>
          {errors[key] && <span className="error-message">{errors[key]}</span>}
        </label>
        );
      })}
      <button type="submit">{data.submit_text}</button>
    </form>

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