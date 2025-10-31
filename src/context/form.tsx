import { createContext, useState, useMemo, type ReactNode, useContext } from "react";
import type { formSchema } from "../components/DynamicForm";

type VisibilityCondition = {
    field?: string;
    op?: "equals" | "notEquals" | "in";
    value?: any;
};

type FormContextType = {
    schema: formSchema;
    formValues: Record<string, any>;
    errors: Record<string, any>;
    setFieldValue: (fieldId: string, value: any) => void;
    checkVisibility: (visibleWhen?: VisibilityCondition | VisibilityCondition[]) => boolean;
};

export const FormContext = createContext<FormContextType | null>(null);
export const useFormContext = () => {
    const ctx = useContext(FormContext);
    if (!ctx) throw new Error("useForm must be used within FormProvider");
    return ctx;
};

interface FormProviderProps {
    schema: formSchema;
    children: ReactNode;
}

export function FormProvider({ schema, children }: FormProviderProps) {
    const initialValues = useMemo(() => {
        const values: Record<string, any> = {};
        Object.values(schema.fields).forEach((f) => {
            if (f.renderer === "checkbox" || f.renderer === "switch") {
                values[f.id] = f.defaultValue ?? false;
            } else if (f.renderer === "multiselect") {
                values[f.id] = f.defaultValue ?? [];
            } else {
                values[f.id] = f.defaultValue ?? "";
            }
        });
        return values;
    }, [schema]);

    const [formValues, setFormValues] = useState<Record<string, any>>(initialValues);
    const [errors] = useState<Record<string, any>>({});

    const setFieldValue = (fieldId: string, value: any) =>
        setFormValues((prev) => ({ ...prev, [fieldId]: value }));

    const checkVisibility = (visibleWhen?: VisibilityCondition | VisibilityCondition[]): boolean => {
        if (!visibleWhen) return true;

        const conditions = Array.isArray(visibleWhen) ? visibleWhen : [visibleWhen];

        return conditions.every((cond) => {
            const currentValue = formValues[cond.field!];
            switch (cond.op) {
                case "equals":
                    return currentValue === cond.value;
                case "notEquals":
                    return currentValue !== cond.value;
                case "in":
                    return Array.isArray(cond.value) && cond.value.includes(currentValue);
                default:
                    return true;
            }
        });
    };

    const value = useMemo(
        () => ({ schema, formValues, errors, setFieldValue, checkVisibility }),
        [schema, formValues, errors]
    );

    return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
}
