import React from 'react';
import Input from './Input';
import MoneyInput from './MoneyInput';
import PercentInput from './PercentInput';
import NumberInput from './NumberInput';
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
  number: NumberInput,
  money: MoneyInput,
  percentage: PercentInput,
  pin: NipInput,
  textarea: TextArea,
  selector: Select,
  selector_db: Select,
  image: ImageUploader,
  file: FileUploader
};

const FormField = ({ ref, form, field, fieldName, value, formId, error, resetKey, preview_table }) => {
  console.log(field);
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
              formId={formId} 
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
              placeholder={field.placeholder}
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
