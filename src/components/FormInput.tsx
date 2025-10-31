import InputFields from "./InputFields";
import {useForm} from "../hooks/useForm.ts";


interface FormInputProps {
    fieldId: string;
}

export default function FormInput({ fieldId }: FormInputProps) {
    const { schema, checkVisibility } = useForm();
    const field = schema.fields[fieldId];

    if (!checkVisibility(field.visibleWhen)) return null;

    return (
        <div className="form-input">
            <label htmlFor={field.id}>
                {field.label} {field.rules?.required && <span className="required">*</span>}
            </label>
            <InputFields fieldId={field.id} />
        </div>
    );
}
