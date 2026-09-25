// src/forms/Form.jsx
import React23, { useRef as useRef12 } from "react";
import axios4 from "axios";

// src/forms/FormField.jsx
import React22 from "react";

// src/forms/Input.jsx
import React, { useRef } from "react";
var Input = ({ ref, value, field, onChange, ...props }) => {
  const internalRef = useRef(null);
  const inputRef = ref || internalRef;
  function handleChange(e) {
    if (field != void 0) {
      field.handleChange(e.target.value);
    }
    if (onChange != void 0) {
      onChange(e.target.value);
    }
  }
  return /* @__PURE__ */ React.createElement(
    "input",
    {
      ref: inputRef,
      id: props.id,
      name: props.id,
      type: props.type || "text",
      value,
      className: "form-control",
      onChange: handleChange,
      placeholder: props.placeholder,
      onKeyDown: (e) => props.onKeyDown != null && props.onKeyDown(e)
    }
  );
};
var Input_default = Input;

// src/forms/MoneyInput.jsx
import React2, { useRef as useRef2, useEffect } from "react";
var MoneyInput = ({ value, field, onChange, ...props }) => {
  const ref = useRef2(null);
  const cursorRef = useRef2(0);
  useEffect(() => {
    ref.current.setSelectionRange(cursorRef.current, cursorRef.current);
  }, [value]);
  function format(value2) {
    return Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN"
    }).format(value2);
  }
  function handleKeyDown(e) {
    const teclasDeNavegacion = [
      "ArrowLeft",
      "ArrowRight",
      "ArrowUp",
      "ArrowDown",
      "Home",
      "End",
      "Tab",
      "Shift",
      "Control",
      "Meta"
    ];
    if (teclasDeNavegacion.includes(e.key)) {
      return;
    }
    e.preventDefault();
    var cursor = e.target.selectionStart;
    const noNumericChars = e.target.value.slice(0, cursor).replace(/[0-9]/g, "").length;
    if (typeof value !== "string") {
      value = value.toString();
    }
    cursor -= noNumericChars;
    if (/^[0-9]$/.test(e.key)) {
      var newValue = value.slice(0, cursor) + e.key + value.slice(cursor);
      cursor += 1;
    } else if (e.key == "Backspace") {
      if (cursor == 0) {
        return;
      }
      cursor -= 1;
      var newValue = value.slice(0, cursor) + value.slice(cursor + 1);
    } else {
      return;
    }
    var currentCount = 0;
    var currentPosition = 0;
    var formatedValue = "$" + format(newValue);
    while (currentCount != cursor && currentPosition <= formatedValue.length) {
      var char = formatedValue[currentPosition];
      if (char == "." || /^[0-9]$/.test(char)) {
        currentCount += 1;
      }
      currentPosition += 1;
    }
    if (currentCount == cursor) {
      cursorRef.current = currentPosition;
    }
    if (newValue[0] == "0") {
      newValue = newValue.slice(1);
    }
    if (field != void 0) {
      field.handleChange(newValue);
    }
    if (onChange != void 0) {
      onChange(newValue);
    }
  }
  return /* @__PURE__ */ React2.createElement(
    Input_default,
    {
      ref,
      onKeyDown: handleKeyDown,
      value: format(value),
      field,
      ...props
    }
  );
};
var MoneyInput_default = MoneyInput;

// src/forms/PercentInput.jsx
import React3, { useRef as useRef3 } from "react";
var PercentInput = ({ value, field, onChange, ...props }) => {
  const ref = useRef3(null);
  const handleChange = (value2) => {
    var val = value2.replace(/[^0-9]/g, "");
    if (val[0] == "0") {
      val = val.slice(1);
    }
    if (field != void 0) {
      field.handleChange(val);
    }
    if (onChange) {
      onChange(val);
    }
  };
  function handleKeyDown(e) {
    if (e.key == "Backspace" && ref.current.selectionStart == e.target.value.length) {
      ref.current.setSelectionRange(e.target.value.length - 1, e.target.value.length - 1);
    }
  }
  return /* @__PURE__ */ React3.createElement(
    Input_default,
    {
      ref,
      field,
      value: (typeof value == "string" && value.includes(".") || value % 1 != 0 ? parseFloat(value).toFixed(2) : value) + "%",
      onChange: handleChange,
      onKeyDown: handleKeyDown,
      ...props
    }
  );
};
var PercentInput_default = PercentInput;

// src/forms/NumberInput.jsx
import React4, { useRef as useRef4 } from "react";
var NumberInput = ({ value, field, max, ...props }) => {
  const ref = useRef4(null);
  const handleChange = (value2) => {
    var newValue = value2.replace(/\D/g, "");
    if (max !== void 0 && newValue.length > max) {
      newValue = newValue.substring(0, max);
    }
    field.handleChange(newValue);
  };
  return /* @__PURE__ */ React4.createElement(
    Input_default,
    {
      ref,
      onChange: handleChange,
      type: "text",
      value,
      field,
      ...props
    }
  );
};
var NumberInput_default = NumberInput;

// src/forms/NipInput.jsx
import React5, { useRef as useRef5 } from "react";
var NipInput = ({ value, field, max, ...props }) => {
  console.log("NipInput");
  const ref = useRef5(null);
  const handleChange = (value2) => {
    console.log(value2);
    var newValue = value2.replace(/\D/g, "");
    if (max !== void 0 && newValue.length > max) {
      newValue = newValue.substring(0, max);
    }
    field.handleChange(newValue);
  };
  return /* @__PURE__ */ React5.createElement(
    Input_default,
    {
      ref,
      onChange: handleChange,
      type: "password",
      value,
      field,
      ...props
    }
  );
};
var NipInput_default = NipInput;

// src/forms/TextArea.jsx
import React6, { useRef as useRef6 } from "react";
function TextArea({ value, field, ...props }) {
  const ref = useRef6(null);
  const handleChange = (e) => {
    field.handleChange(e.target.value);
    props.onChange && props.onChange(e.target.value);
  };
  return /* @__PURE__ */ React6.createElement(
    "textarea",
    {
      ref,
      onChange: handleChange,
      ...props
    }
  );
}

// src/forms/PhoneInput.jsx
import React7, { useRef as useRef7 } from "react";
var PhoneInput = ({ value, field, ...props }) => {
  const handleChange = (value2) => {
    var newValue = value2.replace(/\D/g, "");
    field.handleChange(newValue);
  };
  return /* @__PURE__ */ React7.createElement(
    Input_default,
    {
      onChange: handleChange,
      type: "tel",
      value,
      ...props
    }
  );
};
var PhoneInput_default = PhoneInput;

// src/forms/MailInput.jsx
import React8, { useRef as useRef8 } from "react";
var MailInput = ({ value, field, ...props }) => {
  return /* @__PURE__ */ React8.createElement(
    Input_default,
    {
      type: "email",
      value,
      field,
      ...props
    }
  );
};
var MailInput_default = MailInput;

// src/forms/Select.jsx
import React9, { useRef as useRef9, useCallback } from "react";
import ReactSelect from "react-select";
import AsyncSelect from "react-select/async";
var Select = ({ value, field, options, dynamic, ...props }) => {
  const ref = useRef9(null);
  const handleChange = (selectedOption) => {
    field.handleChange(selectedOption ? selectedOption.value : "");
  };
  const selectOptions = Object.keys(options).map((key) => ({
    value: key,
    label: options[key]
  }));
  if (!dynamic) {
    const selectedValue = value && value.current ? selectOptions.find((opt) => opt.value === value.current) : null;
    return /* @__PURE__ */ React9.createElement(
      ReactSelect,
      {
        ref,
        onChange: handleChange,
        options: selectOptions,
        classNamePrefix: "select",
        id: props.id,
        name: props.name,
        isClearable: props.isClearable !== void 0 ? props.isClearable : true,
        isSearchable: props.search !== void 0 ? props.search : false
      }
    );
  } else {
    const loadOptions = useCallback(async (inputValue) => {
      if (!inputValue || inputValue.length < 1) return [];
      try {
        const response = await axios.get("/form/" + props.form_id + "/search/" + props.id, {
          params: {
            q: inputValue
          }
        });
        const data = await response.data;
        return Object.keys(data).map((key) => ({
          value: key,
          label: data[key]
        }));
      } catch (error) {
        console.error("Error fetching options:", error);
        return [];
      }
    }, ["/form/" + props.form_id + "/search/" + props.name]);
    return /* @__PURE__ */ React9.createElement(
      AsyncSelect,
      {
        ref,
        onChange: handleChange,
        loadOptions,
        defaultOptions: selectOptions,
        classNamePrefix: "select",
        id: props.id,
        name: props.name,
        isClearable: props.isClearable !== void 0 ? props.isClearable : true,
        isSearchable: true,
        placeholder: "Buscar..."
      }
    );
  }
};
var Select_default = Select;

// src/forms/ImageUploader.jsx
import React10, { useRef as useRef10, useState, useEffect as useEffect2 } from "react";
var ImageUploader = ({ value, field, id, name, imageUrl }) => {
  const [preview, setPreview] = useState(imageUrl || null);
  const fileInputRef = useRef10(null);
  useEffect2(() => {
    setPreview(imageUrl || null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [imageUrl]);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      field.handleChange(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  return /* @__PURE__ */ React10.createElement(React10.Fragment, null, /* @__PURE__ */ React10.createElement(
    "input",
    {
      ref: fileInputRef,
      type: "file",
      id,
      name,
      accept: "image/*",
      onChange: handleFileChange,
      style: { display: "none" }
    }
  ), preview ? /* @__PURE__ */ React10.createElement(
    "img",
    {
      src: preview,
      alt: "Preview",
      className: "image-preview"
    }
  ) : /* @__PURE__ */ React10.createElement(
    "div",
    {
      className: "image-placeholder",
      style: {
        width: "200px",
        height: "200px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        borderRadius: "8px",
        border: "2px dashed #ccc",
        backgroundColor: "#f5f5f5"
      }
    },
    "Click to upload image"
  ));
};
var ImageUploader_default = ImageUploader;

// src/forms/FileUploader.jsx
import React21, { useRef as useRef11, useState as useState4, useImperativeHandle as useImperativeHandle2 } from "react";

// unplugin-icons:~icons/lucide/upload.jsx
import * as React11 from "react";
import { forwardRef } from "react";
var lucideUpload = ({
  title,
  titleId,
  ...props
}, ref) => /* @__PURE__ */ React11.createElement("svg", { viewBox: "0 0 24 24", width: "1.2em", height: "1.2em", ref, "aria-labelledby": titleId, ...props }, title ? /* @__PURE__ */ React11.createElement("title", { id: titleId }, title) : null, /* @__PURE__ */ React11.createElement("path", { fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 3v12m5-7l-5-5l-5 5m14 7v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }));
var ForwardRef = forwardRef(lucideUpload);
var upload_default = ForwardRef;

// src/forms/FileUploader.jsx
import Papa from "papaparse";
import axios3 from "axios";

// src/tables/Table.jsx
import React20, { useState as useState3, useEffect as useEffect3, useImperativeHandle } from "react";
import {
  createColumnHelper,
  globalFilteringFeature,
  rowPaginationFeature,
  rowSortingFeature,
  tableFeatures,
  useTable
} from "@tanstack/react-table";

// unplugin-icons:~icons/iconamoon/eye-light.jsx
import * as React12 from "react";
import { forwardRef as forwardRef2 } from "react";
var iconamoonEyeLight = ({
  title,
  titleId,
  ...props
}, ref) => /* @__PURE__ */ React12.createElement("svg", { viewBox: "0 0 24 24", width: "1.2em", height: "1.2em", ref, "aria-labelledby": titleId, ...props }, title ? /* @__PURE__ */ React12.createElement("title", { id: titleId }, title) : null, /* @__PURE__ */ React12.createElement("g", { fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.5 }, /* @__PURE__ */ React12.createElement("path", { d: "M15 12a3 3 0 1 1-6 0a3 3 0 0 1 6 0" }), /* @__PURE__ */ React12.createElement("path", { d: "M2 12c1.6-4.097 5.336-7 10-7s8.4 2.903 10 7c-1.6 4.097-5.336 7-10 7s-8.4-2.903-10-7" })));
var ForwardRef2 = forwardRef2(iconamoonEyeLight);
var eye_light_default = ForwardRef2;

// unplugin-icons:~icons/lucide/edit.jsx
import * as React13 from "react";
import { forwardRef as forwardRef3 } from "react";
var lucideEdit = ({
  title,
  titleId,
  ...props
}, ref) => /* @__PURE__ */ React13.createElement("svg", { viewBox: "0 0 24 24", width: "1.2em", height: "1.2em", ref, "aria-labelledby": titleId, ...props }, title ? /* @__PURE__ */ React13.createElement("title", { id: titleId }, title) : null, /* @__PURE__ */ React13.createElement("g", { fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2 }, /* @__PURE__ */ React13.createElement("path", { d: "M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" }), /* @__PURE__ */ React13.createElement("path", { d: "M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z" })));
var ForwardRef3 = forwardRef3(lucideEdit);
var edit_default = ForwardRef3;

// unplugin-icons:~icons/mingcute/delete-2-line.jsx
import * as React14 from "react";
import { forwardRef as forwardRef4 } from "react";
var mingcuteDelete2Line = ({
  title,
  titleId,
  ...props
}, ref) => /* @__PURE__ */ React14.createElement("svg", { viewBox: "0 0 24 24", width: "1.2em", height: "1.2em", ref, "aria-labelledby": titleId, ...props }, title ? /* @__PURE__ */ React14.createElement("title", { id: titleId }, title) : null, /* @__PURE__ */ React14.createElement("path", { fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeWidth: 2, d: "m5 6l.876 13.133A2 2 0 0 0 7.87 21h8.258a2 2 0 0 0 1.995-1.867L19 6M8 6l.772-2.316A1 1 0 0 1 9.721 3h4.558a1 1 0 0 1 .949.684L16 6m-6 5v5m4-5v5M4 6h16" }));
var ForwardRef4 = forwardRef4(mingcuteDelete2Line);
var delete_2_line_default = ForwardRef4;

// src/icons/IconMap.jsx
var IconMap = {
  "iconamoon:eye-light": eye_light_default,
  "lucide:edit": edit_default,
  "mingcute:delete-2-line": delete_2_line_default
};
var IconMap_default = IconMap;

// src/dialogs/Dialog.jsx
import React16 from "react";

// unplugin-icons:~icons/iconamoon/close.jsx
import * as React15 from "react";
import { forwardRef as forwardRef5 } from "react";
var iconamoonClose = ({
  title,
  titleId,
  ...props
}, ref) => /* @__PURE__ */ React15.createElement("svg", { viewBox: "0 0 24 24", width: "1.2em", height: "1.2em", ref, "aria-labelledby": titleId, ...props }, title ? /* @__PURE__ */ React15.createElement("title", { id: titleId }, title) : null, /* @__PURE__ */ React15.createElement("path", { fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "m7 7l10 10M7 17L17 7" }));
var ForwardRef5 = forwardRef5(iconamoonClose);
var close_default = ForwardRef5;

// src/dialogs/Dialog.jsx
var Dialog = ({ isOpen, onClose, title, children, actions }) => {
  if (!isOpen) return null;
  return /* @__PURE__ */ React16.createElement("div", { className: "dialog-overlay", onClick: onClose }, /* @__PURE__ */ React16.createElement("div", { className: "dialog-content", onClick: (e) => e.stopPropagation() }, actions && actions.length == 1 && /* @__PURE__ */ React16.createElement("div", { style: { display: "flex", justifyContent: "flex-end" } }, /* @__PURE__ */ React16.createElement("button", { onClick: onClose }, /* @__PURE__ */ React16.createElement(close_default, null))), title && /* @__PURE__ */ React16.createElement("div", { className: "dialog-header" }, title), /* @__PURE__ */ React16.createElement("div", { className: "dialog-body" }, children), /* @__PURE__ */ React16.createElement("div", { className: "dialog-footer" }, actions && actions.length > 0 ? /* @__PURE__ */ React16.createElement(React16.Fragment, null, actions.map((action, index) => /* @__PURE__ */ React16.createElement(
    "button",
    {
      key: index,
      onClick: action.onClick,
      className: "dialog-button " + (action.className || "")
    },
    action.label
  ))) : /* @__PURE__ */ React16.createElement("button", { onClick: onClose }, "Cerrar"))));
};
var Dialog_default = Dialog;

// src/tables/EditableTableRow.jsx
import React19 from "react";

// src/forms/useRecordForm.jsx
import { useForm } from "@tanstack/react-form";
import axios2 from "axios";
import { useState as useState2 } from "react";
function useRecordForm(config, defaultValues, reset) {
  if (config === void 0) {
    return {
      form: void 0,
      showSuccessDialog: void 0,
      setShowSuccessDialog: void 0
    };
  }
  const [showSuccessDialog, setShowSuccessDialog] = useState2(false);
  const form = useForm({
    defaultValues: defaultValues ?? Object.fromEntries(
      Object.keys(config.fields).map((key) => [key, config.fields[key].type === "image" ? null : ""])
    ),
    onSubmit: async ({ value, formApi }) => {
      var _a, _b, _c;
      const formData = new FormData();
      Object.entries(value).forEach(([key, val]) => {
        formData.append(key, val);
      });
      try {
        const res = await axios2.post(`/form/${config.id}`, formData);
        if (res.data.redirect) {
          window.location.href = res.data.redirect;
        } else {
          setShowSuccessDialog(true);
          (_a = config.onSuccess) == null ? void 0 : _a.call(config, value);
          formApi.reset();
          reset == null ? void 0 : reset();
        }
      } catch (error) {
        const apiErrors = ((_c = (_b = error.response) == null ? void 0 : _b.data) == null ? void 0 : _c.errors) ?? {};
        console.log(error.response);
        formApi.setErrorMap({
          onSubmit: { fields: apiErrors, form: "Submission failed. Please correct the errors below." }
        });
      }
    }
  });
  return { form, showSuccessDialog, setShowSuccessDialog };
}
var useRecordForm_default = useRecordForm;

// unplugin-icons:~icons/iconamoon/check-circle-1.jsx
import * as React17 from "react";
import { forwardRef as forwardRef6 } from "react";
var iconamoonCheckCircle1 = ({
  title,
  titleId,
  ...props
}, ref) => /* @__PURE__ */ React17.createElement("svg", { viewBox: "0 0 24 24", width: "1.2em", height: "1.2em", ref, "aria-labelledby": titleId, ...props }, title ? /* @__PURE__ */ React17.createElement("title", { id: titleId }, title) : null, /* @__PURE__ */ React17.createElement("g", { fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2 }, /* @__PURE__ */ React17.createElement("circle", { cx: 12, cy: 12, r: 9 }), /* @__PURE__ */ React17.createElement("path", { d: "m15 10l-4 4l-2-2" })));
var ForwardRef6 = forwardRef6(iconamoonCheckCircle1);
var check_circle_1_default = ForwardRef6;

// unplugin-icons:~icons/iconamoon/close-circle-1.jsx
import * as React18 from "react";
import { forwardRef as forwardRef7 } from "react";
var iconamoonCloseCircle1 = ({
  title,
  titleId,
  ...props
}, ref) => /* @__PURE__ */ React18.createElement("svg", { viewBox: "0 0 24 24", width: "1.2em", height: "1.2em", ref, "aria-labelledby": titleId, ...props }, title ? /* @__PURE__ */ React18.createElement("title", { id: titleId }, title) : null, /* @__PURE__ */ React18.createElement("g", { fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2 }, /* @__PURE__ */ React18.createElement("circle", { cx: 12, cy: 12, r: 9 }), /* @__PURE__ */ React18.createElement("path", { d: "m14 10l-4 4m0-4l4 4" })));
var ForwardRef7 = forwardRef7(iconamoonCloseCircle1);
var close_circle_1_default = ForwardRef7;

// src/tables/EditableTableRow.jsx
function EditableTableRow({ row, columns, formConfig, onCancel, onSaved }) {
  const { form } = useRecordForm_default(
    { ...formConfig, onSuccess: onSaved },
    row
  );
  return /* @__PURE__ */ React19.createElement("tr", null, Object.keys(columns).map((key) => {
    const field = formConfig.fields[key];
    return /* @__PURE__ */ React19.createElement("td", { key }, field ? /* @__PURE__ */ React19.createElement(FormField_default, { form, field, fieldName: key, form_id: formConfig.id }) : row[key]);
  }), /* @__PURE__ */ React19.createElement("td", null, /* @__PURE__ */ React19.createElement("div", { className: "edit-buttons" }, /* @__PURE__ */ React19.createElement(
    "button",
    {
      type: "button",
      className: "btn w-32-px h-32-px rounded-circle bg-success-focus text-success-main d-inline-flex align-items-center justify-content-center",
      onClick: () => form.handleSubmit()
    },
    /* @__PURE__ */ React19.createElement(check_circle_1_default, null)
  ), /* @__PURE__ */ React19.createElement(
    "button",
    {
      type: "button",
      className: "btn w-32-px h-32-px rounded-circle bg-danger-focus text-danger-main d-inline-flex align-items-center justify-content-center",
      onClick: onCancel
    },
    /* @__PURE__ */ React19.createElement(close_circle_1_default, null)
  ))));
}

// src/EnumManager.jsx
function configureEnums(enums) {
  window.enums = enums;
}
function getEnum(enumName, enumValue) {
  return window.enums[enumName][enumValue];
}

// src/tables/Table.jsx
function Table({ ref, ...config }) {
  var _a;
  const columnHelper = createColumnHelper();
  var cols = [];
  for (let key in config.columns) {
    const columnConfig = config.columns[key];
    var modifier = (data2) => data2.getValue();
    switch (columnConfig.modifier) {
      case "money":
        modifier = (data2) => Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(data2.getValue());
        break;
    }
    if (((_a = columnConfig.logic_modifier) == null ? void 0 : _a.type) == "options") {
      modifier = (data2) => {
        return /* @__PURE__ */ React20.createElement("div", { className: columnConfig.logic_modifier.options + "-" + data2.getValue() }, getEnum(columnConfig.logic_modifier.options, data2.getValue()));
      };
    }
    cols.push(
      columnHelper.accessor(
        key,
        {
          header: config.columns[key].display,
          cell: modifier
        }
      )
    );
  }
  if (config.buttons.length > 0) {
    cols.push(columnHelper.display({
      id: "actions",
      cell: (info) => /* @__PURE__ */ React20.createElement("div", { className: "normal-buttons", key: info.row.id }, config.buttons.map((button, index) => {
        const IconComponent = IconMap_default[button.icon];
        const Wrapper = button.view ? "a" : React20.Fragment;
        const isDeleteButton = button.button_class == "delete-btn";
        const isEditButton = button.button_class == "edit-btn";
        return /* @__PURE__ */ React20.createElement(Wrapper, { key: index, href: button.view ? button.view.url + "?" + button.view.name + "=" + info.row.original[button.view.param] : void 0 }, /* @__PURE__ */ React20.createElement(
          "button",
          {
            type: "button",
            className: `btn w-32-px h-32-px rounded-circle ${button.background_color_class} ${button.text_color_class} d-inline-flex align-items-center justify-content-center ${button.class ?? ""}`,
            onClick: isDeleteButton ? () => handleDeleteClick(info.row.original) : isEditButton ? () => handleEditClick(info.row.original) : void 0
          },
          /* @__PURE__ */ React20.createElement(IconComponent, null)
        ));
      }))
    }));
  }
  const columns = columnHelper.columns(cols);
  const features = tableFeatures({ rowPaginationFeature, globalFilteringFeature, rowSortingFeature });
  const pageSize = config.pageSize ?? config.page_length ?? 10;
  const [resetSignal, setResetSignal] = useState3(false);
  const [data, setData] = useState3([]);
  const [pagination, setPagination] = useState3({ pageIndex: 0, pageSize });
  const [globalFilter, setGlobalFilter] = useState3("");
  const [sorting, setSorting] = useState3([]);
  const [totalRows, setTotalRows] = useState3(0);
  const [editRow, setEditRow] = useState3(null);
  const [activeFilters, setActiveFilters] = useState3(() => {
    const initialFilters = {};
    if (config.filters) {
      for (const [key, filter] of Object.entries(config.filters)) {
        if (filter.default) {
          initialFilters[key] = filter.default;
        }
      }
    }
    return initialFilters;
  });
  const [deletePopup, setDeletePopup] = useState3({ show: false, warning: "", row: null });
  const table = useTable({
    features,
    data,
    columns,
    manualPagination: true,
    manualFiltering: true,
    manualSorting: true,
    rowCount: totalRows,
    state: { pagination, globalFilter, sorting },
    onPaginationChange: setPagination,
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting
  });
  useEffect3(() => {
    const controller = new AbortController();
    const params = new URLSearchParams();
    if (config.page_length != null) {
      params.set("page", pagination.pageIndex + 1);
      params.set("length", pagination.pageSize);
    }
    const searchParam = config.searchParam ?? "search[value]";
    if (globalFilter && searchParam) params.set(searchParam, globalFilter);
    if (sorting.length > 0) {
      const sort = sorting[0];
      params.set("order[0][column]", sort.id);
      params.set("order[0][dir]", sort.desc ? "desc" : "asc");
    }
    if (Object.keys(activeFilters).length > 0) {
      for (const [key, value] of Object.entries(activeFilters)) {
        params.set(`filters[${key}]`, value);
      }
    }
    fetch(`/table/${config.id}/get?${params}`, { signal: controller.signal }).then((res) => {
      if (!res.ok) throw new Error(`Unable to load table data (${res.status})`);
      return res.json();
    }).then((response) => {
      setData(response.data ?? []);
      setTotalRows(response.recordsFiltered ?? response.total ?? response.recordsTotal ?? 0);
    }).catch((error) => {
      if (error.name !== "AbortError") throw error;
    });
    return () => controller.abort();
  }, [config.id, pagination.pageIndex, pagination.pageSize, globalFilter, sorting, config.searchParam, activeFilters, resetSignal]);
  useEffect3(() => {
    setPagination((current) => current.pageIndex === 0 ? current : { ...current, pageIndex: 0 });
  }, [globalFilter, activeFilters]);
  const handleFilterClick = (filterKey, optionKey) => {
    setActiveFilters((prev) => {
      const isActive = prev[filterKey] === optionKey;
      const filterConfig = config.filters[filterKey];
      if (isActive) {
        if (filterConfig.default === "") {
          const { [filterKey]: removed, ...rest } = prev;
          return rest;
        } else {
          return prev;
        }
      } else {
        return { ...prev, [filterKey]: optionKey };
      }
    });
  };
  const handleDeleteClick = (row) => {
    var _a2, _b;
    let processedWarning = "";
    if (((_a2 = config.delete) == null ? void 0 : _a2.warning) == "") {
      processedWarning = "Seguro que quieres eliminar este registro?";
    } else {
      const warning = ((_b = config.delete) == null ? void 0 : _b.warning) ?? "";
      const matches = [...warning.matchAll(/\{(.*?)\}/g)];
      const args = matches.map((match) => match[1].trim());
      processedWarning = warning;
      for (const arg of args) {
        processedWarning = processedWarning.replace("{" + arg + "}", row[arg]);
      }
    }
    setDeletePopup({ show: true, warning: processedWarning, row });
  };
  const handleConfirmDelete = () => {
    var _a2;
    const formData = new FormData();
    formData.append("id", deletePopup.row.id);
    formData.append("_token", ((_a2 = document.querySelector('meta[name="csrf-token"]')) == null ? void 0 : _a2.getAttribute("content")) ?? "");
    Object.entries(activeFilters).forEach(([key, value]) => {
      formData.append(`filters[${key}]`, value);
    });
    fetch(`/table/${config.id}/delete`, {
      method: "POST",
      body: formData
    }).then((res) => {
      if (!res.ok) throw new Error(`Unable to delete row (${res.status})`);
      return res.json();
    }).then(() => {
      setDeletePopup({ show: false, warning: "", row: null });
      setData((prevData) => prevData.filter((item) => item.id !== deletePopup.row.id));
      setTotalRows((prev) => Math.max(0, prev - 1));
    }).catch((error) => {
      console.error("Delete error:", error);
    });
  };
  const handleEditClick = (row) => {
    setEditRow(row);
  };
  const editData = (newData, publicId) => {
    var updatedData = [];
    for (var i = 0; i < newData.length; i++) {
      for (var j = 0; j < data.length; j++) {
        if (data[j][publicId] == newData[i][publicId]) {
          var updatedValue = { ...data[j] };
          Object.entries(newData[i]).forEach(([key, value]) => {
            updatedValue["new_" + key] = value;
          });
          updatedData.push(updatedValue);
          break;
        }
      }
    }
    setData(updatedData);
  };
  const reset = () => {
    setResetSignal((prev) => !prev);
  };
  useImperativeHandle(ref, () => ({
    editData,
    reset
  }));
  return /* @__PURE__ */ React20.createElement("div", { className: "dt-container" }, config.page_length != null && /* @__PURE__ */ React20.createElement("div", { className: "dt-layout-row" }, /* @__PURE__ */ React20.createElement("div", { className: "dt-layout-cell dt-layout-start" }, /* @__PURE__ */ React20.createElement(
    "select",
    {
      value: pagination.pageSize,
      onChange: (event) => table.setPageSize(Number(event.target.value))
    },
    (config.pageSizes ?? [10, 25, 50, 100]).map((size) => /* @__PURE__ */ React20.createElement("option", { key: size, value: size }, size, " per page"))
  )), /* @__PURE__ */ React20.createElement("div", { className: "dt-layout-cell dt-layout-end", style: { display: "flex", flexDirection: "row", justifyContent: "flex-end", gap: "6px" } }, config.filters && Object.entries(config.filters).map(([filterKey, filter]) => /* @__PURE__ */ React20.createElement("div", { key: filterKey, className: "filter", style: { display: "flex", flexDirection: "row", justifyContent: "flex-end", gap: "8px", marginLeft: "8px", alignItems: "center" } }, /* @__PURE__ */ React20.createElement("p", { style: { margin: "0" } }, filter.display), filter.filters && Object.entries(filter.filters).map(([optionKey, option]) => /* @__PURE__ */ React20.createElement(
    "button",
    {
      key: optionKey,
      id: `f-${filterKey}-${optionKey}`,
      className: `filter-button btn btn-outline-neutral-900 no-hover ${activeFilters[filterKey] === optionKey ? "active" : ""}`,
      onClick: () => handleFilterClick(filterKey, optionKey)
    },
    option.display
  )))), /* @__PURE__ */ React20.createElement("div", { className: "dt-search" }, /* @__PURE__ */ React20.createElement("label", null, "Buscar:"), /* @__PURE__ */ React20.createElement(
    "input",
    {
      type: "search",
      value: globalFilter,
      placeholder: config.searchPlaceholder ?? "Search...",
      "aria-label": config.searchLabel ?? "Search table",
      onChange: (event) => table.setGlobalFilter(event.target.value)
    }
  )))), /* @__PURE__ */ React20.createElement("table", { className: "table bordered-table mb-0 dataTable", style: { width: "97.2222%" } }, /* @__PURE__ */ React20.createElement("thead", null, table.getHeaderGroups().map((headerGroup) => /* @__PURE__ */ React20.createElement("tr", { key: headerGroup.id }, headerGroup.headers.map((header) => /* @__PURE__ */ React20.createElement(
    "th",
    {
      key: header.id,
      onClick: header.column.getToggleSortingHandler(),
      style: { cursor: header.column.getCanSort() ? "pointer" : "default" },
      className: `dt-orderable-asc dt-orderable-desc ${header.column.getIsSorted() ? header.column.getIsSorted() == "desc" ? "dt-ordering-desc" : "dt-ordering-asc" : ""}`
    },
    header.isPlaceholder ? null : /* @__PURE__ */ React20.createElement("div", null, /* @__PURE__ */ React20.createElement(table.FlexRender, { header }), config.page_length != null && /* @__PURE__ */ React20.createElement("span", { className: "dt-column-order" }))
  ))))), /* @__PURE__ */ React20.createElement("tbody", null, table.getRowModel().rows.map((row) => {
    return editRow != null && editRow.id == row.original.id ? /* @__PURE__ */ React20.createElement(
      EditableTableRow,
      {
        key: row.id,
        row: row.original,
        columns: config.columns,
        formConfig: config.form,
        onCancel: () => setEditRow(null),
        onSaved: (saved) => {
          setEditRow(null);
          setData((prev) => prev.map((d) => d.id === saved.id ? { ...d, ...saved } : d));
        }
      }
    ) : /* @__PURE__ */ React20.createElement("tr", { key: row.id }, row.getAllCells().map((cell) => /* @__PURE__ */ React20.createElement("td", { key: cell.id }, /* @__PURE__ */ React20.createElement(table.FlexRender, { cell }))));
  })), /* @__PURE__ */ React20.createElement("tfoot", null, table.getFooterGroups().map((footerGroup) => /* @__PURE__ */ React20.createElement("tr", { key: footerGroup.id }, footerGroup.headers.map((header) => /* @__PURE__ */ React20.createElement("th", { key: header.id }, header.isPlaceholder ? null : /* @__PURE__ */ React20.createElement(table.FlexRender, { footer: header }))))))), config.page_length != null && /* @__PURE__ */ React20.createElement("div", { className: "dt-layout-row" }, /* @__PURE__ */ React20.createElement("div", { className: "dt-layout-cell dt-layout-start" }, "Mostrando ", totalRows === 0 ? 0 : pagination.pageIndex * pagination.pageSize + 1, " a ", Math.min((pagination.pageIndex + 1) * pagination.pageSize, totalRows), " de ", totalRows, " registros"), /* @__PURE__ */ React20.createElement("div", { className: "dt-layout-cell dt-layout-end" }, /* @__PURE__ */ React20.createElement("div", { className: "dt-paging", style: { display: "flex", gap: "4px", alignItems: "center" } }, /* @__PURE__ */ React20.createElement(
    "button",
    {
      type: "button",
      onClick: () => table.firstPage(),
      disabled: !table.getCanPreviousPage(),
      style: { padding: "6px 12px", borderRadius: "4px", border: "1px solid #d1d5db", background: "#f3f4f6", cursor: !table.getCanPreviousPage() ? "not-allowed" : "pointer", opacity: !table.getCanPreviousPage() ? 0.5 : 1 }
    },
    "Primera"
  ), /* @__PURE__ */ React20.createElement(
    "button",
    {
      type: "button",
      onClick: () => table.previousPage(),
      disabled: !table.getCanPreviousPage(),
      style: { padding: "6px 12px", borderRadius: "4px", border: "1px solid #d1d5db", background: "#f3f4f6", cursor: !table.getCanPreviousPage() ? "not-allowed" : "pointer", opacity: !table.getCanPreviousPage() ? 0.5 : 1 }
    },
    "Anterior"
  ), (() => {
    const pageCount = table.getPageCount();
    const currentPage = pagination.pageIndex + 1;
    const pages = [];
    if (pageCount <= 7) {
      for (let i = 1; i <= pageCount; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 4) {
        for (let i = 1; i <= 5; i++) pages.push(i);
        pages.push("...");
        pages.push(pageCount);
      } else if (currentPage >= pageCount - 3) {
        pages.push(1);
        pages.push("...");
        for (let i = pageCount - 4; i <= pageCount; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push("...");
        pages.push(pageCount);
      }
    }
    return pages.map((page, index) => {
      if (page === "...") {
        return /* @__PURE__ */ React20.createElement("span", { key: `ellipsis-${index}`, style: { padding: "6px 12px" } }, "...");
      }
      const isActive = page === currentPage;
      return /* @__PURE__ */ React20.createElement(
        "button",
        {
          key: page,
          type: "button",
          onClick: () => table.setPageIndex(page - 1),
          style: {
            padding: "6px 12px",
            borderRadius: "4px",
            border: "1px solid #d1d5db",
            background: isActive ? "#3b82f6" : "#f3f4f6",
            color: isActive ? "#ffffff" : "#374151",
            cursor: "pointer",
            fontWeight: isActive ? "600" : "400"
          }
        },
        page
      );
    });
  })(), /* @__PURE__ */ React20.createElement(
    "button",
    {
      type: "button",
      onClick: () => table.nextPage(),
      disabled: !table.getCanNextPage(),
      style: { padding: "6px 12px", borderRadius: "4px", border: "1px solid #d1d5db", background: "#f3f4f6", cursor: !table.getCanNextPage() ? "not-allowed" : "pointer", opacity: !table.getCanNextPage() ? 0.5 : 1 }
    },
    "Siguiente"
  ), /* @__PURE__ */ React20.createElement(
    "button",
    {
      type: "button",
      onClick: () => table.lastPage(),
      disabled: !table.getCanNextPage(),
      style: { padding: "6px 12px", borderRadius: "4px", border: "1px solid #d1d5db", background: "#f3f4f6", cursor: !table.getCanNextPage() ? "not-allowed" : "pointer", opacity: !table.getCanNextPage() ? 0.5 : 1 }
    },
    "\xDAltima"
  )))), /* @__PURE__ */ React20.createElement(
    Dialog_default,
    {
      isOpen: deletePopup.show,
      onClose: () => setDeletePopup({ show: false, warning: "", row: null }),
      title: "Confirmar eliminacio\u0301n",
      actions: [
        {
          label: "Cancelar",
          onClick: () => setDeletePopup({ show: false, warning: "", row: null }),
          className: "btn-warning-600"
        },
        {
          label: "Eliminar",
          onClick: () => handleConfirmDelete(),
          className: "btn-danger-600"
        }
      ]
    },
    deletePopup.warning
  ));
}

// src/forms/FileUploader.jsx
var FileUploader = ({ ref, value, field, accept, ...props }) => {
  console.log(props);
  const inputRef = useRef11(null);
  const tableRef = useRef11(null);
  const [preview, setPreview] = useState4(false);
  const reset = () => {
    tableRef.current.reset();
    setPreview(false);
  };
  useImperativeHandle2(ref, () => ({
    reset
  }));
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    field.handleChange(file);
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
      complete: (results) => {
        tableRef.current.editData(results.data, props.public_id);
        setPreview(true);
      },
      error: (err) => {
        console.error("Error al parsear CSV:", err);
      }
    });
  };
  return /* @__PURE__ */ React21.createElement(React21.Fragment, null, /* @__PURE__ */ React21.createElement("div", { style: { display: !preview ? "block" : "none" } }, /* @__PURE__ */ React21.createElement("div", { className: "dropzone" }, /* @__PURE__ */ React21.createElement("div", { className: "dropzone-icon" }, /* @__PURE__ */ React21.createElement(upload_default, null)), /* @__PURE__ */ React21.createElement("p", { className: "dropzone-title" }, "Arrastra archivos aqu\xED o da click para seleccionarlos")), /* @__PURE__ */ React21.createElement(
    "input",
    {
      style: { display: "none" },
      ref: inputRef,
      onChange: (e) => handleFileChange(e),
      type: "file",
      accept: ".csv",
      ...props
    }
  )), /* @__PURE__ */ React21.createElement("div", { style: { display: preview ? "block" : "none" } }, /* @__PURE__ */ React21.createElement(Table, { ref: tableRef, ...props.preview_table })));
};
var FileUploader_default = FileUploader;

// src/forms/FormField.jsx
var INPUT_COMPONENTS = {
  text: Input_default,
  email: MailInput_default,
  tel: PhoneInput_default,
  password: Input_default,
  number: NumberInput_default,
  money: MoneyInput_default,
  percentage: PercentInput_default,
  pin: NipInput_default,
  textarea: TextArea,
  selector: Select_default,
  selector_db: Select_default,
  image: ImageUploader_default,
  file: FileUploader_default
};
var FormField = ({ ref, form, field, fieldName, value, formId, error, resetKey, preview_table }) => {
  console.log(field);
  const Component = INPUT_COMPONENTS[field.type];
  return /* @__PURE__ */ React22.createElement(
    form.Field,
    {
      name: fieldName,
      children: (fieldProps) => {
        return /* @__PURE__ */ React22.createElement(React22.Fragment, null, /* @__PURE__ */ React22.createElement("label", null, field.label, field.required && /* @__PURE__ */ React22.createElement("span", null, "*"), /* @__PURE__ */ React22.createElement(
          Component,
          {
            field: fieldProps,
            id: fieldName,
            formId,
            max: field.max,
            options: field.options,
            search: field.search,
            dynamic: field.dynamic,
            imageUrl: field.imageUrl,
            resetKey,
            value: fieldProps.state.value,
            preview_table: field.preview_table,
            public_key: field.public_key,
            ref,
            placeholder: field.placeholder
          }
        )), fieldProps.state.meta.errors.length > 0 && /* @__PURE__ */ React22.createElement("div", { className: "error-message" }, fieldProps.state.meta.errors.map((error2, index) => /* @__PURE__ */ React22.createElement("div", { key: index }, error2))));
      }
    }
  );
};
var FormField_default = FormField;

// src/forms/Form.jsx
import { useForm as useForm2, useSelector } from "@tanstack/react-form";
function Form(config) {
  const inputRefs = useRef12(/* @__PURE__ */ new Set());
  function setInputRef(ref) {
    if (ref) {
      inputRefs.current.add(ref);
    }
  }
  const reset = () => {
    inputRefs.current.forEach((input) => {
      var _a;
      return (_a = input.reset) == null ? void 0 : _a.call(input);
    });
  };
  const { form, showSuccessDialog, setShowSuccessDialog } = useRecordForm_default(config, void 0, reset);
  const isDirty = useSelector(form.store, (state) => state.isDirty);
  return /* @__PURE__ */ React23.createElement(React23.Fragment, null, /* @__PURE__ */ React23.createElement(
    "form",
    {
      id: config.id,
      onSubmit: async (e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }
    },
    config.layout && config.layout.length > 0 ? config.layout.map((row, rowIndex) => /* @__PURE__ */ React23.createElement("div", { key: rowIndex, className: `input-row ${config.id}-input-row` }, row.map((key) => /* @__PURE__ */ React23.createElement(
      FormField_default,
      {
        form,
        key,
        field: config.fields[key],
        fieldName: key,
        form_id: config.id,
        ref: setInputRef
      }
    )))) : Object.keys(config.fields).map((key) => /* @__PURE__ */ React23.createElement(
      FormField_default,
      {
        form,
        key,
        field: config.fields[key],
        fieldName: key,
        formId: config.id,
        ref: setInputRef
      }
    )),
    /* @__PURE__ */ React23.createElement("div", { style: { display: "flex", justifyContent: "center", flexDirection: "row", gap: "6rem" } }, config.reset_text && isDirty && /* @__PURE__ */ React23.createElement("button", { type: "button", onClick: () => {
      form.reset();
      reset();
    } }, config.reset_text), /* @__PURE__ */ React23.createElement("button", { type: "submit" }, config.submit_text))
  ), /* @__PURE__ */ React23.createElement(
    Dialog_default,
    {
      isOpen: showSuccessDialog,
      onClose: () => setShowSuccessDialog(false),
      title: "Success"
    },
    config.success_msg || "Form submitted successfully"
  ));
}

// src/mountForm.jsx
import { createRoot } from "react-dom/client";
import React24 from "react";
function mountForm(el, config) {
  const root = createRoot(el);
  root.render(/* @__PURE__ */ React24.createElement(Form, { ...config }));
  el.removeAttribute("data-config");
  return () => root.unmount();
}

// src/mountTable.jsx
import { createRoot as createRoot2 } from "react-dom/client";
import React25 from "react";
function mountTable(el, config) {
  const root = createRoot2(el);
  root.render(/* @__PURE__ */ React25.createElement(Table, { ...config }));
  el.removeAttribute("data-config");
  return () => root.unmount();
}

// src/fillers/Percent.jsx
import React26 from "react";
var Percent = ({ value }) => {
  return /* @__PURE__ */ React26.createElement(React26.Fragment, null, value, "%");
};
var Percent_default = Percent;

// src/fillers/Money.jsx
import React27 from "react";
var Money = ({ value }) => {
  return /* @__PURE__ */ React27.createElement(React27.Fragment, null, Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN"
  }).format(value));
};
var Money_default = Money;

// src/charts/Chart.jsx
import React29 from "react";
import { scaleBand } from "@tanstack/charts/scales/band";
import { scaleLinear } from "@tanstack/charts/scales/linear";
import { barY, areaY, lineY, defineChart } from "@tanstack/charts";
import { pie, polar, radialArc, radialBarAngle } from "@tanstack/charts/polar";
import { tooltip } from "@tanstack/charts/tooltip";
import { Chart as TanstackChart } from "@tanstack/charts/react";

// src/charts/ChartType.jsx
import React28 from "react";
var ChartType = Object.freeze({
  BAR: "bar",
  LINE: "line",
  AREA: "area",
  PIE: "pie",
  DONUT: "donut",
  RADIAL: "radial",
  SCATTER: "scatter"
});
var ChartType_default = ChartType;

// src/charts/Chart.jsx
var Chart = ({ chart, type, guides = false, width, height, color, gradient }) => {
  console.log(chart);
  var chartData = null;
  switch (type) {
    case ChartType_default.BAR:
      chartData = barY(chart.data, {
        x: chart.label_column,
        y: chart.data_column
      });
      break;
    case ChartType_default.LINE:
      chartData = lineY(chart.data, {
        x: chart.label_column,
        y: chart.data_column,
        stroke: color
      });
      break;
    case ChartType_default.PIE:
      chartData = polar({
        scales: {
          angle: null,
          radius: null
        },
        marks: [
          radialArc(pie(chart.data, {
            value: chart.data_column
          }), {
            key: chart.label_column,
            color: chart.label_column
          })
        ]
      });
      break;
    case ChartType_default.DONUT:
      chartData = polar({
        scales: {
          angle: null,
          radius: null
        },
        marks: [
          radialArc(pie(chart.data, {
            value: chart.data_column
          }), {
            key: chart.label_column,
            color: chart.label_column,
            innerRadius: ({ radius }) => radius * 0.58
          })
        ]
      });
      break;
    case ChartType_default.RADIAL:
      const maxData = Math.max(...chart.data.map((d) => d[chart.data_column]));
      console.log(maxData);
      chartData = polar({
        scales: {
          angle: {
            scale: scaleLinear().domain([0, maxData])
          },
          radius: {
            scale: () => scaleBand().paddingInner(0.38).paddingOuter(0.19),
            range: [
              ({ radius }) => radius * 0.2,
              ({ radius }) => radius
            ]
          }
        },
        marks: [
          radialBarAngle(
            chart.data,
            {
              angle: chart.data_column,
              radius: chart.label_column,
              key: chart.label_column,
              color: chart.label_column,
              cornerRadius: "full"
            }
          )
        ]
      });
      break;
    default:
      chartData = null;
  }
  var marks = [chartData];
  var gradients = [];
  if (gradient) {
    marks.push(areaY(chart.data, {
      x: chart.label_column,
      y: chart.data_column,
      stroke: color
    }));
  }
  const chartDef = defineChart({
    marks,
    scales: {
      x: {
        scale: () => scaleBand().padding(0.18)
      },
      y: {
        scale: scaleLinear,
        nice: true,
        grid: true,
        axis: {
          label: "Frequency",
          ticks: { format: (value) => value + "%" }
        }
      }
    },
    guides,
    gradients,
    tooltip
  });
  return /* @__PURE__ */ React29.createElement(
    TanstackChart,
    {
      definition: chartDef,
      width,
      height,
      ariaLabel: ""
    }
  );
};
var Chart_default = Chart;
export {
  Chart_default as Chart,
  ChartType_default as ChartType,
  Dialog_default as Dialog,
  Form,
  ImageUploader_default as ImageUploader,
  Input_default as Input,
  Money_default as Money,
  MoneyInput_default as MoneyInput,
  Percent_default as Percent,
  PercentInput_default as PercentInput,
  Table,
  configureEnums,
  getEnum,
  mountForm,
  mountTable,
  useRecordForm_default as useRecordForm
};
