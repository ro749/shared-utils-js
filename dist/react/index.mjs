// src/react/forms/Input.jsx
import React from "react";
var Input = (props) => {
  return /* @__PURE__ */ React.createElement(
    "input",
    {
      type: props.type,
      className: props.className,
      name: props.name,
      id: props.id,
      defaultValue: props.defaultValue,
      onChange: props.onChange,
      value: props.value,
      onBlur: props.onBlur,
      placeholder: props.placeholder,
      disabled: props.disabled,
      required: props.required,
      autoFocus: props.autoFocus,
      autoComplete: props.autoComplete,
      autoCorrect: props.autoCorrect,
      spellCheck: props.spellCheck,
      maxLength: props.maxLength,
      readOnly: props.readOnly,
      accept: props.accept,
      multiple: props.multiple,
      step: props.step,
      min: props.min,
      max: props.max,
      minLength: props.minLength,
      pattern: props.pattern,
      title: props.title,
      rows: props.rows,
      cols: props.cols,
      form: props.form,
      formAction: props.formAction,
      formEncType: props.formEncType,
      formMethod: props.formMethod,
      formNoValidate: props.formNoValidate,
      formTarget: props.formTarget,
      lang: props.lang,
      list: props.list,
      tabIndex: props.tabIndex,
      typeMismatch: props.typeMismatch,
      inputMode: props.inputMode,
      stepMismatch: props.stepMismatch,
      tooLong: props.tooLong,
      tooShort: props.tooShort,
      rangeOverflow: props.rangeOverflow,
      rangeUnderflow: props.rangeUnderflow,
      validity: props.validity,
      willValidate: props.willValidate,
      validityMessage: props.validityMessage,
      validationMessage: props.validationMessage,
      selectionDirection: props.selectionDirection,
      selectionEnd: props.selectionEnd,
      selectionStart: props.selectionStart,
      setSelectionRange: props.setSelectionRange,
      size: props.size,
      src: props.src,
      srcDoc: props.srcDoc,
      useMap: props.useMap
    }
  );
};
var Input_default = Input;

// src/react/forms/Form.jsx
import React2 from "react";
function Form() {
  return /* @__PURE__ */ React2.createElement("p", null, "reload test");
}

// src/react/mount.jsx
import { createRoot } from "react-dom/client";
import React3 from "react";
var registry = {
  "input": Input_default,
  "form": Form
};
function mount(el, name, config) {
  const Component = registry[name];
  const root = createRoot(el);
  root.render(/* @__PURE__ */ React3.createElement(Component, { ...config }));
  return () => root.unmount();
}
export {
  Form,
  Input_default as Input,
  mount
};
