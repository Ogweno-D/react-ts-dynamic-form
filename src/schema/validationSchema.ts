//Think of using zod but for now RHF must suffice

import type {FieldValues, RegisterOptions} from "react-hook-form";

/**
 * Converts schema-based rules into React Hook Form register options.
 */
export function mapFieldRulesToRHF(rules: Record<string, any> = {}): RegisterOptions<FieldValues, string> {
    const result: RegisterOptions = {};

    if (rules.required)
        result.required = typeof rules.required === "string" ? rules.required : "This field is required";

    if (rules.pattern)
        result.pattern = rules.pattern;

    if (rules.min)
        result.min = rules.min;

    if (rules.max)
        result.max = rules.max;

    if (rules.minLength)
        result.minLength = rules.minLength;

    if (rules.maxLength)
        result.maxLength = rules.maxLength;

    if (rules.validate)
        result.validate = rules.validate;

    return result;
}

/**
 * Optionally attach an external resolver (like Zod, Yup, Vest).
 */
export function getValidationResolver(schemaValidator?: any) {
    if (!schemaValidator) return undefined;
    return schemaValidator; // example: zodResolver(zodSchema)
}
