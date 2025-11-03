export type VisibilityProps = {
    field?: string;
    op?: "equals" | "notEquals" | "in";
    value?: any;
} | VisibilityProps[];
