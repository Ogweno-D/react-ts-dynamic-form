import FormInput from "./FormInput.tsx";

type LayoutType = "section" | "stack"
type LayoutKind =  ""

export type LayoutNodeChildren = {
    kind: "field" | "grid";
    fieldId: string;
    children?: LayoutNode;
}

export type LayoutNode = {
    kind: "grid" | "stack";
    cols: number;
    spacing: "md" | "lg" | "xl";
    children: LayoutNodeChildren[];
}

export type formLayoutType ={
    kind:LayoutType,
    title:string
    withDivider?:boolean
    collapsible?:boolean
    children: LayoutNode[] ;
}

type FormLayoutProps = {
  layout : formLayoutType[]
}
function FormLayout(props : FormLayoutProps) {

    return (
        // Outer layout
        // There needs to be an inner layout
        <div className={`layout- ${props.layout.[0].kind}`}>
            {
                // props.layout.children.map((child : any, index : any) =>
                //         (
                //     <div key={index}>
                //         <p>{child.kind}</p>
                //     </div>
                //     ))

            }

        </div>
    );

}

export default FormLayout;