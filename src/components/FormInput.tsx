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
    const passwordValue = watch("password");

    const rules = {
        ...field.rules,
        validate: (value: any) =>
            fieldId === "confirmPassword"
                ? value === passwordValue || "Passwords don't match"
                : field.rules?.validate?.(value)
    };

    return (
        <div className="form-input">

            {/*<label className={"form-label"} htmlFor={field.id}>*/}
            {/*    {field.label} {field.rules?.required && <span className="field-required">*</span>}*/}
            {/*</label>*/}

            <InputFields fieldId={field.id} register={register} rules={rules} />

            {errors[field.id] && (
                <span className="input-error">{errors[field.id]?.message as string}</span>
            )}
        </div>
    );
}
