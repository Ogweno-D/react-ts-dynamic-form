// A form has an id and input fields with validation
import {useForm} from "react-hook-form";
import FormInput from "./FormInput.tsx";
import FormLayout, {type formLayoutType} from "./FormLayout.tsx";
import type {InputField} from "./InputFields.tsx";

interface ReusableFormProps{
    id: string;
    fields: Record<string, any>;
    layout: formLayoutType[]
}
function ReusableForm(props: ReusableFormProps) {
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();

    const onSubmit = (data : any) => {
        console.log(data);
    }

    // This is where I intend to do my layout of the form
    // But first let me create the renderer.
    // {console.log(props.layout)}

    return (
        <div>
            <form id={`${props.id}`} onSubmit={handleSubmit(onSubmit)}>
                {
                    props.fields.map((field: InputField) =>
                    (
                        <FormInput key={field.id} field={field}/>
                    ))
                }
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default ReusableForm;