import {useForm} from "react-hook-form";
import InputFields, {type InputField} from "./InputFields.tsx";

interface FormInputProps{
    field: InputField;
}

// Can I have different fields for the form Input
// The field received is passed is checked if it is and displayed accordingly
// This form input should also take props
// Text Input Fields - email, password {inputType}
// TextArea Input Fields - rows column
// Select - > Takes props for options
// Checkbox
// Radio

function FormInput(props: FormInputProps) {
    return (
        <div className={"form-input"}>
            <div>
                <label htmlFor={`${props.field.id}`}>{props.field.label}</label>
                <InputFields field={props.field} />
            </div>
        </div>
    );
}

export default FormInput;