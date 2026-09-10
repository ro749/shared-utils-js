// useRecordForm.js
import { useForm } from '@tanstack/react-form';
import axios from 'axios';
import { useState } from 'react';

function useRecordForm(config, defaultValues, reset) {
  if (config === undefined) {
    return {
      form: undefined,
      showSuccessDialog: undefined,
      setShowSuccessDialog: undefined,
    };
  }
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const form = useForm({
    defaultValues: defaultValues ?? Object.fromEntries(
      Object.keys(config.fields).map(key => [key, config.fields[key].type === 'image' ? null : ''])
    ),
    onSubmit: async ({ value, formApi }) => {
      const formData = new FormData();
      Object.entries(value).forEach(([key, val]) => {
        formData.append(key, val);
      });
      try {
        const res = await axios.post(`/form/${config.id}`, formData);
        if(res.data.redirect){
          window.location.href = res.data.redirect;
        }
        else{
          setShowSuccessDialog(true);
          config.onSuccess?.(value);
          formApi.reset();
          reset?.();
        }
      } catch (error) {
        const apiErrors = error.response?.data?.errors ?? {};
        console.log(error.response);
        formApi.setErrorMap({
          onSubmit: { fields: apiErrors, form: "Submission failed. Please correct the errors below." }
        });
      }
      
    }
  });

  return { form, showSuccessDialog, setShowSuccessDialog };
}

export default useRecordForm;