import { useState } from "react";
import FormInput from "./FormInput.tsx";
import {useForm} from "../hooks/useForm.ts";

export type LayoutKind = "grid" | "stack" | "section" | "field" | string;

export interface LayoutNode {
    kind: LayoutKind;
    title?: string;
    fieldId?: string;
    colSpan?: number;
    cols?: number;
    spacing?: "sm" | "md" | "lg" | "xl";
    withDivider?: boolean;
    collapsible?: boolean;
    children?: LayoutNode[];
}

interface FormLayoutProps {
    layout: LayoutNode;
}

const spacingClass = (spacing?: string): string => {
    switch (spacing) {
        case "sm":
            return "form-layout--gap-sm";
        case "md":
            return "form-layout--gap-md";
        case "lg":
            return "form-layout--gap-lg";
        case "xl":
            return "form-layout--gap-xl";
        default:
            return "form-layout--gap-md";
    }
};

export default function FormLayout({ layout }: FormLayoutProps) {
    const [collapsed, setCollapsed] = useState(false);
    const { schema, checkVisibility } = useForm();

    const isVisible = (node: LayoutNode): boolean => {
        if (node.kind === "field" && node.fieldId) {
            const field = schema.fields[node.fieldId];
            return checkVisibility(field?.visibleWhen);
        }
        return true;
    };

    const renderChild = (child: LayoutNode, i: number) =>
        isVisible(child) ? <FormLayout key={i} layout={child} /> : null;

    const visibleChildren = layout.children?.filter(isVisible) ?? [];

    return (
        (layout.kind === "field" && isVisible(layout) && (
            <FormInput fieldId={layout.fieldId!} />
        )) ||

        (layout.kind === "stack" && (
            <div className={`form-layout-stack ${spacingClass(layout.spacing)}`}>
                {visibleChildren.map(renderChild)}
            </div>
        )) ||

        (layout.kind === "grid" && (
            <div
                className={`form-layout-grid ${spacingClass(layout.spacing)}`}
                style={{
                    gridTemplateColumns: `repeat(${layout.cols || 2}, 1fr)`,
                }}
            >
                {visibleChildren.map((child, i) => (
                    <div key={i} style={{ gridColumn: `span ${child.colSpan || 1}` }}>
                        {renderChild(child, i)}
                    </div>
                ))}
            </div>
        )) ||

        (layout.kind === "section" && (
            <div className="form-layout-ection">
                {layout.title && (
                    <div
                        className="form-layout-section-header"
                        onClick={() => layout.collapsible && setCollapsed(!collapsed)}
                    >
                        <h3 className="form-layout-section-title">{layout.title}</h3>
                        {layout.collapsible && (
                            <button type="button" className="form-layout-section-toggle">
                                {collapsed ? "Expand" : "Collapse"}
                            </button>
                        )}
                    </div>
                )}

                {layout.withDivider && <hr className="form-layout-divider" />}

                {!collapsed && (
                    <div
                        className={`form-layout-section-body ${spacingClass(layout.spacing)}`}
                    >
                        {visibleChildren.map(renderChild)}
                    </div>
                )}
            </div>
        ))
    );
}
