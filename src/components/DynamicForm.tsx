import { FormProvider } from "../context/form.tsx";
import ReusableForm from "./ReusableForm.tsx";
import type {LayoutNode} from "./FormLayout.tsx";

export type formSchema = {
    id: string;
    fields: Record<string, any>;
    meta: {
        title: string;
        subtitle?: string;
        description?: string;
    }
    layout: LayoutNode[]
}

interface DynamicFormProps {
    formSchema: formSchema;
}

export default function DynamicForm({ formSchema }: DynamicFormProps) {
    return (
        <FormProvider schema={formSchema}>
            <div>
                <h2>{formSchema.meta.title}</h2>
                {formSchema.meta.subtitle && <h4>{formSchema.meta.subtitle}</h4>}
                <ReusableForm id={formSchema.id} layout={formSchema.layout} />
            </div>
        </FormProvider>
    );
}
