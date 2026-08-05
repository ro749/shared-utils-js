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
    selectorDB: Select
  };
  const valueRefs = {};
  Object.keys(data.fields).forEach(key => {
    valueRefs[key] = React.useRef('');
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {};
    Object.keys(data.fields).forEach(key => {
      formData[key] = valueRefs[key].current;
    });
    axios.post('/form/' + data.id, formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {Object.keys(data.fields).map(key => {
        const Component = INPUT_COMPONENTS[data.fields[key].type];
        return (
        <label>
          {data.fields[key].label}
          <Component value={valueRefs[key]} id={key} name={key} max={data.fields[key].max} options={data.fields[key].options} />
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