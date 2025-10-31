import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useFormContext } from "../context/form.tsx";
import FormLayout, { type LayoutNode } from "./FormLayout";

interface ReusableFormProps {
    id: string;
    layout: LayoutNode[];
}

function ReusableForm({ id, layout }: ReusableFormProps) {
    const { formValues, setFieldValue } = useFormContext();

    const {
        handleSubmit,
        reset,
        formState: {  },
    } = useForm({
        defaultValues: formValues,
        mode: "onChange",
    });

    const onSubmit = (data: any) => {
        Object.entries(data).forEach(([key, value]) => {
            setFieldValue(key, value);
        });
        console.log("Form submitted:", data);
    };

    useEffect(() => {
        reset(formValues);
    }, [formValues, reset]);

    return (
        <form id={id} onSubmit={handleSubmit(onSubmit)}>
            {layout.map((node, index) => (
                <FormLayout key={index} layout={node} />
            ))}

            <button type="submit">Submit</button>
        </form>
    );
}

export default ReusableForm;
