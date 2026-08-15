import React from 'react';
import Input from './Input';
import MoneyInput from './MoneyInput';
import PercentInput from './PercentInput';
import NipInput from './NipInput';
import TextArea from './TextArea';
import PhoneInput from './PhoneInput';
import MailInput from './MailInput';
import Select from './Select';
import ImageUploader from './ImageUploader';

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
  selector_db: Select,
  image: ImageUploader
};

const FormField = ({ form, field, fieldName, value, form_id, error, resetKey }) => {
  const Component = INPUT_COMPONENTS[field.type];

  return (
    <form.Field 
      name={fieldName}
      children={(fieldProps) => {
        console.log('fieldProps.state.meta');
        console.log(fieldProps.state.meta);
        return (
        <>
          <label>
            {field.label}{field.required && <span>*</span>}
            <Component 
              field={fieldProps}
              id={fieldName} 
              form_id={form_id} 
              max={field.max} 
              options={field.options} 
              search={field.search} 
              dynamic={field.dynamic}
              imageUrl={field.imageUrl}
              resetKey={resetKey}
              value={fieldProps.state.value}
            />
          </label>
          {fieldProps.state.meta.errors.length > 0 && (
            <div className="error-message">
              {fieldProps.state.meta.errors.map((error, index) => (
                <div key={index}>{error}</div>
              ))}
            </div>
          )}
        </>)}}
      />
  );
};

export { INPUT_COMPONENTS };
export default FormField;
