// useRecordForm.js
import { useForm } from '@tanstack/react-form';
import axios from 'axios';
import { useState } from 'react';

function useRecordForm(config, defaultValues, reset) {
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
        await axios.post(`/form/${config.id}`, formData);
        setShowSuccessDialog(true);
        config.onSuccess?.(value);
        formApi.reset();
        reset?.();
      } catch (error) {
        const apiErrors = error.response?.config?.errors ?? {};
        formApi.setErrorMap({
          onSubmit: { fields: apiErrors, form: "Submission failed. Please correct the errors below." }
        });
      }
      
    }
  });

  return { form, showSuccessDialog, setShowSuccessDialog };
}

export default useRecordForm;