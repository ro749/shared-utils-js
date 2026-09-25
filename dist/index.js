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

// src/index.jsx
var src_exports = {};
__export(src_exports, {
  Chart: () => Chart_default,
  ChartType: () => ChartType_default,
  Dialog: () => Dialog_default,
  Form: () => Form,
  ImageUploader: () => ImageUploader_default,
  Input: () => Input_default,
  Money: () => Money_default,
  MoneyInput: () => MoneyInput_default,
  Percent: () => Percent_default,
  PercentInput: () => PercentInput_default,
  Table: () => Table,
  configureEnums: () => configureEnums,
  getEnum: () => getEnum,
  mountForm: () => mountForm,
  mountTable: () => mountTable,
  useRecordForm: () => useRecordForm_default
});
module.exports = __toCommonJS(src_exports);

// src/forms/Form.jsx
var import_react24 = __toESM(require("react"));
var import_axios3 = __toESM(require("axios"));

// src/forms/FormField.jsx
var import_react23 = __toESM(require("react"));

// src/forms/Input.jsx
var import_react = __toESM(require("react"));
var Input = ({ ref, value, field, onChange, ...props }) => {
  const internalRef = (0, import_react.useRef)(null);
  const inputRef = ref || internalRef;
  function handleChange(e) {
    if (field != void 0) {
      field.handleChange(e.target.value);
    }
    if (onChange != void 0) {
      onChange(e.target.value);
    }
  }
  return /* @__PURE__ */ import_react.default.createElement(
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
var import_react2 = __toESM(require("react"));
var MoneyInput = ({ value, field, onChange, ...props }) => {
  const ref = (0, import_react2.useRef)(null);
  const cursorRef = (0, import_react2.useRef)(0);
  (0, import_react2.useEffect)(() => {
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
  return /* @__PURE__ */ import_react2.default.createElement(
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
var import_react3 = __toESM(require("react"));
var PercentInput = ({ value, field, onChange, ...props }) => {
  const ref = (0, import_react3.useRef)(null);
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
  return /* @__PURE__ */ import_react3.default.createElement(
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
var import_react4 = __toESM(require("react"));
var NumberInput = ({ value, field, max, ...props }) => {
  const ref = (0, import_react4.useRef)(null);
  const handleChange = (value2) => {
    var newValue = value2.replace(/\D/g, "");
    if (max !== void 0 && newValue.length > max) {
      newValue = newValue.substring(0, max);
    }
    field.handleChange(newValue);
  };
  return /* @__PURE__ */ import_react4.default.createElement(
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
var import_react5 = __toESM(require("react"));
var NipInput = ({ value, field, max, ...props }) => {
  console.log("NipInput");
  const ref = (0, import_react5.useRef)(null);
  const handleChange = (value2) => {
    console.log(value2);
    var newValue = value2.replace(/\D/g, "");
    if (max !== void 0 && newValue.length > max) {
      newValue = newValue.substring(0, max);
    }
    field.handleChange(newValue);
  };
  return /* @__PURE__ */ import_react5.default.createElement(
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
var import_react6 = __toESM(require("react"));
function TextArea({ value, field, ...props }) {
  const ref = (0, import_react6.useRef)(null);
  const handleChange = (e) => {
    field.handleChange(e.target.value);
    props.onChange && props.onChange(e.target.value);
  };
  return /* @__PURE__ */ import_react6.default.createElement(
    "textarea",
    {
      ref,
      onChange: handleChange,
      ...props
    }
  );
}

// src/forms/PhoneInput.jsx
var import_react7 = __toESM(require("react"));
var PhoneInput = ({ value, field, ...props }) => {
  const handleChange = (value2) => {
    var newValue = value2.replace(/\D/g, "");
    field.handleChange(newValue);
  };
  return /* @__PURE__ */ import_react7.default.createElement(
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
var import_react8 = __toESM(require("react"));
var MailInput = ({ value, field, ...props }) => {
  return /* @__PURE__ */ import_react8.default.createElement(
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
var import_react9 = __toESM(require("react"));
var import_react_select = __toESM(require("react-select"));
var import_async = __toESM(require("react-select/async"));
var Select = ({ value, field, options, dynamic, ...props }) => {
  const ref = (0, import_react9.useRef)(null);
  const handleChange = (selectedOption) => {
    field.handleChange(selectedOption ? selectedOption.value : "");
  };
  const selectOptions = Object.keys(options).map((key) => ({
    value: key,
    label: options[key]
  }));
  if (!dynamic) {
    const selectedValue = value && value.current ? selectOptions.find((opt) => opt.value === value.current) : null;
    return /* @__PURE__ */ import_react9.default.createElement(
      import_react_select.default,
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
    const loadOptions = (0, import_react9.useCallback)(async (inputValue) => {
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
    return /* @__PURE__ */ import_react9.default.createElement(
      import_async.default,
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
var import_react10 = __toESM(require("react"));
var ImageUploader = ({ value, field, id, name, imageUrl }) => {
  const [preview, setPreview] = (0, import_react10.useState)(imageUrl || null);
  const fileInputRef = (0, import_react10.useRef)(null);
  (0, import_react10.useEffect)(() => {
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
  return /* @__PURE__ */ import_react10.default.createElement(import_react10.default.Fragment, null, /* @__PURE__ */ import_react10.default.createElement(
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
  ), preview ? /* @__PURE__ */ import_react10.default.createElement(
    "img",
    {
      src: preview,
      alt: "Preview",
      className: "image-preview"
    }
  ) : /* @__PURE__ */ import_react10.default.createElement(
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
var import_react22 = __toESM(require("react"));

// unplugin-icons:~icons/lucide/upload.jsx
var React11 = __toESM(require("react"));
var import_react11 = require("react");
var lucideUpload = ({
  title,
  titleId,
  ...props
}, ref) => /* @__PURE__ */ React11.createElement("svg", { viewBox: "0 0 24 24", width: "1.2em", height: "1.2em", ref, "aria-labelledby": titleId, ...props }, title ? /* @__PURE__ */ React11.createElement("title", { id: titleId }, title) : null, /* @__PURE__ */ React11.createElement("path", { fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 3v12m5-7l-5-5l-5 5m14 7v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }));
var ForwardRef = (0, import_react11.forwardRef)(lucideUpload);
var upload_default = ForwardRef;

// src/forms/FileUploader.jsx
var import_papaparse = __toESM(require("papaparse"));
var import_axios2 = __toESM(require("axios"));

// src/tables/Table.jsx
var import_react21 = __toESM(require("react"));
var import_react_table = require("@tanstack/react-table");

// unplugin-icons:~icons/iconamoon/eye-light.jsx
var React12 = __toESM(require("react"));
var import_react12 = require("react");
var iconamoonEyeLight = ({
  title,
  titleId,
  ...props
}, ref) => /* @__PURE__ */ React12.createElement("svg", { viewBox: "0 0 24 24", width: "1.2em", height: "1.2em", ref, "aria-labelledby": titleId, ...props }, title ? /* @__PURE__ */ React12.createElement("title", { id: titleId }, title) : null, /* @__PURE__ */ React12.createElement("g", { fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.5 }, /* @__PURE__ */ React12.createElement("path", { d: "M15 12a3 3 0 1 1-6 0a3 3 0 0 1 6 0" }), /* @__PURE__ */ React12.createElement("path", { d: "M2 12c1.6-4.097 5.336-7 10-7s8.4 2.903 10 7c-1.6 4.097-5.336 7-10 7s-8.4-2.903-10-7" })));
var ForwardRef2 = (0, import_react12.forwardRef)(iconamoonEyeLight);
var eye_light_default = ForwardRef2;

// unplugin-icons:~icons/lucide/edit.jsx
var React13 = __toESM(require("react"));
var import_react13 = require("react");
var lucideEdit = ({
  title,
  titleId,
  ...props
}, ref) => /* @__PURE__ */ React13.createElement("svg", { viewBox: "0 0 24 24", width: "1.2em", height: "1.2em", ref, "aria-labelledby": titleId, ...props }, title ? /* @__PURE__ */ React13.createElement("title", { id: titleId }, title) : null, /* @__PURE__ */ React13.createElement("g", { fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2 }, /* @__PURE__ */ React13.createElement("path", { d: "M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" }), /* @__PURE__ */ React13.createElement("path", { d: "M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z" })));
var ForwardRef3 = (0, import_react13.forwardRef)(lucideEdit);
var edit_default = ForwardRef3;

// unplugin-icons:~icons/mingcute/delete-2-line.jsx
var React14 = __toESM(require("react"));
var import_react14 = require("react");
var mingcuteDelete2Line = ({
  title,
  titleId,
  ...props
}, ref) => /* @__PURE__ */ React14.createElement("svg", { viewBox: "0 0 24 24", width: "1.2em", height: "1.2em", ref, "aria-labelledby": titleId, ...props }, title ? /* @__PURE__ */ React14.createElement("title", { id: titleId }, title) : null, /* @__PURE__ */ React14.createElement("path", { fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeWidth: 2, d: "m5 6l.876 13.133A2 2 0 0 0 7.87 21h8.258a2 2 0 0 0 1.995-1.867L19 6M8 6l.772-2.316A1 1 0 0 1 9.721 3h4.558a1 1 0 0 1 .949.684L16 6m-6 5v5m4-5v5M4 6h16" }));
var ForwardRef4 = (0, import_react14.forwardRef)(mingcuteDelete2Line);
var delete_2_line_default = ForwardRef4;

// src/icons/IconMap.jsx
var IconMap = {
  "iconamoon:eye-light": eye_light_default,
  "lucide:edit": edit_default,
  "mingcute:delete-2-line": delete_2_line_default
};
var IconMap_default = IconMap;

// src/dialogs/Dialog.jsx
var import_react16 = __toESM(require("react"));

// unplugin-icons:~icons/iconamoon/close.jsx
var React15 = __toESM(require("react"));
var import_react15 = require("react");
var iconamoonClose = ({
  title,
  titleId,
  ...props
}, ref) => /* @__PURE__ */ React15.createElement("svg", { viewBox: "0 0 24 24", width: "1.2em", height: "1.2em", ref, "aria-labelledby": titleId, ...props }, title ? /* @__PURE__ */ React15.createElement("title", { id: titleId }, title) : null, /* @__PURE__ */ React15.createElement("path", { fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "m7 7l10 10M7 17L17 7" }));
var ForwardRef5 = (0, import_react15.forwardRef)(iconamoonClose);
var close_default = ForwardRef5;

// src/dialogs/Dialog.jsx
var Dialog = ({ isOpen, onClose, title, children, actions }) => {
  if (!isOpen) return null;
  return /* @__PURE__ */ import_react16.default.createElement("div", { className: "dialog-overlay", onClick: onClose }, /* @__PURE__ */ import_react16.default.createElement("div", { className: "dialog-content", onClick: (e) => e.stopPropagation() }, actions && actions.length == 1 && /* @__PURE__ */ import_react16.default.createElement("div", { style: { display: "flex", justifyContent: "flex-end" } }, /* @__PURE__ */ import_react16.default.createElement("button", { onClick: onClose }, /* @__PURE__ */ import_react16.default.createElement(close_default, null))), title && /* @__PURE__ */ import_react16.default.createElement("div", { className: "dialog-header" }, title), /* @__PURE__ */ import_react16.default.createElement("div", { className: "dialog-body" }, children), /* @__PURE__ */ import_react16.default.createElement("div", { className: "dialog-footer" }, actions && actions.length > 0 ? /* @__PURE__ */ import_react16.default.createElement(import_react16.default.Fragment, null, actions.map((action, index) => /* @__PURE__ */ import_react16.default.createElement(
    "button",
    {
      key: index,
      onClick: action.onClick,
      className: "dialog-button " + (action.className || "")
    },
    action.label
  ))) : /* @__PURE__ */ import_react16.default.createElement("button", { onClick: onClose }, "Cerrar"))));
};
var Dialog_default = Dialog;

// src/tables/EditableTableRow.jsx
var import_react20 = __toESM(require("react"));

// src/forms/useRecordForm.jsx
var import_react_form = require("@tanstack/react-form");
var import_axios = __toESM(require("axios"));
var import_react17 = require("react");
function useRecordForm(config, defaultValues, reset) {
  if (config === void 0) {
    return {
      form: void 0,
      showSuccessDialog: void 0,
      setShowSuccessDialog: void 0
    };
  }
  const [showSuccessDialog, setShowSuccessDialog] = (0, import_react17.useState)(false);
  const form = (0, import_react_form.useForm)({
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
        const res = await import_axios.default.post(`/form/${config.id}`, formData);
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
var React17 = __toESM(require("react"));
var import_react18 = require("react");
var iconamoonCheckCircle1 = ({
  title,
  titleId,
  ...props
}, ref) => /* @__PURE__ */ React17.createElement("svg", { viewBox: "0 0 24 24", width: "1.2em", height: "1.2em", ref, "aria-labelledby": titleId, ...props }, title ? /* @__PURE__ */ React17.createElement("title", { id: titleId }, title) : null, /* @__PURE__ */ React17.createElement("g", { fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2 }, /* @__PURE__ */ React17.createElement("circle", { cx: 12, cy: 12, r: 9 }), /* @__PURE__ */ React17.createElement("path", { d: "m15 10l-4 4l-2-2" })));
var ForwardRef6 = (0, import_react18.forwardRef)(iconamoonCheckCircle1);
var check_circle_1_default = ForwardRef6;

// unplugin-icons:~icons/iconamoon/close-circle-1.jsx
var React18 = __toESM(require("react"));
var import_react19 = require("react");
var iconamoonCloseCircle1 = ({
  title,
  titleId,
  ...props
}, ref) => /* @__PURE__ */ React18.createElement("svg", { viewBox: "0 0 24 24", width: "1.2em", height: "1.2em", ref, "aria-labelledby": titleId, ...props }, title ? /* @__PURE__ */ React18.createElement("title", { id: titleId }, title) : null, /* @__PURE__ */ React18.createElement("g", { fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2 }, /* @__PURE__ */ React18.createElement("circle", { cx: 12, cy: 12, r: 9 }), /* @__PURE__ */ React18.createElement("path", { d: "m14 10l-4 4m0-4l4 4" })));
var ForwardRef7 = (0, import_react19.forwardRef)(iconamoonCloseCircle1);
var close_circle_1_default = ForwardRef7;

// src/tables/EditableTableRow.jsx
function EditableTableRow({ row, columns, formConfig, onCancel, onSaved }) {
  const { form } = useRecordForm_default(
    { ...formConfig, onSuccess: onSaved },
    row
  );
  return /* @__PURE__ */ import_react20.default.createElement("tr", null, Object.keys(columns).map((key) => {
    const field = formConfig.fields[key];
    return /* @__PURE__ */ import_react20.default.createElement("td", { key }, field ? /* @__PURE__ */ import_react20.default.createElement(FormField_default, { form, field, fieldName: key, form_id: formConfig.id }) : row[key]);
  }), /* @__PURE__ */ import_react20.default.createElement("td", null, /* @__PURE__ */ import_react20.default.createElement("div", { className: "edit-buttons" }, /* @__PURE__ */ import_react20.default.createElement(
    "button",
    {
      type: "button",
      className: "btn w-32-px h-32-px rounded-circle bg-success-focus text-success-main d-inline-flex align-items-center justify-content-center",
      onClick: () => form.handleSubmit()
    },
    /* @__PURE__ */ import_react20.default.createElement(check_circle_1_default, null)
  ), /* @__PURE__ */ import_react20.default.createElement(
    "button",
    {
      type: "button",
      className: "btn w-32-px h-32-px rounded-circle bg-danger-focus text-danger-main d-inline-flex align-items-center justify-content-center",
      onClick: onCancel
    },
    /* @__PURE__ */ import_react20.default.createElement(close_circle_1_default, null)
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
  const columnHelper = (0, import_react_table.createColumnHelper)();
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
        return /* @__PURE__ */ import_react21.default.createElement("div", { className: columnConfig.logic_modifier.options + "-" + data2.getValue() }, getEnum(columnConfig.logic_modifier.options, data2.getValue()));
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
      cell: (info) => /* @__PURE__ */ import_react21.default.createElement("div", { className: "normal-buttons", key: info.row.id }, config.buttons.map((button, index) => {
        const IconComponent = IconMap_default[button.icon];
        const Wrapper = button.view ? "a" : import_react21.default.Fragment;
        const isDeleteButton = button.button_class == "delete-btn";
        const isEditButton = button.button_class == "edit-btn";
        return /* @__PURE__ */ import_react21.default.createElement(Wrapper, { key: index, href: button.view ? button.view.url + "?" + button.view.name + "=" + info.row.original[button.view.param] : void 0 }, /* @__PURE__ */ import_react21.default.createElement(
          "button",
          {
            type: "button",
            className: `btn w-32-px h-32-px rounded-circle ${button.background_color_class} ${button.text_color_class} d-inline-flex align-items-center justify-content-center ${button.class ?? ""}`,
            onClick: isDeleteButton ? () => handleDeleteClick(info.row.original) : isEditButton ? () => handleEditClick(info.row.original) : void 0
          },
          /* @__PURE__ */ import_react21.default.createElement(IconComponent, null)
        ));
      }))
    }));
  }
  const columns = columnHelper.columns(cols);
  const features = (0, import_react_table.tableFeatures)({ rowPaginationFeature: import_react_table.rowPaginationFeature, globalFilteringFeature: import_react_table.globalFilteringFeature, rowSortingFeature: import_react_table.rowSortingFeature });
  const pageSize = config.pageSize ?? config.page_length ?? 10;
  const [resetSignal, setResetSignal] = (0, import_react21.useState)(false);
  const [data, setData] = (0, import_react21.useState)([]);
  const [pagination, setPagination] = (0, import_react21.useState)({ pageIndex: 0, pageSize });
  const [globalFilter, setGlobalFilter] = (0, import_react21.useState)("");
  const [sorting, setSorting] = (0, import_react21.useState)([]);
  const [totalRows, setTotalRows] = (0, import_react21.useState)(0);
  const [editRow, setEditRow] = (0, import_react21.useState)(null);
  const [activeFilters, setActiveFilters] = (0, import_react21.useState)(() => {
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
  const [deletePopup, setDeletePopup] = (0, import_react21.useState)({ show: false, warning: "", row: null });
  const table = (0, import_react_table.useTable)({
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
  (0, import_react21.useEffect)(() => {
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
  (0, import_react21.useEffect)(() => {
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
  (0, import_react21.useImperativeHandle)(ref, () => ({
    editData,
    reset
  }));
  return /* @__PURE__ */ import_react21.default.createElement("div", { className: "dt-container" }, config.page_length != null && /* @__PURE__ */ import_react21.default.createElement("div", { className: "dt-layout-row" }, /* @__PURE__ */ import_react21.default.createElement("div", { className: "dt-layout-cell dt-layout-start" }, /* @__PURE__ */ import_react21.default.createElement(
    "select",
    {
      value: pagination.pageSize,
      onChange: (event) => table.setPageSize(Number(event.target.value))
    },
    (config.pageSizes ?? [10, 25, 50, 100]).map((size) => /* @__PURE__ */ import_react21.default.createElement("option", { key: size, value: size }, size, " per page"))
  )), /* @__PURE__ */ import_react21.default.createElement("div", { className: "dt-layout-cell dt-layout-end", style: { display: "flex", flexDirection: "row", justifyContent: "flex-end", gap: "6px" } }, config.filters && Object.entries(config.filters).map(([filterKey, filter]) => /* @__PURE__ */ import_react21.default.createElement("div", { key: filterKey, className: "filter", style: { display: "flex", flexDirection: "row", justifyContent: "flex-end", gap: "8px", marginLeft: "8px", alignItems: "center" } }, /* @__PURE__ */ import_react21.default.createElement("p", { style: { margin: "0" } }, filter.display), filter.filters && Object.entries(filter.filters).map(([optionKey, option]) => /* @__PURE__ */ import_react21.default.createElement(
    "button",
    {
      key: optionKey,
      id: `f-${filterKey}-${optionKey}`,
      className: `filter-button btn btn-outline-neutral-900 no-hover ${activeFilters[filterKey] === optionKey ? "active" : ""}`,
      onClick: () => handleFilterClick(filterKey, optionKey)
    },
    option.display
  )))), /* @__PURE__ */ import_react21.default.createElement("div", { className: "dt-search" }, /* @__PURE__ */ import_react21.default.createElement("label", null, "Buscar:"), /* @__PURE__ */ import_react21.default.createElement(
    "input",
    {
      type: "search",
      value: globalFilter,
      placeholder: config.searchPlaceholder ?? "Search...",
      "aria-label": config.searchLabel ?? "Search table",
      onChange: (event) => table.setGlobalFilter(event.target.value)
    }
  )))), /* @__PURE__ */ import_react21.default.createElement("table", { className: "table bordered-table mb-0 dataTable", style: { width: "97.2222%" } }, /* @__PURE__ */ import_react21.default.createElement("thead", null, table.getHeaderGroups().map((headerGroup) => /* @__PURE__ */ import_react21.default.createElement("tr", { key: headerGroup.id }, headerGroup.headers.map((header) => /* @__PURE__ */ import_react21.default.createElement(
    "th",
    {
      key: header.id,
      onClick: header.column.getToggleSortingHandler(),
      style: { cursor: header.column.getCanSort() ? "pointer" : "default" },
      className: `dt-orderable-asc dt-orderable-desc ${header.column.getIsSorted() ? header.column.getIsSorted() == "desc" ? "dt-ordering-desc" : "dt-ordering-asc" : ""}`
    },
    header.isPlaceholder ? null : /* @__PURE__ */ import_react21.default.createElement("div", null, /* @__PURE__ */ import_react21.default.createElement(table.FlexRender, { header }), config.page_length != null && /* @__PURE__ */ import_react21.default.createElement("span", { className: "dt-column-order" }))
  ))))), /* @__PURE__ */ import_react21.default.createElement("tbody", null, table.getRowModel().rows.map((row) => {
    return editRow != null && editRow.id == row.original.id ? /* @__PURE__ */ import_react21.default.createElement(
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
    ) : /* @__PURE__ */ import_react21.default.createElement("tr", { key: row.id }, row.getAllCells().map((cell) => /* @__PURE__ */ import_react21.default.createElement("td", { key: cell.id }, /* @__PURE__ */ import_react21.default.createElement(table.FlexRender, { cell }))));
  })), /* @__PURE__ */ import_react21.default.createElement("tfoot", null, table.getFooterGroups().map((footerGroup) => /* @__PURE__ */ import_react21.default.createElement("tr", { key: footerGroup.id }, footerGroup.headers.map((header) => /* @__PURE__ */ import_react21.default.createElement("th", { key: header.id }, header.isPlaceholder ? null : /* @__PURE__ */ import_react21.default.createElement(table.FlexRender, { footer: header }))))))), config.page_length != null && /* @__PURE__ */ import_react21.default.createElement("div", { className: "dt-layout-row" }, /* @__PURE__ */ import_react21.default.createElement("div", { className: "dt-layout-cell dt-layout-start" }, "Mostrando ", totalRows === 0 ? 0 : pagination.pageIndex * pagination.pageSize + 1, " a ", Math.min((pagination.pageIndex + 1) * pagination.pageSize, totalRows), " de ", totalRows, " registros"), /* @__PURE__ */ import_react21.default.createElement("div", { className: "dt-layout-cell dt-layout-end" }, /* @__PURE__ */ import_react21.default.createElement("div", { className: "dt-paging", style: { display: "flex", gap: "4px", alignItems: "center" } }, /* @__PURE__ */ import_react21.default.createElement(
    "button",
    {
      type: "button",
      onClick: () => table.firstPage(),
      disabled: !table.getCanPreviousPage(),
      style: { padding: "6px 12px", borderRadius: "4px", border: "1px solid #d1d5db", background: "#f3f4f6", cursor: !table.getCanPreviousPage() ? "not-allowed" : "pointer", opacity: !table.getCanPreviousPage() ? 0.5 : 1 }
    },
    "Primera"
  ), /* @__PURE__ */ import_react21.default.createElement(
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
        return /* @__PURE__ */ import_react21.default.createElement("span", { key: `ellipsis-${index}`, style: { padding: "6px 12px" } }, "...");
      }
      const isActive = page === currentPage;
      return /* @__PURE__ */ import_react21.default.createElement(
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
  })(), /* @__PURE__ */ import_react21.default.createElement(
    "button",
    {
      type: "button",
      onClick: () => table.nextPage(),
      disabled: !table.getCanNextPage(),
      style: { padding: "6px 12px", borderRadius: "4px", border: "1px solid #d1d5db", background: "#f3f4f6", cursor: !table.getCanNextPage() ? "not-allowed" : "pointer", opacity: !table.getCanNextPage() ? 0.5 : 1 }
    },
    "Siguiente"
  ), /* @__PURE__ */ import_react21.default.createElement(
    "button",
    {
      type: "button",
      onClick: () => table.lastPage(),
      disabled: !table.getCanNextPage(),
      style: { padding: "6px 12px", borderRadius: "4px", border: "1px solid #d1d5db", background: "#f3f4f6", cursor: !table.getCanNextPage() ? "not-allowed" : "pointer", opacity: !table.getCanNextPage() ? 0.5 : 1 }
    },
    "\xDAltima"
  )))), /* @__PURE__ */ import_react21.default.createElement(
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
  const inputRef = (0, import_react22.useRef)(null);
  const tableRef = (0, import_react22.useRef)(null);
  const [preview, setPreview] = (0, import_react22.useState)(false);
  const reset = () => {
    tableRef.current.reset();
    setPreview(false);
  };
  (0, import_react22.useImperativeHandle)(ref, () => ({
    reset
  }));
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    field.handleChange(file);
    import_papaparse.default.parse(file, {
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
  return /* @__PURE__ */ import_react22.default.createElement(import_react22.default.Fragment, null, /* @__PURE__ */ import_react22.default.createElement("div", { style: { display: !preview ? "block" : "none" } }, /* @__PURE__ */ import_react22.default.createElement("div", { className: "dropzone" }, /* @__PURE__ */ import_react22.default.createElement("div", { className: "dropzone-icon" }, /* @__PURE__ */ import_react22.default.createElement(upload_default, null)), /* @__PURE__ */ import_react22.default.createElement("p", { className: "dropzone-title" }, "Arrastra archivos aqu\xED o da click para seleccionarlos")), /* @__PURE__ */ import_react22.default.createElement(
    "input",
    {
      style: { display: "none" },
      ref: inputRef,
      onChange: (e) => handleFileChange(e),
      type: "file",
      accept: ".csv",
      ...props
    }
  )), /* @__PURE__ */ import_react22.default.createElement("div", { style: { display: preview ? "block" : "none" } }, /* @__PURE__ */ import_react22.default.createElement(Table, { ref: tableRef, ...props.preview_table })));
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
  return /* @__PURE__ */ import_react23.default.createElement(
    form.Field,
    {
      name: fieldName,
      children: (fieldProps) => {
        return /* @__PURE__ */ import_react23.default.createElement(import_react23.default.Fragment, null, /* @__PURE__ */ import_react23.default.createElement("label", null, field.label, field.required && /* @__PURE__ */ import_react23.default.createElement("span", null, "*"), /* @__PURE__ */ import_react23.default.createElement(
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
        )), fieldProps.state.meta.errors.length > 0 && /* @__PURE__ */ import_react23.default.createElement("div", { className: "error-message" }, fieldProps.state.meta.errors.map((error2, index) => /* @__PURE__ */ import_react23.default.createElement("div", { key: index }, error2))));
      }
    }
  );
};
var FormField_default = FormField;

// src/forms/Form.jsx
var import_react_form2 = require("@tanstack/react-form");
function Form(config) {
  const inputRefs = (0, import_react24.useRef)(/* @__PURE__ */ new Set());
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
  const isDirty = (0, import_react_form2.useSelector)(form.store, (state) => state.isDirty);
  return /* @__PURE__ */ import_react24.default.createElement(import_react24.default.Fragment, null, /* @__PURE__ */ import_react24.default.createElement(
    "form",
    {
      id: config.id,
      onSubmit: async (e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }
    },
    config.layout && config.layout.length > 0 ? config.layout.map((row, rowIndex) => /* @__PURE__ */ import_react24.default.createElement("div", { key: rowIndex, className: `input-row ${config.id}-input-row` }, row.map((key) => /* @__PURE__ */ import_react24.default.createElement(
      FormField_default,
      {
        form,
        key,
        field: config.fields[key],
        fieldName: key,
        form_id: config.id,
        ref: setInputRef
      }
    )))) : Object.keys(config.fields).map((key) => /* @__PURE__ */ import_react24.default.createElement(
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
    /* @__PURE__ */ import_react24.default.createElement("div", { style: { display: "flex", justifyContent: "center", flexDirection: "row", gap: "6rem" } }, config.reset_text && isDirty && /* @__PURE__ */ import_react24.default.createElement("button", { type: "button", onClick: () => {
      form.reset();
      reset();
    } }, config.reset_text), /* @__PURE__ */ import_react24.default.createElement("button", { type: "submit" }, config.submit_text))
  ), /* @__PURE__ */ import_react24.default.createElement(
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
var import_client = require("react-dom/client");
var import_react25 = __toESM(require("react"));
function mountForm(el, config) {
  const root = (0, import_client.createRoot)(el);
  root.render(/* @__PURE__ */ import_react25.default.createElement(Form, { ...config }));
  el.removeAttribute("data-config");
  return () => root.unmount();
}

// src/mountTable.jsx
var import_client2 = require("react-dom/client");
var import_react26 = __toESM(require("react"));
function mountTable(el, config) {
  const root = (0, import_client2.createRoot)(el);
  root.render(/* @__PURE__ */ import_react26.default.createElement(Table, { ...config }));
  el.removeAttribute("data-config");
  return () => root.unmount();
}

// src/fillers/Percent.jsx
var import_react27 = __toESM(require("react"));
var Percent = ({ value }) => {
  return /* @__PURE__ */ import_react27.default.createElement(import_react27.default.Fragment, null, value, "%");
};
var Percent_default = Percent;

// src/fillers/Money.jsx
var import_react28 = __toESM(require("react"));
var Money = ({ value }) => {
  return /* @__PURE__ */ import_react28.default.createElement(import_react28.default.Fragment, null, Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN"
  }).format(value));
};
var Money_default = Money;

// src/charts/Chart.jsx
var import_react30 = __toESM(require("react"));
var import_band = require("@tanstack/charts/scales/band");
var import_linear = require("@tanstack/charts/scales/linear");
var import_charts = require("@tanstack/charts");
var import_polar = require("@tanstack/charts/polar");
var import_tooltip = require("@tanstack/charts/tooltip");
var import_react31 = require("@tanstack/charts/react");

// src/charts/ChartType.jsx
var import_react29 = __toESM(require("react"));
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
      chartData = (0, import_charts.barY)(chart.data, {
        x: chart.label_column,
        y: chart.data_column
      });
      break;
    case ChartType_default.LINE:
      chartData = (0, import_charts.lineY)(chart.data, {
        x: chart.label_column,
        y: chart.data_column,
        stroke: color
      });
      break;
    case ChartType_default.PIE:
      chartData = (0, import_polar.polar)({
        scales: {
          angle: null,
          radius: null
        },
        marks: [
          (0, import_polar.radialArc)((0, import_polar.pie)(chart.data, {
            value: chart.data_column
          }), {
            key: chart.label_column,
            color: chart.label_column
          })
        ]
      });
      break;
    case ChartType_default.DONUT:
      chartData = (0, import_polar.polar)({
        scales: {
          angle: null,
          radius: null
        },
        marks: [
          (0, import_polar.radialArc)((0, import_polar.pie)(chart.data, {
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
      chartData = (0, import_polar.polar)({
        scales: {
          angle: {
            scale: (0, import_linear.scaleLinear)().domain([0, maxData])
          },
          radius: {
            scale: () => (0, import_band.scaleBand)().paddingInner(0.38).paddingOuter(0.19),
            range: [
              ({ radius }) => radius * 0.2,
              ({ radius }) => radius
            ]
          }
        },
        marks: [
          (0, import_polar.radialBarAngle)(
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
    marks.push((0, import_charts.areaY)(chart.data, {
      x: chart.label_column,
      y: chart.data_column,
      stroke: color
    }));
  }
  const chartDef = (0, import_charts.defineChart)({
    marks,
    scales: {
      x: {
        scale: () => (0, import_band.scaleBand)().padding(0.18)
      },
      y: {
        scale: import_linear.scaleLinear,
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
    tooltip: import_tooltip.tooltip
  });
  return /* @__PURE__ */ import_react30.default.createElement(
    import_react31.Chart,
    {
      definition: chartDef,
      width,
      height,
      ariaLabel: ""
    }
  );
};
var Chart_default = Chart;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Chart,
  ChartType,
  Dialog,
  Form,
  ImageUploader,
  Input,
  Money,
  MoneyInput,
  Percent,
  PercentInput,
  Table,
  configureEnums,
  getEnum,
  mountForm,
  mountTable,
  useRecordForm
});
