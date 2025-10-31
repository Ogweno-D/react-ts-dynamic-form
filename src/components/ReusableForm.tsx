import { useEffect } from "react";
import { useForm as useRHF, FormProvider as RHFProvider } from "react-hook-form";
import { useFormContext } from "../context/form.tsx";
import FormLayout, { type LayoutNode } from "./FormLayout";
import { getValidationResolver } from "../schema/validationSchema.ts";

interface ReusableFormProps {
    id: string;
    layout: LayoutNode[];
    validationResolver?: any;
}

function ReusableForm({ id, layout, validationResolver }: ReusableFormProps) {
    const { formValues, setFieldValue } = useFormContext();

    // Initialize RHF
    const methods = useRHF({
        resolver: getValidationResolver(validationResolver),
        defaultValues: formValues,
        mode: "onChange",
    });

    const { handleSubmit, reset } = methods;

    const onSubmit = (data: any) => {
        // Sync RHF values with custom form context
        Object.entries(data).forEach(([key, value]) => setFieldValue(key, value));
        console.log("Form submitted:", data);
    };

    useEffect(() => {
        reset(formValues);
    }, [formValues, reset]);

    return (
        <RHFProvider {...methods}>
            <form id={id} onSubmit={handleSubmit(onSubmit)}>
                {layout.map((node, index) => (
                    <FormLayout key={index} layout={node} />
                ))}
                <button type="submit">Submit</button>
            </form>
        </RHFProvider>
    );
}

export default ReusableForm;
