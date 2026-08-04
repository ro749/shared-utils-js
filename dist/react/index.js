var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/react/index.jsx
var react_exports = {};
__export(react_exports, {
  Form: () => Form,
  Input: () => Input_default,
  mount: () => mount
});
module.exports = __toCommonJS(react_exports);

// src/react/forms/Input.jsx
var import_react = __toESM(require("react"));
var Input = (props) => {
  return /* @__PURE__ */ import_react.default.createElement(
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
var import_react2 = __toESM(require("react"));
function Form() {
  return /* @__PURE__ */ import_react2.default.createElement("p", null, "reload test");
}

// src/react/mount.jsx
var import_client = require("react-dom/client");
var import_react3 = __toESM(require("react"));
var registry = {
  "input": Input_default,
  "form": Form
};
function mount(el, name, config) {
  const Component = registry[name];
  const root = (0, import_client.createRoot)(el);
  root.render(/* @__PURE__ */ import_react3.default.createElement(Component, { ...config }));
  return () => root.unmount();
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Form,
  Input,
  mount
});
