import { useFormContext as useReactFormContext } from "react-hook-form";
import { useForm } from "../hooks/useForm.ts";
import InputFields from "./InputFields";

interface FormInputProps {
    fieldId: string;
}

export default function FormInput({ fieldId }: FormInputProps) {
    const { schema, checkVisibility } = useForm();
    const { register, watch, formState: { errors } } = useReactFormContext();

    const field = schema.fields[fieldId];
    if (!field) return null;

    if (!checkVisibility(field.visibleWhen)) return null;
    // Watch the dependent field
    const passwordValue = watch("password");

    // Extend rules dynamically for confirmPassword
    const rules = {
        ...field.rules,
        validate: (value: any) =>
            fieldId === "confirmPassword"
                ? value === passwordValue || "Passwords don't match"
                : field.rules?.validate?.(value)
    };

    return (
        <div className="form-input">
            <label htmlFor={field.id}>
                {field.label} {field.rules?.required && <span className="required">*</span>}
            </label>

            <InputFields fieldId={field.id} register={register} rules={rules} />

            {errors[field.id] && (
                <span className="error">{errors[field.id]?.message as string}</span>
            )}
        </div>
    );
}
