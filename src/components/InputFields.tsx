import { type JSX } from "react";
import { useForm } from "../hooks/useForm.ts";

interface InputFieldProps {
    fieldId: string;
}

const renderers: Record<string, (props: any) => JSX.Element> = {
    text: ({ field, onChange }) => (
        <input
            type="text"
            id={field.id}
            value={field.value || ""}
            placeholder={field.placeholder || ""}
            onChange={(e) => onChange(field.id, e.target.value)}
        />
    ),
    number: ({ field, onChange }) => (
        <input
            type="number"
            id={field.id}
            value={field.value || ""}
            placeholder={field.placeholder || ""}
            min={field.props?.min}
            max={field.props?.max}
            step={field.props?.step || 1}
            onChange={(e) => onChange(field.id, e.target.value)}
        />
    ),
    date: ({ field, onChange }) => (
        <input
            type="date"
            id={field.id}
            value={field.value || ""}
            placeholder={field.placeholder || ""}
            min={field.props?.minDate?.toISOString().split("T")[0]}
            onChange={(e) => onChange(field.id, e.target.value)}
        />
    ),
    textarea: ({ field, onChange }) => (
        <textarea
            id={field.id}
            rows={field.props?.minRows || 2}
            value={field.value || ""}
            placeholder={field.placeholder || ""}
            onChange={(e) => onChange(field.id, e.target.value)}
        />
    ),
    checkbox: ({ field, onChange }) => (
        <input
            type="checkbox"
            id={field.id}
            checked={!!field.value}
            onChange={(e) => onChange(field.id, e.target.checked)}
        />
    ),
    select: ({ field, onChange }) => (
        <select
            id={field.id}
            value={field.value || ""}
            onChange={(e) => onChange(field.id, e.target.value)}
        >
            <option value="">{field.placeholder || "Select..."}</option>
            {field.props?.data?.map((opt: any, i: number) => (
                <option key={i} value={opt.value || opt}>
                    {opt.label || opt}
                </option>
            ))}
        </select>
    ),
    multiselect: ({ field, onChange }) => {
        const valueArray = Array.isArray(field.value) ? field.value : [];

        return (
            <select
                id={field.id}
                value={valueArray}
                multiple
                onChange={(e) => {
                    const values = Array.from(e.target.selectedOptions, (o) => o.value);
                    onChange(field.id, values);
                }}
            >
                {field.props?.data?.map((opt: any, i: number) => (
                    <option key={i} value={opt.value || opt}>
                        {opt.label || opt}
                    </option>
                ))}
            </select>
        );
    },

    radio: ({ field, onChange }) => (
        <>
            {field.props?.options?.map((opt: any, i: number) => (
                <label key={i}>
                    <input
                        type="radio"
                        name={field.id}
                        value={opt.value || opt}
                        checked={field.value === (opt.value || opt)}
                        onChange={() => onChange(field.id, opt.value || opt)}
                    />
                    {opt.label || opt}
                </label>
            ))}
        </>
    ),
    file: ({ field, onChange }) => (
        <input
            type="file"
            id={field.id}
            accept={field.props?.accept}
            onChange={(e) => onChange(field.id, e.target.files?.[0] || null)}
        />
    ),
    switch: ({ field, onChange }) => (
        <label className="switch">
            <input
                type="checkbox"
                id={field.id}
                checked={!!field.value}
                onChange={(e) => onChange(field.id, e.target.checked)}
            />
            <span className="slider round"></span>
        </label>
    )

};

export default function InputFields({ fieldId }: InputFieldProps) {
    const { schema, setFieldValue, formValues } = useForm();
    const field = schema.fields[fieldId];
    if (!field) return null;

    const Renderer = renderers[field.renderer];
    if (!Renderer) return null;

    return (
        <div className="form-field">
            {/*{field.label && <label htmlFor={field.id}>{field.label}</label>}*/}
            <Renderer field={{ ...field, value: formValues[field.id] }} onChange={setFieldValue} />
        </div>
    );
}
