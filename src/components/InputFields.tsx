import { type JSX } from "react";
import { useForm } from "../hooks/useForm.ts";
import type { UseFormRegister, FieldValues } from "react-hook-form";

interface InputFieldProps {
    fieldId: string;
    register?: UseFormRegister<FieldValues>;
    rules?: any;
}

const renderers: Record<string, (props: any) => JSX.Element> = {
    text: ({ field, onChange, register }: any) => (

        <div className="form-input">
            <label className={"form-label"} htmlFor={field.id}>
                {field.label} {field.rules?.required && <span className="field-required">*</span>}
            </label>
            <input
                type={field.type || "text"}
                id={field.id}
                {...(register ? register(field.id, field.rules) : {})}
                value={field.value || ""}
                placeholder={field.placeholder || ""}
                onChange={(e) => {
                    onChange(field.id, e.target.value);
                    register?.onChange?.(e);
                }}
            />
        </div>

    ),
    email:({ field, onChange, register }: any) => (
        <div className="form-input">
            <label className={"form-label"} htmlFor={field.id}>
                {field.label} {field.rules?.required && <span className="field-required">*</span>}
            </label>
            <input
                type={field.type || "email"}
                id={field.id}
                {...(register ? register(field.id, field.rules) : {})}
                placeholder={field.placeholder || ""}
                onChange={(e) => {
                    onChange(field.id, e.target.value);
                    register?.onChange?.(e);
                }}
            />
        </div>

    ),
    password: ({ field, onChange, register, formValues }: any) => (

        <div className="form-input">
            <label className={"form-label"} htmlFor={field.id}>
                {field.label} {field.rules?.required && <span className="field-required">*</span>}
            </label>

            <input
                type={field.type || "password"}
                id={field.id}
                placeholder={field.placeholder || "Enter your password"}
                {...(register
                    ? register(field.id, {
                        ...field.rules,
                        validate: (value: any) => {
                            if (field.id === "confirmPassword") {
                                return (
                                    value === formValues["password"] ||
                                    "Passwords do not match"
                                );
                            }
                            if (field.rules?.validate) {
                                return field.rules.validate(value, formValues);
                            }
                            return true;
                        },
                    })
                    : {})}
                onChange={(e) => {
                    onChange(field.id, e.target.value);
                    register?.onChange?.(e);
                }}
            />
        </div>

    ),
    number: ({ field, onChange, register }: any) => (
        <div className="form-input">
            <label className={"form-label"} htmlFor={field.id}>
                {field.label} {field.rules?.required && <span className="field-required">*</span>}
            </label>
            <input
                type="number"
                id={field.id}
                {...(register ? register(field.id, field.rules) : {})}
                value={field.value || ""}
                placeholder={field.placeholder || ""}
                min={field.props?.min}
                max={field.props?.max}
                step={field.props?.step || 1}
                onChange={(e) => {
                    onChange(field.id, e.target.value);
                    register?.onChange?.(e);
                }}
            />
        </div>

    ),
    textarea: ({ field, onChange, register }: any) => (
        <div className="form-input">
            <label className={"form-label"} htmlFor={field.id}>
                {field.label} {field.rules?.required && <span className="field-required">*</span>}
            </label>
            <textarea
                id={field.id}
                {...(register ? register(field.id, field.rules) : {})}
                rows={field.props?.minRows || 2}
                value={field.value || ""}
                placeholder={field.placeholder || ""}
                onChange={(e) => {
                    onChange(field.id, e.target.value);
                    register?.onChange?.(e);
                }}
            />
        </div>

    ),
    checkbox: ({ field, onChange, register }: any) => (
        <div className="form-checkbox">
            <input
                type="checkbox"
                id={field.id}
                {...(register ? register(field.id, field.rules) : {})}
                checked={!!field.value}
                onChange={(e) => {
                    onChange(field.id, e.target.checked);
                    register?.onChange?.(e);
                }}
            />
            <label htmlFor={field.id}>
                {field.label} {field.rules?.required && <span className="field-required">*</span>}
            </label>
        </div>

    ),
    select: ({ field, onChange, register }: any) => (
        <div className="form-input">
            <label className={"form-label"} htmlFor={field.id}>
                {field.label} {field.rules?.required && <span className="field-required">*</span>}
            </label>
            <select
                id={field.id}
                {...(register ? register(field.id, field.rules) : {})}
                value={field.value || ""}
                onChange={(e) => {
                    onChange(field.id, e.target.value);
                    register?.onChange?.(e);
                }}
            >
                <option value="">{field.placeholder || "Select..."}</option>
                {field.props?.data?.map((opt: any, i: number) => (
                    <option key={i} value={opt.value ?? opt}>
                        {opt.label ?? opt}
                    </option>
                ))}
            </select>
        </div>

    ),
    multiselect: ({ field, onChange, register }: any) => {
        const valueArray: string[] = Array.isArray(field.value) ? field.value : [];

        const handleToggle = (optionValue: string) => {
            let newValues: string[];
            if (valueArray.includes(optionValue)) {
                newValues = valueArray.filter((v) => v !== optionValue);
            } else {
                newValues = [...valueArray, optionValue];
            }
            onChange(field.id, newValues);
            register?.onChange?.({ target: { name: field.id, value: newValues } });
        };

        return (
            <div className="multiselect-checkbox">
                <label className={"form-label"} htmlFor={field.id}>
                    {field.label} {field.rules?.required && <span className="field-required">*</span>}
                </label>

                {field.props?.data?.map((opt: any, i: number) => {
                    const val = opt.value ?? opt;
                    const label = opt.label ?? opt;
                    return (
                        <label key={i} className="multiselect-option">
                            <input
                                type="checkbox"
                                value={val}
                                checked={valueArray.includes(val)}
                                onChange={() => handleToggle(val)}
                            />
                            <span>{label}</span>
                        </label>
                    );
                })}
            </div>

        );
    },
    switch: ({ field, onChange, register }: any) => (
        <div className="form-input">
            <label className="form-label" htmlFor={field.id}>
                {field.label} {field.rules?.required && <span className="field-required">*</span>}
            </label>

            <label className="switch">
                <input
                    type="checkbox"
                    id={field.id}
                    {...(register ? register(field.id, field.rules) : {})}
                    checked={!!field.value}
                    onChange={(e) => {
                        onChange(field.id, e.target.checked);
                        register?.onChange?.(e);
                    }}
                />
                <span className="slider round"></span>
            </label>
        </div>
    ),

    radio: ({ field, onChange, register }: any) => (
        <div className="form-radio-group">
            <span className="radio-label">{field.label}</span>
            <div className="radio-options">
                {field.props?.options?.map((opt: any, i: number) => {
                    const val = opt.value ?? opt;
                    const label = opt.label ?? opt;
                    return (
                        <label key={i} className="radio-option">
                            <input
                                type="radio"
                                name={field.id}
                                value={val}
                                checked={field.value === val}
                                {...(register ? register(field.id, field.rules) : {})}
                                onChange={(e) => {
                                    onChange(field.id, val);
                                    register?.onChange?.(e);
                                }}
                            />
                            <span className="radio-checkmark"></span>
                            {label}
                        </label>
                    );
                })}
            </div>
        </div>
    ),

    file: ({ field, onChange, register }) => {
        const hasFile = !!field.value;
        const labelText = hasFile ? field.value.name : field.label;

        return (
            <div className={`form-input file-input ${hasFile ? "has-file" : ""}`}>
                <label
                    className="form-label file-input-label"
                    htmlFor={field.id}
                >
                    {labelText}{" "}
                    {field.rules?.required && !hasFile && (
                        <span className="field-required">*</span>
                    )}
                </label>

                <input
                    type="file"
                    id={field.id}
                    accept={field.props?.accept}
                    {...(register ? register(field.id, field.rules) : {})}
                    onChange={(e) => {
                        const file = e.target.files?.[0] || null;
                        onChange(field.id, file);
                        register?.onChange?.(e);
                    }}
                />
            </div>
        );
    },


    date: ({ field, onChange, register}) => (

        <div className={"form-input"}>
            <label className={"form-label"} htmlFor={field.id}>
                {field.label} {field.rules?.required && <span className="field-required">*</span>}
            </label>

            <input
                type="date"
                id={field.id}
                value={field.value || ""}
                placeholder={field.props.placeholder}
                {...(register ? register(field.id, field.rules) : {})}
                onChange={(e) => {
                    onChange(field.id, e.target.checked);
                    register?.onChange?.(e);
                }}
            />
        </div>

    ),
};

export default function InputFields({ fieldId, register }: InputFieldProps) {
    const { schema, setFieldValue, formValues } = useForm();
    const field = schema.fields[fieldId];
    if (!field) return null;

    const Renderer = renderers[field.renderer];
    if (!Renderer) return null;


    const fieldWithType = {
        ...field,
        value: formValues[field.id],
        rules: field.rules,
        type: field.inputType || "text",
        props: field.props || {},
    };

    console.log(fieldWithType.props)


    return (
        <div className="form-field">
            <Renderer
                field={fieldWithType}
                onChange={setFieldValue}
                register={register}
                formValues={formValues}
            />
        </div>
    );
}
