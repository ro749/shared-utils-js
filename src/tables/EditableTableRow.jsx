import React from 'react';
import useRecordForm from '../forms/useRecordForm';
import FormField from '../forms/FormField';
import IconamoonCheckCircle1 from '~icons/iconamoon/check-circle-1';
import IconamoonCloseCircle1 from '~icons/iconamoon/close-circle-1';

export default function EditableTableRow({ row, columns, formConfig, onCancel, onSaved }) {
  const { form } = useRecordForm(
    { ...formConfig, onSuccess: onSaved },
    row
  );

  return (
    <tr>
      {Object.keys(columns).map((key) => {
        const field = formConfig.fields[key];
        return (
          <td key={key}>
            {field
              ? <FormField form={form} field={field} fieldName={key} form_id={formConfig.id} />
              : row[key]}
          </td>
        );
      })}
      <td>
        <div className="edit-buttons">
          <button
            type="button"
            className="btn w-32-px h-32-px rounded-circle bg-success-focus text-success-main d-inline-flex align-items-center justify-content-center"
            onClick={() => form.handleSubmit()}
          >
            <IconamoonCheckCircle1 />
          </button>
          <button
            type="button"
            className="btn w-32-px h-32-px rounded-circle bg-danger-focus text-danger-main d-inline-flex align-items-center justify-content-center"
            onClick={onCancel}
          >
            <IconamoonCloseCircle1 />
          </button>
        </div>
      </td>
    </tr>
  );
}