import React from 'react';
import Input from './Input';
import MoneyInput from './MoneyInput';
import PercentInput from './PercentInput';
import NipInput from './NipInput';
import TextArea from './TextArea';
import PhoneInput from './PhoneInput';
import MailInput from './MailInput';
import Select from './Select';

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

const FormField = ({ field, fieldName, value, form_id, error }) => {
  const Component = INPUT_COMPONENTS[field.type];

  return (
    <label>
      {field.label}{field.required && <span>*</span>}
      <Component 
        value={value} 
        id={fieldName} 
        name={fieldName} 
        form_id={form_id} 
        max={field.max} 
        options={field.options} 
        search={field.search} 
        dynamic={field.dynamic}
      />
      {error && <span className="error-message">{error}</span>}
    </label>
  );
};

export { INPUT_COMPONENTS };
export default FormField;
