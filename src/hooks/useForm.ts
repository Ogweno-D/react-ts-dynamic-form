import {useContext} from "react";
import {FormContext} from "../context/form.tsx";

export const useForm = () => {
    const context = useContext(FormContext);
    if (!context) throw new Error("useFormContext must be used within FormProvider");
    return context;
}