import './App.css'
import DynamicForm from "./components/DynamicForm.tsx";
import {
    addressFormSchema, agentUpdateSchema,
    contactFormSchema, insuranceQuoteSchema,
    jobApplicationSchema,
    productFormSchema,
    registrationFormSchema
} from "./schema/formSchemas.ts";
import BasicForm from "./components/BasicForm.tsx";

function App() {
    return (
        <>
            <BasicForm />
            <div style={{display:'flex', flexDirection: 'column'}} >
                <DynamicForm formSchema={contactFormSchema} />
                <DynamicForm formSchema={registrationFormSchema} />
                <DynamicForm formSchema={productFormSchema} />
                <DynamicForm formSchema={addressFormSchema} />
                <DynamicForm formSchema={jobApplicationSchema} />
                <DynamicForm formSchema={insuranceQuoteSchema} />
                <DynamicForm formSchema={agentUpdateSchema} />




            </div>

        </>
    )
}

export default App
