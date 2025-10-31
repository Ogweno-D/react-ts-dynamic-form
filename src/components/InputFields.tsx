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
        <input
            type="text"
            id={field.id}
            {...(register ? register(field.id, field.rules) : {})}
            value={field.value || ""}
            placeholder={field.placeholder || ""}
            onChange={(e) => {
                onChange(field.id, e.target.value);
                register?.onChange?.(e);
            }}
        />
    ),
    email:({ field, onChange, register }: any) => (
        <input
            type={field.inputType || "email"}
            id={field.id}
            {...(register ? register(field.id, field.rules) : {})}
            placeholder={field.placeholder || ""}
            onChange={(e) => {
                onChange(field.id, e.target.value);
                register?.onChange?.(e);
            }}
        />
    ),
    password: ({ field, onChange, register, formValues }: any) => (
        <input
            type={field.inputType || "password"}
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
    ),
    number: ({ field, onChange, register }: any) => (
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
    ),
    textarea: ({ field, onChange, register }: any) => (
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
    ),
    checkbox: ({ field, onChange, register }: any) => (
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
    ),
    select: ({ field, onChange, register }: any) => (
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
                            {label}
                        </label>
                    );
                })}
            </div>
        );
    },
    switch: ({ field, onChange, register }: any) => (
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
    ),
    radio: ({ field, onChange, register }) => (
        <>
            {field.props?.options?.map((opt: any, i: number) => (
                <label key={i}>
                    <input
                        type="radio"
                        name={field.id}
                        value={opt.value || opt}
                        checked={field.value === (opt.value || opt)}
                        {...(register ? register(field.id, field.rules) : {})}
                        onChange={(e) => {
                            onChange(field.id, opt.value || opt);
                            register?.onChange?.(e);
                        }}
                    />
                    {opt.label || opt}
                </label>
            ))}
        </>

    ),
    file: ({ field, onChange, register }) => (
        <input
            type="file"
            id={field.id}
            accept={field.props?.accept}
            {...(register ? register(field.id, field.rules) : {})}
            onChange={(e) => {
                onChange(field.id, e.target.files?.[0] || null);
                register?.onChange?.(e);
            }}
        />
    ),
    date: ({ field, onChange, register}) => (
        <input
            type="date"
            id={field.id}
            value={field.value || ""}
            {...(register ? register(field.id, field.rules) : {})}
            onChange={(e) => {
                onChange(field.id, e.target.checked);
                register?.onChange?.(e);
            }}
        />
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
        type: field.inputType || "text"
    };


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
