import { FormProvider } from "../context/form.tsx";
import ReusableForm from "./ReusableForm.tsx";
import type { LayoutNode } from "./FormLayout.tsx";

export type formSchema = {
    id: string;
    fields: Record<string, any>;
    meta: {
        title: string;
        subtitle?: string;
        description?: string;
    };
    layout: LayoutNode[];
};

interface DynamicFormProps {
    formSchema: formSchema;
    validationResolver?: any;
}

export default function DynamicForm({ formSchema, validationResolver }: DynamicFormProps) {
    return (
        <FormProvider schema={formSchema}>
            <div className="dynamic-form">
                <h2 className={"dynamic-form-title"}>{formSchema.meta.title}</h2>
                {formSchema.meta.subtitle && <h4 className={"dynamic-form-subtitle"}>{formSchema.meta.subtitle}</h4>}
                <ReusableForm
                    id={formSchema.id}
                    layout={formSchema.layout}
                    validationResolver={validationResolver}
                />
            </div>
        </FormProvider>
    );
}
