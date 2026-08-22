// src/react/forms/Form.jsx
import React12 from "react";
import axios2 from "axios";

// src/react/forms/FormField.jsx
import React10 from "react";

// src/react/forms/Input.jsx
import React, { useRef } from "react";
var Input = ({ ref, value, field, ...props }) => {
  const internalRef = useRef(null);
  const inputRef = ref || internalRef;
  return /* @__PURE__ */ React.createElement(
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
import React2, { useRef as useRef2, useEffect } from "react";
var MoneyInput = ({ value, field, ...props }) => {
  const ref = useRef2(null);
  const cursorRef = useRef2(0);
  useEffect(() => {
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
  return /* @__PURE__ */ React2.createElement(
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
import React3, { useRef as useRef3 } from "react";
var PercentInput = ({ value, field, ...props }) => {
  const ref = useRef3(null);
  const handleChange = (e) => {
    field.handleChange(e.target.value.replace(/[^0-9]/g, ""));
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
      value: value + "%",
      onChange: handleChange,
      onKeyDown: handleKeyDown,
      ...props
    }
  );
};
var PercentInput_default = PercentInput;

// src/react/forms/NipInput.jsx
import React4, { useRef as useRef4 } from "react";
var NipInput = ({ value, field, max, ...props }) => {
  const ref = useRef4(null);
  const handleChange = (e) => {
    var newValue = e.target.value.replace(/\D/g, "");
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
      type: "password",
      value,
      field,
      ...props
    }
  );
};
var NipInput_default = NipInput;

// src/react/forms/TextArea.jsx
import React5, { useRef as useRef5 } from "react";
function TextArea({ value, field, ...props }) {
  const ref = useRef5(null);
  const handleChange = (e) => {
    field.handleChange(e.target.value);
    props.onChange && props.onChange(e.target.value);
  };
  return /* @__PURE__ */ React5.createElement(
    "textarea",
    {
      ref,
      onChange: handleChange,
      ...props
    }
  );
}

// src/react/forms/PhoneInput.jsx
import React6, { useRef as useRef6 } from "react";
var PhoneInput = ({ value, field, ...props }) => {
  const handleChange = (e) => {
    var newValue = e.target.value.replace(/\D/g, "");
    field.handleChange(newValue);
  };
  return /* @__PURE__ */ React6.createElement(
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
import React7, { useRef as useRef7 } from "react";
var MailInput = ({ value, field, ...props }) => {
  return /* @__PURE__ */ React7.createElement(
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
import React8, { useRef as useRef8, useCallback } from "react";
import ReactSelect from "react-select";
import AsyncSelect from "react-select/async";
var Select = ({ value, field, options, dynamic, ...props }) => {
  const ref = useRef8(null);
  const handleChange = (selectedOption) => {
    field.handleChange(selectedOption ? selectedOption.value : "");
  };
  const selectOptions = Object.keys(options).map((key) => ({
    value: key,
    label: options[key]
  }));
  if (!dynamic) {
    const selectedValue = value && value.current ? selectOptions.find((opt) => opt.value === value.current) : null;
    return /* @__PURE__ */ React8.createElement(
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
    return /* @__PURE__ */ React8.createElement(
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

// src/react/forms/ImageUploader.jsx
import React9, { useRef as useRef9, useState, useEffect as useEffect2 } from "react";
var ImageUploader = ({ value, field, id, name, imageUrl }) => {
  const [preview, setPreview] = useState(imageUrl || null);
  const fileInputRef = useRef9(null);
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
  return /* @__PURE__ */ React9.createElement("label", { htmlFor: id, className: "image-uploader-label" }, /* @__PURE__ */ React9.createElement(
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
  ), preview ? /* @__PURE__ */ React9.createElement(
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
  ) : /* @__PURE__ */ React9.createElement(
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
  return /* @__PURE__ */ React10.createElement(
    form.Field,
    {
      name: fieldName,
      children: (fieldProps) => {
        console.log("fieldProps.state.meta");
        console.log(fieldProps.state.meta);
        return /* @__PURE__ */ React10.createElement(React10.Fragment, null, /* @__PURE__ */ React10.createElement("label", null, field.label, field.required && /* @__PURE__ */ React10.createElement("span", null, "*"), /* @__PURE__ */ React10.createElement(
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
        )), fieldProps.state.meta.errors.length > 0 && /* @__PURE__ */ React10.createElement("div", { className: "error-message" }, fieldProps.state.meta.errors.map((error2, index) => /* @__PURE__ */ React10.createElement("div", { key: index }, error2))));
      }
    }
  );
};
var FormField_default = FormField;

// src/react/forms/Dialog.jsx
import React11 from "react";
var Dialog = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return /* @__PURE__ */ React11.createElement("div", { className: "dialog-overlay", onClick: onClose }, /* @__PURE__ */ React11.createElement("div", { className: "dialog-content", onClick: (e) => e.stopPropagation() }, title && /* @__PURE__ */ React11.createElement("div", { className: "dialog-header" }, title), /* @__PURE__ */ React11.createElement("div", { className: "dialog-body" }, children), /* @__PURE__ */ React11.createElement("div", { className: "dialog-footer" }, /* @__PURE__ */ React11.createElement("button", { onClick: onClose }, "Close"))));
};
var Dialog_default = Dialog;

// src/react/forms/Form.jsx
import { useForm } from "@tanstack/react-form";
function Form(config) {
  const [showSuccessDialog, setShowSuccessDialog] = React12.useState(false);
  const form = useForm({
    defaultValues: Object.fromEntries(
      Object.keys(config.fields).map((key) => [key, config.fields[key].type === "image" ? null : ""])
    ),
    onSubmit: ({ value, formApi }) => {
      console.log(value);
      axios2.post(`/form/${config.id}`, value).then(() => {
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
  return /* @__PURE__ */ React12.createElement(React12.Fragment, null, /* @__PURE__ */ React12.createElement(
    "form",
    {
      onSubmit: (e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }
    },
    config.layout && config.layout.length > 0 ? config.layout.map((row, rowIndex) => /* @__PURE__ */ React12.createElement("div", { key: rowIndex, className: `input-row ${config.id}-input-row` }, row.map((key) => /* @__PURE__ */ React12.createElement(
      FormField_default,
      {
        form,
        key,
        field: config.fields[key],
        fieldName: key,
        form_id: config.id
      }
    )))) : Object.keys(config.fields).map((key) => /* @__PURE__ */ React12.createElement(
      FormField_default,
      {
        form,
        key,
        field: config.fields[key],
        fieldName: key,
        form_id: config.id
      }
    )),
    /* @__PURE__ */ React12.createElement("button", { type: "submit" }, config.submit_text)
  ), /* @__PURE__ */ React12.createElement(
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
import React16, { useState as useState2, useEffect as useEffect3 } from "react";
import {
  createColumnHelper,
  globalFilteringFeature,
  rowPaginationFeature,
  rowSortingFeature,
  tableFeatures,
  useTable
} from "@tanstack/react-table";

// unplugin-icons:~icons/iconamoon/eye-light.jsx
import * as React13 from "react";
import { forwardRef } from "react";
var iconamoonEyeLight = ({
  title,
  titleId,
  ...props
}, ref) => /* @__PURE__ */ React13.createElement("svg", { viewBox: "0 0 24 24", width: "1.2em", height: "1.2em", ref, "aria-labelledby": titleId, ...props }, title ? /* @__PURE__ */ React13.createElement("title", { id: titleId }, title) : null, /* @__PURE__ */ React13.createElement("g", { fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.5 }, /* @__PURE__ */ React13.createElement("path", { d: "M15 12a3 3 0 1 1-6 0a3 3 0 0 1 6 0" }), /* @__PURE__ */ React13.createElement("path", { d: "M2 12c1.6-4.097 5.336-7 10-7s8.4 2.903 10 7c-1.6 4.097-5.336 7-10 7s-8.4-2.903-10-7" })));
var ForwardRef = forwardRef(iconamoonEyeLight);
var eye_light_default = ForwardRef;

// unplugin-icons:~icons/lucide/edit.jsx
import * as React14 from "react";
import { forwardRef as forwardRef2 } from "react";
var lucideEdit = ({
  title,
  titleId,
  ...props
}, ref) => /* @__PURE__ */ React14.createElement("svg", { viewBox: "0 0 24 24", width: "1.2em", height: "1.2em", ref, "aria-labelledby": titleId, ...props }, title ? /* @__PURE__ */ React14.createElement("title", { id: titleId }, title) : null, /* @__PURE__ */ React14.createElement("g", { fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2 }, /* @__PURE__ */ React14.createElement("path", { d: "M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" }), /* @__PURE__ */ React14.createElement("path", { d: "M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z" })));
var ForwardRef2 = forwardRef2(lucideEdit);
var edit_default = ForwardRef2;

// unplugin-icons:~icons/mingcute/delete-2-line.jsx
import * as React15 from "react";
import { forwardRef as forwardRef3 } from "react";
var mingcuteDelete2Line = ({
  title,
  titleId,
  ...props
}, ref) => /* @__PURE__ */ React15.createElement("svg", { viewBox: "0 0 24 24", width: "1.2em", height: "1.2em", ref, "aria-labelledby": titleId, ...props }, title ? /* @__PURE__ */ React15.createElement("title", { id: titleId }, title) : null, /* @__PURE__ */ React15.createElement("path", { fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeWidth: 2, d: "m5 6l.876 13.133A2 2 0 0 0 7.87 21h8.258a2 2 0 0 0 1.995-1.867L19 6M8 6l.772-2.316A1 1 0 0 1 9.721 3h4.558a1 1 0 0 1 .949.684L16 6m-6 5v5m4-5v5M4 6h16" }));
var ForwardRef3 = forwardRef3(mingcuteDelete2Line);
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
  const columnHelper = createColumnHelper();
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
      cell: (info) => /* @__PURE__ */ React16.createElement("div", { className: "normal-buttons" }, config.buttons.map((button, index) => {
        const IconComponent = IconMap_default[button.icon];
        const Wrapper = button.view ? "a" : React16.Fragment;
        return /* @__PURE__ */ React16.createElement(Wrapper, { href: button.view ? button.view.url + "?" + button.view.name + "=" + info.row.original[button.view.param] : void 0 }, /* @__PURE__ */ React16.createElement(
          "button",
          {
            key: button.icon ?? index,
            type: "button",
            className: `btn w-32-px h-32-px rounded-circle ${button.background_color_class} ${button.text_color_class} d-inline-flex align-items-center justify-content-center`
          },
          /* @__PURE__ */ React16.createElement(IconComponent, null)
        ));
      }))
    }));
  }
  const columns = columnHelper.columns(cols);
  const features = tableFeatures({ rowPaginationFeature, globalFilteringFeature, rowSortingFeature });
  const pageSize = config.pageSize ?? config.page_length ?? 10;
  const [data, setData] = useState2([]);
  const [pagination, setPagination] = useState2({ pageIndex: 0, pageSize });
  const [globalFilter, setGlobalFilter] = useState2("");
  const [sorting, setSorting] = useState2([]);
  const [totalRows, setTotalRows] = useState2(0);
  const [activeFilters, setActiveFilters] = useState2(() => {
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
  const [deletePopup, setDeletePopup] = useState2({ show: false, warning: "", row: null });
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
  return /* @__PURE__ */ React16.createElement("div", { className: "dt-container" }, /* @__PURE__ */ React16.createElement("div", { className: "dt-layout-row" }, /* @__PURE__ */ React16.createElement("div", { className: "dt-layout-cell dt-layout-start" }, /* @__PURE__ */ React16.createElement(
    "select",
    {
      value: pagination.pageSize,
      onChange: (event) => table.setPageSize(Number(event.target.value))
    },
    (config.pageSizes ?? [10, 25, 50, 100]).map((size) => /* @__PURE__ */ React16.createElement("option", { key: size, value: size }, size, " per page"))
  )), /* @__PURE__ */ React16.createElement("div", { className: "dt-layout-cell dt-layout-end", style: { display: "flex", flexDirection: "row", justifyContent: "flex-end", gap: "6px" } }, config.filters && Object.entries(config.filters).map(([filterKey, filter]) => /* @__PURE__ */ React16.createElement("div", { key: filterKey, className: "filter", style: { display: "flex", flexDirection: "row", justifyContent: "flex-end", gap: "8px", marginLeft: "8px", alignItems: "center" } }, /* @__PURE__ */ React16.createElement("p", { style: { margin: "0" } }, filter.display), filter.filters && Object.entries(filter.filters).map(([optionKey, option]) => /* @__PURE__ */ React16.createElement(
    "button",
    {
      key: optionKey,
      id: `f-${filterKey}-${optionKey}`,
      className: `filter-button btn btn-outline-neutral-900 no-hover ${activeFilters[filterKey] === optionKey ? "active" : ""}`,
      onClick: () => handleFilterClick(filterKey, optionKey)
    },
    option.display
  )))), /* @__PURE__ */ React16.createElement("div", { className: "dt-search" }, /* @__PURE__ */ React16.createElement("label", null, "Buscar:"), /* @__PURE__ */ React16.createElement(
    "input",
    {
      type: "search",
      value: globalFilter,
      placeholder: config.searchPlaceholder ?? "Search...",
      "aria-label": config.searchLabel ?? "Search table",
      onChange: (event) => table.setGlobalFilter(event.target.value)
    }
  )))), /* @__PURE__ */ React16.createElement("table", { className: "table bordered-table mb-0 dataTable", style: { width: "97.2222%" } }, /* @__PURE__ */ React16.createElement("thead", null, table.getHeaderGroups().map((headerGroup) => /* @__PURE__ */ React16.createElement("tr", { key: headerGroup.id }, headerGroup.headers.map((header) => /* @__PURE__ */ React16.createElement(
    "th",
    {
      key: header.id,
      onClick: header.column.getToggleSortingHandler(),
      style: { cursor: header.column.getCanSort() ? "pointer" : "default" },
      className: `dt-orderable-asc dt-orderable-desc ${header.column.getIsSorted() ? header.column.getIsSorted() == "desc" ? "dt-ordering-desc" : "dt-ordering-asc" : ""}`
    },
    header.isPlaceholder ? null : /* @__PURE__ */ React16.createElement("div", null, /* @__PURE__ */ React16.createElement(table.FlexRender, { header }), /* @__PURE__ */ React16.createElement("span", { className: "dt-column-order" }))
  ))))), /* @__PURE__ */ React16.createElement("tbody", null, table.getRowModel().rows.map((row) => /* @__PURE__ */ React16.createElement("tr", { key: row.id }, row.getAllCells().map((cell) => /* @__PURE__ */ React16.createElement("td", { key: cell.id }, /* @__PURE__ */ React16.createElement(table.FlexRender, { cell })))))), /* @__PURE__ */ React16.createElement("tfoot", null, table.getFooterGroups().map((footerGroup) => /* @__PURE__ */ React16.createElement("tr", { key: footerGroup.id }, footerGroup.headers.map((header) => /* @__PURE__ */ React16.createElement("th", { key: header.id }, header.isPlaceholder ? null : /* @__PURE__ */ React16.createElement(table.FlexRender, { footer: header }))))))), /* @__PURE__ */ React16.createElement("div", { className: "dt-layout-row" }, /* @__PURE__ */ React16.createElement("div", { className: "dt-layout-cell dt-layout-start" }, "Mostrando ", totalRows === 0 ? 0 : pagination.pageIndex * pagination.pageSize + 1, " a ", Math.min((pagination.pageIndex + 1) * pagination.pageSize, totalRows), " de ", totalRows, " registros"), /* @__PURE__ */ React16.createElement("div", { className: "dt-layout-cell dt-layout-end" }, /* @__PURE__ */ React16.createElement("div", { className: "dt-paging", style: { display: "flex", gap: "4px", alignItems: "center" } }, /* @__PURE__ */ React16.createElement(
    "button",
    {
      type: "button",
      onClick: () => table.firstPage(),
      disabled: !table.getCanPreviousPage(),
      style: { padding: "6px 12px", borderRadius: "4px", border: "1px solid #d1d5db", background: "#f3f4f6", cursor: !table.getCanPreviousPage() ? "not-allowed" : "pointer", opacity: !table.getCanPreviousPage() ? 0.5 : 1 }
    },
    "Primera"
  ), /* @__PURE__ */ React16.createElement(
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
        return /* @__PURE__ */ React16.createElement("span", { key: `ellipsis-${index}`, style: { padding: "6px 12px" } }, "...");
      }
      const isActive = page === currentPage;
      return /* @__PURE__ */ React16.createElement(
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
  })(), /* @__PURE__ */ React16.createElement(
    "button",
    {
      type: "button",
      onClick: () => table.nextPage(),
      disabled: !table.getCanNextPage(),
      style: { padding: "6px 12px", borderRadius: "4px", border: "1px solid #d1d5db", background: "#f3f4f6", cursor: !table.getCanNextPage() ? "not-allowed" : "pointer", opacity: !table.getCanNextPage() ? 0.5 : 1 }
    },
    "Siguiente"
  ), /* @__PURE__ */ React16.createElement(
    "button",
    {
      type: "button",
      onClick: () => table.lastPage(),
      disabled: !table.getCanNextPage(),
      style: { padding: "6px 12px", borderRadius: "4px", border: "1px solid #d1d5db", background: "#f3f4f6", cursor: !table.getCanNextPage() ? "not-allowed" : "pointer", opacity: !table.getCanNextPage() ? 0.5 : 1 }
    },
    "\xDAltima"
  )))), /* @__PURE__ */ React16.createElement("div", { className: "spacer-md" }));
}

// src/react/mount.jsx
import { createRoot } from "react-dom/client";
import React17 from "react";
var registry = {
  "form": Form,
  "table": Table
};
function mount(el, name, config) {
  console.log(name);
  const Component = registry[name];
  const root = createRoot(el);
  root.render(/* @__PURE__ */ React17.createElement(Component, { ...config }));
  el.removeAttribute("data-config");
  el.removeAttribute("data-widget");
  return () => root.unmount();
}
export {
  Form,
  ImageUploader_default as ImageUploader,
  Input_default as Input,
  Table,
  mount
};
