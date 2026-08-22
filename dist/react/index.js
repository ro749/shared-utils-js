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
  ImageUploader: () => ImageUploader_default,
  Input: () => Input_default,
  Table: () => Table,
  mount: () => mount
});
module.exports = __toCommonJS(react_exports);

// src/react/forms/Form.jsx
var import_react12 = __toESM(require("react"));
var import_axios = __toESM(require("axios"));

// src/react/forms/FormField.jsx
var import_react10 = __toESM(require("react"));

// src/react/forms/Input.jsx
var import_react = __toESM(require("react"));
var Input = ({ ref, value, field, ...props }) => {
  const internalRef = (0, import_react.useRef)(null);
  const inputRef = ref || internalRef;
  return /* @__PURE__ */ import_react.default.createElement(
    "input",
    {
      ref: inputRef,
      id: props.id,
      name: props.id,
      type: props.type || "text",
      value,
      className: "form-control",
      onChange: (e) => props.onChange ? props.onChange(e) : field.handleChange(e.target.value),
      onKeyDown: (e) => props.onKeyDown != null && props.onKeyDown(e)
    }
  );
};
var Input_default = Input;

// src/react/forms/MoneyInput.jsx
var import_react2 = __toESM(require("react"));
var MoneyInput = ({ value, field, ...props }) => {
  const ref = (0, import_react2.useRef)(null);
  const cursorRef = (0, import_react2.useRef)(0);
  (0, import_react2.useEffect)(() => {
    ref.current.setSelectionRange(cursorRef.current, cursorRef.current);
  }, [value]);
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
    field.handleChange(newValue);
  }
  return /* @__PURE__ */ import_react2.default.createElement(
    Input_default,
    {
      ref,
      onKeyDown: handleKeyDown,
      value: "$" + format(value),
      field,
      ...props
    }
  );
};
var MoneyInput_default = MoneyInput;

// src/react/forms/PercentInput.jsx
var import_react3 = __toESM(require("react"));
var PercentInput = ({ value, field, ...props }) => {
  const ref = (0, import_react3.useRef)(null);
  const handleChange = (e) => {
    field.handleChange(e.target.value.replace(/[^0-9]/g, ""));
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
      value: value + "%",
      onChange: handleChange,
      onKeyDown: handleKeyDown,
      ...props
    }
  );
};
var PercentInput_default = PercentInput;

// src/react/forms/NipInput.jsx
var import_react4 = __toESM(require("react"));
var NipInput = ({ value, field, max, ...props }) => {
  const ref = (0, import_react4.useRef)(null);
  const handleChange = (e) => {
    var newValue = e.target.value.replace(/\D/g, "");
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
      type: "password",
      value,
      field,
      ...props
    }
  );
};
var NipInput_default = NipInput;

// src/react/forms/TextArea.jsx
var import_react5 = __toESM(require("react"));
function TextArea({ value, field, ...props }) {
  const ref = (0, import_react5.useRef)(null);
  const handleChange = (e) => {
    field.handleChange(e.target.value);
    props.onChange && props.onChange(e.target.value);
  };
  return /* @__PURE__ */ import_react5.default.createElement(
    "textarea",
    {
      ref,
      onChange: handleChange,
      ...props
    }
  );
}

// src/react/forms/PhoneInput.jsx
var import_react6 = __toESM(require("react"));
var PhoneInput = ({ value, field, ...props }) => {
  const handleChange = (e) => {
    var newValue = e.target.value.replace(/\D/g, "");
    field.handleChange(newValue);
  };
  return /* @__PURE__ */ import_react6.default.createElement(
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

// src/react/forms/MailInput.jsx
var import_react7 = __toESM(require("react"));
var MailInput = ({ value, field, ...props }) => {
  return /* @__PURE__ */ import_react7.default.createElement(
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

// src/react/forms/Select.jsx
var import_react8 = __toESM(require("react"));
var import_react_select = __toESM(require("react-select"));
var import_async = __toESM(require("react-select/async"));
var Select = ({ value, field, options, dynamic, ...props }) => {
  const ref = (0, import_react8.useRef)(null);
  const handleChange = (selectedOption) => {
    field.handleChange(selectedOption ? selectedOption.value : "");
  };
  const selectOptions = Object.keys(options).map((key) => ({
    value: key,
    label: options[key]
  }));
  if (!dynamic) {
    const selectedValue = value && value.current ? selectOptions.find((opt) => opt.value === value.current) : null;
    return /* @__PURE__ */ import_react8.default.createElement(
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
    const loadOptions = (0, import_react8.useCallback)(async (inputValue) => {
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
    return /* @__PURE__ */ import_react8.default.createElement(
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

// src/react/forms/ImageUploader.jsx
var import_react9 = __toESM(require("react"));
var ImageUploader = ({ value, field, id, name, imageUrl }) => {
  const [preview, setPreview] = (0, import_react9.useState)(imageUrl || null);
  const fileInputRef = (0, import_react9.useRef)(null);
  (0, import_react9.useEffect)(() => {
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
  return /* @__PURE__ */ import_react9.default.createElement("label", { htmlFor: id, className: "image-uploader-label" }, /* @__PURE__ */ import_react9.default.createElement(
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
  ), preview ? /* @__PURE__ */ import_react9.default.createElement(
    "img",
    {
      src: preview,
      alt: "Preview",
      className: "image-preview",
      style: {
        width: "200px",
        height: "200px",
        objectFit: "cover",
        cursor: "pointer",
        borderRadius: "8px",
        border: "2px dashed #ccc"
      }
    }
  ) : /* @__PURE__ */ import_react9.default.createElement(
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

// src/react/forms/FormField.jsx
var INPUT_COMPONENTS = {
  text: Input_default,
  email: MailInput_default,
  tel: PhoneInput_default,
  password: Input_default,
  number: Input_default,
  money: MoneyInput_default,
  percentage: PercentInput_default,
  pin: NipInput_default,
  textarea: TextArea,
  selector: Select_default,
  selector_db: Select_default,
  image: ImageUploader_default
};
var FormField = ({ form, field, fieldName, value, form_id, error, resetKey }) => {
  const Component = INPUT_COMPONENTS[field.type];
  return /* @__PURE__ */ import_react10.default.createElement(
    form.Field,
    {
      name: fieldName,
      children: (fieldProps) => {
        console.log("fieldProps.state.meta");
        console.log(fieldProps.state.meta);
        return /* @__PURE__ */ import_react10.default.createElement(import_react10.default.Fragment, null, /* @__PURE__ */ import_react10.default.createElement("label", null, field.label, field.required && /* @__PURE__ */ import_react10.default.createElement("span", null, "*"), /* @__PURE__ */ import_react10.default.createElement(
          Component,
          {
            field: fieldProps,
            id: fieldName,
            form_id,
            max: field.max,
            options: field.options,
            search: field.search,
            dynamic: field.dynamic,
            imageUrl: field.imageUrl,
            resetKey,
            value: fieldProps.state.value
          }
        )), fieldProps.state.meta.errors.length > 0 && /* @__PURE__ */ import_react10.default.createElement("div", { className: "error-message" }, fieldProps.state.meta.errors.map((error2, index) => /* @__PURE__ */ import_react10.default.createElement("div", { key: index }, error2))));
      }
    }
  );
};
var FormField_default = FormField;

// src/react/forms/Dialog.jsx
var import_react11 = __toESM(require("react"));
var Dialog = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return /* @__PURE__ */ import_react11.default.createElement("div", { className: "dialog-overlay", onClick: onClose }, /* @__PURE__ */ import_react11.default.createElement("div", { className: "dialog-content", onClick: (e) => e.stopPropagation() }, title && /* @__PURE__ */ import_react11.default.createElement("div", { className: "dialog-header" }, title), /* @__PURE__ */ import_react11.default.createElement("div", { className: "dialog-body" }, children), /* @__PURE__ */ import_react11.default.createElement("div", { className: "dialog-footer" }, /* @__PURE__ */ import_react11.default.createElement("button", { onClick: onClose }, "Close"))));
};
var Dialog_default = Dialog;

// src/react/forms/Form.jsx
var import_react_form = require("@tanstack/react-form");
function Form(config) {
  const [showSuccessDialog, setShowSuccessDialog] = import_react12.default.useState(false);
  const form = (0, import_react_form.useForm)({
    defaultValues: Object.fromEntries(
      Object.keys(config.fields).map((key) => [key, config.fields[key].type === "image" ? null : ""])
    ),
    onSubmit: ({ value, formApi }) => {
      console.log(value);
      import_axios.default.post(`/form/${config.id}`, value).then(() => {
        setShowSuccessDialog(true);
        form.reset();
      }).catch((error) => {
        const apiErrors = error.response.config.errors;
        const fieldErrors = Object.fromEntries(
          Object.entries(apiErrors).map(([field, messages]) => [field, messages])
        );
        formApi.setErrorMap({
          onSubmit: {
            fields: fieldErrors,
            form: "Submission failed. Please correct the errors below."
          }
        });
      });
    }
  });
  return /* @__PURE__ */ import_react12.default.createElement(import_react12.default.Fragment, null, /* @__PURE__ */ import_react12.default.createElement(
    "form",
    {
      onSubmit: (e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }
    },
    config.layout && config.layout.length > 0 ? config.layout.map((row, rowIndex) => /* @__PURE__ */ import_react12.default.createElement("div", { key: rowIndex, className: `input-row ${config.id}-input-row` }, row.map((key) => /* @__PURE__ */ import_react12.default.createElement(
      FormField_default,
      {
        form,
        key,
        field: config.fields[key],
        fieldName: key,
        form_id: config.id
      }
    )))) : Object.keys(config.fields).map((key) => /* @__PURE__ */ import_react12.default.createElement(
      FormField_default,
      {
        form,
        key,
        field: config.fields[key],
        fieldName: key,
        form_id: config.id
      }
    )),
    /* @__PURE__ */ import_react12.default.createElement("button", { type: "submit" }, config.submit_text)
  ), /* @__PURE__ */ import_react12.default.createElement(
    Dialog_default,
    {
      isOpen: showSuccessDialog,
      onClose: () => setShowSuccessDialog(false),
      title: "Success"
    },
    config.success_msg || "Form submitted successfully"
  ));
}

// src/react/tables/Table.jsx
var import_react16 = __toESM(require("react"));
var import_react_table = require("@tanstack/react-table");

// unplugin-icons:~icons/iconamoon/eye-light.jsx
var React13 = __toESM(require("react"));
var import_react13 = require("react");
var iconamoonEyeLight = ({
  title,
  titleId,
  ...props
}, ref) => /* @__PURE__ */ React13.createElement("svg", { viewBox: "0 0 24 24", width: "1.2em", height: "1.2em", ref, "aria-labelledby": titleId, ...props }, title ? /* @__PURE__ */ React13.createElement("title", { id: titleId }, title) : null, /* @__PURE__ */ React13.createElement("g", { fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.5 }, /* @__PURE__ */ React13.createElement("path", { d: "M15 12a3 3 0 1 1-6 0a3 3 0 0 1 6 0" }), /* @__PURE__ */ React13.createElement("path", { d: "M2 12c1.6-4.097 5.336-7 10-7s8.4 2.903 10 7c-1.6 4.097-5.336 7-10 7s-8.4-2.903-10-7" })));
var ForwardRef = (0, import_react13.forwardRef)(iconamoonEyeLight);
var eye_light_default = ForwardRef;

// unplugin-icons:~icons/lucide/edit.jsx
var React14 = __toESM(require("react"));
var import_react14 = require("react");
var lucideEdit = ({
  title,
  titleId,
  ...props
}, ref) => /* @__PURE__ */ React14.createElement("svg", { viewBox: "0 0 24 24", width: "1.2em", height: "1.2em", ref, "aria-labelledby": titleId, ...props }, title ? /* @__PURE__ */ React14.createElement("title", { id: titleId }, title) : null, /* @__PURE__ */ React14.createElement("g", { fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2 }, /* @__PURE__ */ React14.createElement("path", { d: "M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" }), /* @__PURE__ */ React14.createElement("path", { d: "M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z" })));
var ForwardRef2 = (0, import_react14.forwardRef)(lucideEdit);
var edit_default = ForwardRef2;

// unplugin-icons:~icons/mingcute/delete-2-line.jsx
var React15 = __toESM(require("react"));
var import_react15 = require("react");
var mingcuteDelete2Line = ({
  title,
  titleId,
  ...props
}, ref) => /* @__PURE__ */ React15.createElement("svg", { viewBox: "0 0 24 24", width: "1.2em", height: "1.2em", ref, "aria-labelledby": titleId, ...props }, title ? /* @__PURE__ */ React15.createElement("title", { id: titleId }, title) : null, /* @__PURE__ */ React15.createElement("path", { fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeWidth: 2, d: "m5 6l.876 13.133A2 2 0 0 0 7.87 21h8.258a2 2 0 0 0 1.995-1.867L19 6M8 6l.772-2.316A1 1 0 0 1 9.721 3h4.558a1 1 0 0 1 .949.684L16 6m-6 5v5m4-5v5M4 6h16" }));
var ForwardRef3 = (0, import_react15.forwardRef)(mingcuteDelete2Line);
var delete_2_line_default = ForwardRef3;

// src/react/icons/IconMap.jsx
var IconMap = {
  "iconamoon:eye-light": eye_light_default,
  "lucide:edit": edit_default,
  "mingcute:delete-2-line": delete_2_line_default
};
var IconMap_default = IconMap;

// src/react/tables/Table.jsx
function Table(config) {
  const columnHelper = (0, import_react_table.createColumnHelper)();
  var cols = [];
  for (let key in config.columns) {
    cols.push(
      columnHelper.accessor(
        key,
        {
          header: config.columns[key].display
        }
      )
    );
  }
  if (config.buttons) {
    cols.push(columnHelper.display({
      id: "actions",
      cell: (info) => /* @__PURE__ */ import_react16.default.createElement("div", { className: "normal-buttons" }, config.buttons.map((button, index) => {
        const IconComponent = IconMap_default[button.icon];
        const Wrapper = button.view ? "a" : import_react16.default.Fragment;
        return /* @__PURE__ */ import_react16.default.createElement(Wrapper, { href: button.view ? button.view.url + "?" + button.view.name + "=" + info.row.original[button.view.param] : void 0 }, /* @__PURE__ */ import_react16.default.createElement(
          "button",
          {
            key: button.icon ?? index,
            type: "button",
            className: `btn w-32-px h-32-px rounded-circle ${button.background_color_class} ${button.text_color_class} d-inline-flex align-items-center justify-content-center`
          },
          /* @__PURE__ */ import_react16.default.createElement(IconComponent, null)
        ));
      }))
    }));
  }
  const columns = columnHelper.columns(cols);
  const features = (0, import_react_table.tableFeatures)({ rowPaginationFeature: import_react_table.rowPaginationFeature, globalFilteringFeature: import_react_table.globalFilteringFeature, rowSortingFeature: import_react_table.rowSortingFeature });
  const pageSize = config.pageSize ?? config.page_length ?? 10;
  const [data, setData] = (0, import_react16.useState)([]);
  const [pagination, setPagination] = (0, import_react16.useState)({ pageIndex: 0, pageSize });
  const [globalFilter, setGlobalFilter] = (0, import_react16.useState)("");
  const [sorting, setSorting] = (0, import_react16.useState)([]);
  const [totalRows, setTotalRows] = (0, import_react16.useState)(0);
  const [activeFilters, setActiveFilters] = (0, import_react16.useState)(() => {
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
  const [deletePopup, setDeletePopup] = (0, import_react16.useState)({ show: false, warning: "", row: null });
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
  (0, import_react16.useEffect)(() => {
    const controller = new AbortController();
    const params = new URLSearchParams({
      start: String(pagination.pageIndex * pagination.pageSize),
      length: String(pagination.pageSize)
    });
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
  }, [config.id, pagination.pageIndex, pagination.pageSize, globalFilter, sorting, config.searchParam, activeFilters]);
  (0, import_react16.useEffect)(() => {
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
    var _a;
    const warning = ((_a = config.delete) == null ? void 0 : _a.warning) ?? "";
    const matches = [...warning.matchAll(/\{(.*?)\}/g)];
    const args = matches.map((match) => match[1].trim());
    let processedWarning = warning;
    for (const arg of args) {
      processedWarning = processedWarning.replace("{" + arg + "}", row[arg]);
    }
    setDeletePopup({ show: true, warning: processedWarning, row });
  };
  const handleConfirmDelete = () => {
    var _a;
    const formData = new FormData();
    formData.append("id", deletePopup.row.id);
    formData.append("_token", ((_a = document.querySelector('meta[name="csrf-token"]')) == null ? void 0 : _a.getAttribute("content")) ?? "");
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
  const handleCloseDeletePopup = () => {
    setDeletePopup({ show: false, warning: "", row: null });
  };
  return /* @__PURE__ */ import_react16.default.createElement("div", { className: "dt-container" }, /* @__PURE__ */ import_react16.default.createElement("div", { className: "dt-layout-row" }, /* @__PURE__ */ import_react16.default.createElement("div", { className: "dt-layout-cell dt-layout-start" }, /* @__PURE__ */ import_react16.default.createElement(
    "select",
    {
      value: pagination.pageSize,
      onChange: (event) => table.setPageSize(Number(event.target.value))
    },
    (config.pageSizes ?? [10, 25, 50, 100]).map((size) => /* @__PURE__ */ import_react16.default.createElement("option", { key: size, value: size }, size, " per page"))
  )), /* @__PURE__ */ import_react16.default.createElement("div", { className: "dt-layout-cell dt-layout-end", style: { display: "flex", flexDirection: "row", justifyContent: "flex-end", gap: "6px" } }, config.filters && Object.entries(config.filters).map(([filterKey, filter]) => /* @__PURE__ */ import_react16.default.createElement("div", { key: filterKey, className: "filter", style: { display: "flex", flexDirection: "row", justifyContent: "flex-end", gap: "8px", marginLeft: "8px", alignItems: "center" } }, /* @__PURE__ */ import_react16.default.createElement("p", { style: { margin: "0" } }, filter.display), filter.filters && Object.entries(filter.filters).map(([optionKey, option]) => /* @__PURE__ */ import_react16.default.createElement(
    "button",
    {
      key: optionKey,
      id: `f-${filterKey}-${optionKey}`,
      className: `filter-button btn btn-outline-neutral-900 no-hover ${activeFilters[filterKey] === optionKey ? "active" : ""}`,
      onClick: () => handleFilterClick(filterKey, optionKey)
    },
    option.display
  )))), /* @__PURE__ */ import_react16.default.createElement("div", { className: "dt-search" }, /* @__PURE__ */ import_react16.default.createElement("label", null, "Buscar:"), /* @__PURE__ */ import_react16.default.createElement(
    "input",
    {
      type: "search",
      value: globalFilter,
      placeholder: config.searchPlaceholder ?? "Search...",
      "aria-label": config.searchLabel ?? "Search table",
      onChange: (event) => table.setGlobalFilter(event.target.value)
    }
  )))), /* @__PURE__ */ import_react16.default.createElement("table", { className: "table bordered-table mb-0 dataTable", style: { width: "97.2222%" } }, /* @__PURE__ */ import_react16.default.createElement("thead", null, table.getHeaderGroups().map((headerGroup) => /* @__PURE__ */ import_react16.default.createElement("tr", { key: headerGroup.id }, headerGroup.headers.map((header) => /* @__PURE__ */ import_react16.default.createElement(
    "th",
    {
      key: header.id,
      onClick: header.column.getToggleSortingHandler(),
      style: { cursor: header.column.getCanSort() ? "pointer" : "default" },
      className: `dt-orderable-asc dt-orderable-desc ${header.column.getIsSorted() ? header.column.getIsSorted() == "desc" ? "dt-ordering-desc" : "dt-ordering-asc" : ""}`
    },
    header.isPlaceholder ? null : /* @__PURE__ */ import_react16.default.createElement("div", null, /* @__PURE__ */ import_react16.default.createElement(table.FlexRender, { header }), /* @__PURE__ */ import_react16.default.createElement("span", { className: "dt-column-order" }))
  ))))), /* @__PURE__ */ import_react16.default.createElement("tbody", null, table.getRowModel().rows.map((row) => /* @__PURE__ */ import_react16.default.createElement("tr", { key: row.id }, row.getAllCells().map((cell) => /* @__PURE__ */ import_react16.default.createElement("td", { key: cell.id }, /* @__PURE__ */ import_react16.default.createElement(table.FlexRender, { cell })))))), /* @__PURE__ */ import_react16.default.createElement("tfoot", null, table.getFooterGroups().map((footerGroup) => /* @__PURE__ */ import_react16.default.createElement("tr", { key: footerGroup.id }, footerGroup.headers.map((header) => /* @__PURE__ */ import_react16.default.createElement("th", { key: header.id }, header.isPlaceholder ? null : /* @__PURE__ */ import_react16.default.createElement(table.FlexRender, { footer: header }))))))), /* @__PURE__ */ import_react16.default.createElement("div", { className: "dt-layout-row" }, /* @__PURE__ */ import_react16.default.createElement("div", { className: "dt-layout-cell dt-layout-start" }, "Mostrando ", totalRows === 0 ? 0 : pagination.pageIndex * pagination.pageSize + 1, " a ", Math.min((pagination.pageIndex + 1) * pagination.pageSize, totalRows), " de ", totalRows, " registros"), /* @__PURE__ */ import_react16.default.createElement("div", { className: "dt-layout-cell dt-layout-end" }, /* @__PURE__ */ import_react16.default.createElement("div", { className: "dt-paging", style: { display: "flex", gap: "4px", alignItems: "center" } }, /* @__PURE__ */ import_react16.default.createElement(
    "button",
    {
      type: "button",
      onClick: () => table.firstPage(),
      disabled: !table.getCanPreviousPage(),
      style: { padding: "6px 12px", borderRadius: "4px", border: "1px solid #d1d5db", background: "#f3f4f6", cursor: !table.getCanPreviousPage() ? "not-allowed" : "pointer", opacity: !table.getCanPreviousPage() ? 0.5 : 1 }
    },
    "Primera"
  ), /* @__PURE__ */ import_react16.default.createElement(
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
        return /* @__PURE__ */ import_react16.default.createElement("span", { key: `ellipsis-${index}`, style: { padding: "6px 12px" } }, "...");
      }
      const isActive = page === currentPage;
      return /* @__PURE__ */ import_react16.default.createElement(
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
  })(), /* @__PURE__ */ import_react16.default.createElement(
    "button",
    {
      type: "button",
      onClick: () => table.nextPage(),
      disabled: !table.getCanNextPage(),
      style: { padding: "6px 12px", borderRadius: "4px", border: "1px solid #d1d5db", background: "#f3f4f6", cursor: !table.getCanNextPage() ? "not-allowed" : "pointer", opacity: !table.getCanNextPage() ? 0.5 : 1 }
    },
    "Siguiente"
  ), /* @__PURE__ */ import_react16.default.createElement(
    "button",
    {
      type: "button",
      onClick: () => table.lastPage(),
      disabled: !table.getCanNextPage(),
      style: { padding: "6px 12px", borderRadius: "4px", border: "1px solid #d1d5db", background: "#f3f4f6", cursor: !table.getCanNextPage() ? "not-allowed" : "pointer", opacity: !table.getCanNextPage() ? 0.5 : 1 }
    },
    "\xDAltima"
  )))), /* @__PURE__ */ import_react16.default.createElement("div", { className: "spacer-md" }));
}

// src/react/mount.jsx
var import_client = require("react-dom/client");
var import_react17 = __toESM(require("react"));
var registry = {
  "form": Form,
  "table": Table
};
function mount(el, name, config) {
  console.log(name);
  const Component = registry[name];
  const root = (0, import_client.createRoot)(el);
  root.render(/* @__PURE__ */ import_react17.default.createElement(Component, { ...config }));
  el.removeAttribute("data-config");
  el.removeAttribute("data-widget");
  return () => root.unmount();
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Form,
  ImageUploader,
  Input,
  Table,
  mount
});
