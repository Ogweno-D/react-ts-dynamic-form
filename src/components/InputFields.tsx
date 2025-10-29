
type inputType = {
    type: "text" | "tel" | "email" | "password" | "url" | "date" | "search" | "color" | "number" | "range"
}
export type InputField ={
    // Add the visibility
    id: string;
    label: string;
    placeholder: string;
    renderer: string;
    inputType?: inputType;
    rules?: {
        required?: string;
        minlength?: {
            value: number;
            message?: string;
        };
        pattern?: {
            value: number;
            message?: string;
        }
    }
    // Abstract this better
    props?:  {
        data?:[];
        options?: [];
        minRows?: number;
        maxRows?: number;
        min?: number
        max?: number;
        step?: number;
        precision?: number;
        minDate?: Date;
        suffix?: string;
        searchable?: boolean;
        maxValues?: number;
        maxSize?: number;// File
        accept?: string;// File
    }
    defaultValue?: boolean
}

interface  InputFieldProps {
    field: InputField;
}

function InputFields(props : InputFieldProps) {
    return (
        <div>

            {/* TextFields*/}
            {
                props.field.inputType!= null  ? (
                <input
                    type={`${props.field.inputType}`}
                    id={`${props.field.id}`}
                    placeholder={`${props.field.placeholder ? props.field.placeholder : ""}`}
                />
                ) : (props.field.renderer == "text") && (
                    <input
                        type={`${props.field.renderer}`}
                        id={`${props.field.id}`}
                        placeholder={`${props.field.placeholder ? props.field.placeholder : ""}`}
                    />
                )
            }
            {
                props.field.renderer == "select" && (
                    <select
                        id={`${props.field.id}`}
                        name={`${props.field.id}`}
                        defaultValue={`${props.field.placeholder ? props.field.placeholder : ""}`}

                    >
                        <option value={""}> {props.field.placeholder || " Select a value"}</option>
                        {props.field.props?.data?.map((item: any, index: any) => (
                            <option value={item.value || item} key={index}>
                                {item.label || item}
                            </option>
                        ))}
                    </select>
                )
            }
            {
                props.field.renderer == "multiselect" && (
                    <select
                        id={`${props.field.id}`}
                        name={`${props.field.id}`}
                        defaultValue={`${props.field.placeholder ? props.field.placeholder : ""}`}
                        aria-multiselectable={true}
                        aria-valuemax={props.field.props?.maxValues || 0}
                    >
                        <option value={""}> {props.field.placeholder || " Select a value"}</option>
                        {props.field.props?.data?.map((item: any, index: any) => (
                            <option value={item.value || item} key={index}>
                                {item.label || item}
                            </option>
                        ))}
                    </select>
                )
            }
            {
                (props.field.renderer == "checkbox" ) && (
                    <input
                        type={`${props.field.renderer}`}
                        id={`${props.field.id}`}
                        placeholder={`${props.field.placeholder ? props.field.placeholder : ""}`}
                    />
                )
            }
            {
                (props.field.renderer == "radio") && (
                   props.field.props?.options?.map((item: any, index: any) => (
                       <div key={index} id={`${props.field.id}`}>
                           <input
                               type={`${props.field.renderer}`}
                               id={`${props.field.id}`}
                               value={`${item.id}`}
                           />
                           <label htmlFor={`${props.field.id}`}>{item.label || item}</label>
                       </div>

                   ))

                )
            }
            {
                props.field.renderer == "textarea" && (
                    <textarea
                        id={`${props.field.id}`}
                        name={`${props.field.id}`}
                        placeholder={`${props.field.placeholder ? props.field.placeholder : ""}`}
                        rows={props.field.props?.minRows }
                        // maxLength={props.field.props?.maxRows}
                    />
                )
            }

            {
                props.field.renderer == "number" && (
                    <input
                        type={`${props.field.renderer}`}
                        id={`${props.field.id}`}
                        placeholder={`${props.field.placeholder ? props.field.placeholder : ""}`}
                        min={props.field.props?.min || 0}
                        max={props.field.props?.max || 0}
                        step={props.field.props?.step || 0}
                    />
                )
            }
            {
                props.field.renderer == "file" && (
                    <input
                        type={`${props.field.renderer}`}
                        id={`${props.field.id}`}
                        placeholder={`${props.field.placeholder ? props.field.placeholder : ""}`}
                        max={props.field.props?.maxSize}
                        accept={`${props.field.props?.accept}`}
                    />
                )
            }

        </div>
    );
}

export default InputFields;