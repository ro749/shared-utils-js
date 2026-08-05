// src/react/forms/Input.jsx
import React, { useRef } from "react";
var Input = ({ ref, value, ...props }) => {
  const internalRef = useRef(null);
  const inputRef = ref || internalRef;
  const handleChange = (e) => {
    if (value) {
      value.current = e.target.value;
    }
    if (props.onChange) {
      props.onChange(e);
    }
  };
  return /* @__PURE__ */ React.createElement(
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
import React5 from "react";
import axios from "axios";

// src/react/forms/MoneyInput.jsx
import React2, { useRef as useRef2 } from "react";
var MoneyInput = ({ value, ...props }) => {
  const ref = useRef2(null);
  const cursorRef = useRef2(0);
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
  return /* @__PURE__ */ React2.createElement(
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
import React3, { useRef as useRef3 } from "react";
var PercentInput = ({ value, ...props }) => {
  const ref = useRef3(null);
  const handleChange = (e) => {
    value.current = e.target.value.replace(/[^0-9]/g, "");
    ref.current.value = value.current + "%";
    if (props.onChange) {
      props.onChange(e);
    }
  };
  return /* @__PURE__ */ React3.createElement(
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
import React4, { useRef as useRef4 } from "react";
var NipInput = ({ value, max, ...props }) => {
  const ref = useRef4(null);
  const handleChange = (e) => {
    const newValue = e.target.value.replace(/\D/g, "");
    if (max !== void 0 && newValue.length > max) {
      value = value.substring(0, max);
    }
    if (props.onChange) {
      props.onChange(newValue);
    }
  };
  return /* @__PURE__ */ React4.createElement(
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
    valueRefs[key] = React5.useRef("");
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {};
    Object.keys(data.fields).forEach((key) => {
      formData[key] = valueRefs[key].current;
    });
    axios.post("/form/" + data.id, formData);
  };
  return /* @__PURE__ */ React5.createElement("form", { onSubmit: handleSubmit }, Object.keys(data.fields).map((key) => {
    const Component = INPUT_COMPONENTS[data.fields[key].type];
    return /* @__PURE__ */ React5.createElement("label", null, data.fields[key].label, /* @__PURE__ */ React5.createElement(Component, { value: valueRefs[key], id: key, name: key }));
  }), /* @__PURE__ */ React5.createElement("button", { type: "submit" }, data.submit_text));
}

// src/react/mount.jsx
import { createRoot } from "react-dom/client";
import React6 from "react";
var registry = {
  "input": Input_default,
  "form": Form
};
function mount(el, name, config) {
  const Component = registry[name];
  const root = createRoot(el);
  root.render(/* @__PURE__ */ React6.createElement(Component, { ...config }));
  el.removeAttribute("data-config");
  el.removeAttribute("data-widget");
  return () => root.unmount();
}
export {
  Form,
  Input_default as Input,
  mount
};
