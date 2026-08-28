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
import FileUploader from './FileUploader';

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
  image: ImageUploader,
  file: FileUploader
};

const FormField = ({ ref, form, field, fieldName, value, form_id, error, resetKey, preview_table }) => {
  const Component = INPUT_COMPONENTS[field.type];
  
  return (
    <form.Field 
      name={fieldName}
      children={(fieldProps) => {
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
              preview_table={field.preview_table}
              public_key={field.public_key}
              ref={ref}
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
