import React from 'react';

const Input = (props) => {
    return (
        <input type={props.type}
            className={props.className}
            name={props.name}
            id={props.id}
            defaultValue={props.defaultValue}
            onChange={props.onChange}
            value={props.value}
            onBlur={props.onBlur}
            placeholder={props.placeholder}
            disabled={props.disabled}
            required={props.required}
            autoFocus={props.autoFocus}
            autoComplete={props.autoComplete}
            autoCorrect={props.autoCorrect}
            spellCheck={props.spellCheck}
            maxLength={props.maxLength}
            readOnly={props.readOnly}
            accept={props.accept}
            multiple={props.multiple}
            step={props.step}
            min={props.min}
            max={props.max}
            minLength={props.minLength}
            pattern={props.pattern}
            title={props.title}
            rows={props.rows}
            cols={props.cols}
            form={props.form}
            formAction={props.formAction}
            formEncType={props.formEncType}
            formMethod={props.formMethod}
            formNoValidate={props.formNoValidate}
            formTarget={props.formTarget}
            lang={props.lang}
            list={props.list}
            tabIndex={props.tabIndex}
            typeMismatch={props.typeMismatch}
            inputMode={props.inputMode}
            stepMismatch={props.stepMismatch}
            tooLong={props.tooLong}
            tooShort={props.tooShort}
            rangeOverflow={props.rangeOverflow}
            rangeUnderflow={props.rangeUnderflow}
            validity={props.validity}
            willValidate={props.willValidate}
            validityMessage={props.validityMessage}
            validationMessage={props.validationMessage}
            selectionDirection={props.selectionDirection}
            selectionEnd={props.selectionEnd}
            selectionStart={props.selectionStart}
            setSelectionRange={props.setSelectionRange}
            size={props.size}
            src={props.src}
            srcDoc={props.srcDoc}
            useMap={props.useMap}
        />
    )
}

export default Input;
