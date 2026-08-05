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
var Input = ({ ref, value, ...props }) => {
  const internalRef = (0, import_react.useRef)(null);
  const inputRef = ref || internalRef;
  const handleChange = (e) => {
    if (value) {
      value.current = e.target.value;
    }
    if (props.onChange) {
      props.onChange(e);
    }
  };
  return /* @__PURE__ */ import_react.default.createElement(
    "input",
    {
      ref: inputRef,
      onChange: handleChange,
      onKeyDown: props.onKeyDown,
      className: "form-control",
      id: props.id,
      type: props.type || "text"
    }
  );
};
var Input_default = Input;

// src/react/forms/Form.jsx
var import_react5 = __toESM(require("react"));
var import_axios = __toESM(require("axios"));

// src/react/forms/MoneyInput.jsx
var import_react2 = __toESM(require("react"));
var MoneyInput = ({ value, ...props }) => {
  const ref = (0, import_react2.useRef)(null);
  const cursorRef = (0, import_react2.useRef)(0);
  function format(value2) {
    if (value2 === "") return "";
    const [integer, decimal] = value2.split(".");
    const integerWithFormat = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return decimal !== void 0 ? `${integerWithFormat}.${decimal}` : integerWithFormat;
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
    cursor -= noNumericChars;
    if (/^[0-9]$/.test(e.key)) {
      cursor += 1;
      console.log(value);
      var newValue = value.current.slice(0, cursor) + e.key + value.current.slice(cursor);
    } else if (e.key == "Backspace") {
      if (cursor == 0) {
        return;
      }
      cursor -= 1;
      var newValue = value.current.slice(0, cursor) + value.current.slice(cursor + 1);
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
    value.current = newValue;
    ref.current.value = "$" + format(newValue);
  }
  return /* @__PURE__ */ import_react2.default.createElement(
    Input_default,
    {
      ref,
      onKeyDown: handleKeyDown,
      ...props
    }
  );
};
var MoneyInput_default = MoneyInput;

// src/react/forms/PercentInput.jsx
var import_react3 = __toESM(require("react"));
var PercentInput = ({ value, ...props }) => {
  const ref = (0, import_react3.useRef)(null);
  const handleChange = (e) => {
    value.current = e.target.value.replace(/[^0-9]/g, "");
    ref.current.value = value.current + "%";
    if (props.onChange) {
      props.onChange(e);
    }
  };
  return /* @__PURE__ */ import_react3.default.createElement(
    Input_default,
    {
      ref,
      onChange: handleChange,
      ...props
    }
  );
};
var PercentInput_default = PercentInput;

// src/react/forms/NipInput.jsx
var import_react4 = __toESM(require("react"));
var NipInput = ({ value, max, ...props }) => {
  const ref = (0, import_react4.useRef)(null);
  const handleChange = (e) => {
    const newValue = e.target.value.replace(/\D/g, "");
    if (max !== void 0 && newValue.length > max) {
      value = value.substring(0, max);
    }
    if (props.onChange) {
      props.onChange(newValue);
    }
  };
  return /* @__PURE__ */ import_react4.default.createElement(
    Input_default,
    {
      ref,
      onChange: handleChange,
      type: "password",
      ...props
    }
  );
};
var NipInput_default = NipInput;

// src/react/forms/Form.jsx
function Form(data) {
  const INPUT_COMPONENTS = {
    text: Input_default,
    email: Input_default,
    password: Input_default,
    number: Input_default,
    money: MoneyInput_default,
    percentage: PercentInput_default,
    pin: NipInput_default
  };
  const valueRefs = {};
  Object.keys(data.fields).forEach((key) => {
    valueRefs[key] = import_react5.default.useRef("");
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {};
    Object.keys(data.fields).forEach((key) => {
      formData[key] = valueRefs[key].current;
    });
    import_axios.default.post("/form/" + data.id, formData);
  };
  return /* @__PURE__ */ import_react5.default.createElement("form", { onSubmit: handleSubmit }, Object.keys(data.fields).map((key) => {
    const Component = INPUT_COMPONENTS[data.fields[key].type];
    return /* @__PURE__ */ import_react5.default.createElement("label", null, data.fields[key].label, /* @__PURE__ */ import_react5.default.createElement(Component, { value: valueRefs[key], id: key, name: key }));
  }), /* @__PURE__ */ import_react5.default.createElement("button", { type: "submit" }, data.submit_text));
}

// src/react/mount.jsx
var import_client = require("react-dom/client");
var import_react6 = __toESM(require("react"));
var registry = {
  "input": Input_default,
  "form": Form
};
function mount(el, name, config) {
  const Component = registry[name];
  const root = (0, import_client.createRoot)(el);
  root.render(/* @__PURE__ */ import_react6.default.createElement(Component, { ...config }));
  el.removeAttribute("data-config");
  el.removeAttribute("data-widget");
  return () => root.unmount();
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Form,
  Input,
  mount
});
