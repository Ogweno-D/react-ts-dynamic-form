import ReusableForm from "./ReusableForm.tsx";
import type {formLayoutType} from "./FormLayout.tsx";


type formSchema = {
    id: string;
    fields: Record<string, any>;
    meta: {
        title: string;
        subtitle?: string;
        description?: string;
    }
    layout: formLayoutType[]
}

interface DynamicFormProps {
    formSchema: formSchema
}

function DynamicForm(props: DynamicFormProps) {
    const formFields : any = Object.values(props.formSchema.fields)

    return (
        <div>
            <h2>{props.formSchema.meta.title}</h2>
            <h2>{props.formSchema.meta.subtitle} </h2>
            <ReusableForm id={props.formSchema.id} fields={formFields} layout={props.formSchema.layout}></ReusableForm>
        </div>
    );
}

export default DynamicForm;