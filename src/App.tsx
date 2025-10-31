import './App.css';
// import './styles/form.css';
import { useState } from "react";
import DynamicForm from "./components/DynamicForm.tsx";
import {
    addressFormSchema,
    agentUpdateSchema,
    contactFormSchema,
    insuranceQuoteSchema,
    jobApplicationSchema,
    productFormSchema,
    registrationFormSchema
} from "./schema/formSchemas.ts";

function App() {
    const forms = [
        contactFormSchema,
        registrationFormSchema,
        productFormSchema,
        addressFormSchema,
        jobApplicationSchema,
        insuranceQuoteSchema,
        agentUpdateSchema
    ];

    const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

    return (
        <div className="app-container">
            {forms.map((form, i) => (
                <div className="form-card" key={i}>
                    <div
                        className="form-card-header"
                        onClick={() => setExpandedIndex(expandedIndex === i ? null : i)}
                    >
                        <h2 style={{ margin: 0 }}>{form.meta.title}</h2>
                        <button>
                            {expandedIndex === i ? "Collapse" : "Expand"}
                        </button>
                    </div>

                    {expandedIndex === i && (
                        <div className="form-card-body">
                            <DynamicForm formSchema={form} />
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default App;
