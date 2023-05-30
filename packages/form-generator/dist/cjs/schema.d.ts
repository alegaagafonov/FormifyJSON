import { z } from 'zod';
export declare const FormInputEnum: z.Values<["mobileNumber", "phoneNumber", "email", "text", "longText", "fileUpload", "dateTime", "number", "range", "password", "radio", "checkbox", "select", "multiSelect", "url", "search", "color", "starRating", "multimediaSuggestion", "shareInfo", "nps"]>;
export declare const numberOrComplex: z.ZodUnion<[z.ZodNumber, z.ZodObject<{
    value: z.ZodNumber;
    message: z.ZodString;
}, "strip", z.ZodTypeAny, {
    value: number;
    message: string;
}, {
    value: number;
    message: string;
}>]>;
export declare const DisplayConditionSchema: z.ZodOptional<z.ZodObject<{
    questionId: z.ZodString;
    operator: z.ZodString;
    value: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    operator: string;
    questionId: string;
    value?: number | undefined;
}, {
    operator: string;
    questionId: string;
    value?: number | undefined;
}>>;
export declare const FormInputSchema: z.ZodObject<{
    name: z.ZodString;
    label: z.ZodOptional<z.ZodString>;
    placeholder: z.ZodOptional<z.ZodString>;
    isDisabled: z.ZodOptional<z.ZodBoolean>;
    defaultValue: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
    type: z.ZodEnum<["mobileNumber", "phoneNumber", "email", "text", "longText", "fileUpload", "dateTime", "number", "range", "password", "radio", "checkbox", "select", "multiSelect", "url", "search", "color", "starRating", "multimediaSuggestion", "shareInfo", "nps"]>;
    options: z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodString, z.ZodNumber]>, "many">>;
    displayCondition: z.ZodOptional<z.ZodObject<{
        questionId: z.ZodString;
        operator: z.ZodString;
        value: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        operator: string;
        questionId: string;
        value?: number | undefined;
    }, {
        operator: string;
        questionId: string;
        value?: number | undefined;
    }>>;
    validationRules: z.ZodOptional<z.ZodObject<{
        required: z.ZodOptional<z.ZodUnion<[z.ZodBoolean, z.ZodString]>>;
        minLength: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodObject<{
            value: z.ZodNumber;
            message: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            value: number;
            message: string;
        }, {
            value: number;
            message: string;
        }>]>>;
        maxLength: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodObject<{
            value: z.ZodNumber;
            message: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            value: number;
            message: string;
        }, {
            value: number;
            message: string;
        }>]>>;
        pattern: z.ZodOptional<z.ZodUnion<[z.ZodType<RegExp, z.ZodTypeDef, RegExp>, z.ZodObject<{
            value: z.ZodType<RegExp, z.ZodTypeDef, RegExp>;
            message: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            value: RegExp;
            message: string;
        }, {
            value: RegExp;
            message: string;
        }>]>>;
        min: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodObject<{
            value: z.ZodNumber;
            message: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            value: number;
            message: string;
        }, {
            value: number;
            message: string;
        }>]>>;
        max: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodObject<{
            value: z.ZodNumber;
            message: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            value: number;
            message: string;
        }, {
            value: number;
            message: string;
        }>]>>;
        isEmail: z.ZodOptional<z.ZodUnion<[z.ZodBoolean, z.ZodString]>>;
        isUrl: z.ZodOptional<z.ZodUnion<[z.ZodBoolean, z.ZodString]>>;
        validate: z.ZodOptional<z.ZodUnion<[z.ZodFunction<z.ZodTuple<[z.ZodString], null>, z.ZodUnion<[z.ZodBoolean, z.ZodString]>>, z.ZodRecord<z.ZodString, z.ZodFunction<z.ZodTuple<[z.ZodString], null>, z.ZodUnion<[z.ZodBoolean, z.ZodString]>>>]>>;
    }, "strip", z.ZodTypeAny, {
        required?: string | boolean | undefined;
        minLength?: number | {
            value: number;
            message: string;
        } | undefined;
        maxLength?: number | {
            value: number;
            message: string;
        } | undefined;
        pattern?: RegExp | {
            value: RegExp;
            message: string;
        } | undefined;
        min?: number | {
            value: number;
            message: string;
        } | undefined;
        max?: number | {
            value: number;
            message: string;
        } | undefined;
        isEmail?: string | boolean | undefined;
        isUrl?: string | boolean | undefined;
        validate?: ((args_0: string) => string | boolean) | Record<string, (args_0: string) => string | boolean> | undefined;
    }, {
        required?: string | boolean | undefined;
        minLength?: number | {
            value: number;
            message: string;
        } | undefined;
        maxLength?: number | {
            value: number;
            message: string;
        } | undefined;
        pattern?: RegExp | {
            value: RegExp;
            message: string;
        } | undefined;
        min?: number | {
            value: number;
            message: string;
        } | undefined;
        max?: number | {
            value: number;
            message: string;
        } | undefined;
        isEmail?: string | boolean | undefined;
        isUrl?: string | boolean | undefined;
        validate?: ((args_0: string) => string | boolean) | Record<string, (args_0: string) => string | boolean> | undefined;
    }>>;
    shareData: z.ZodOptional<z.ZodObject<{
        title: z.ZodOptional<z.ZodString>;
        url: z.ZodOptional<z.ZodString>;
        text: z.ZodOptional<z.ZodString>;
        image: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        title?: string | undefined;
        url?: string | undefined;
        text?: string | undefined;
        image?: string | undefined;
    }, {
        title?: string | undefined;
        url?: string | undefined;
        text?: string | undefined;
        image?: string | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    name: string;
    type: "number" | "search" | "select" | "text" | "color" | "dateTime" | "checkbox" | "radio" | "url" | "email" | "password" | "range" | "mobileNumber" | "phoneNumber" | "longText" | "fileUpload" | "multiSelect" | "starRating" | "multimediaSuggestion" | "shareInfo" | "nps";
    label?: string | undefined;
    placeholder?: string | undefined;
    isDisabled?: boolean | undefined;
    defaultValue?: string | number | undefined;
    options?: (string | number)[] | undefined;
    displayCondition?: {
        operator: string;
        questionId: string;
        value?: number | undefined;
    } | undefined;
    validationRules?: {
        required?: string | boolean | undefined;
        minLength?: number | {
            value: number;
            message: string;
        } | undefined;
        maxLength?: number | {
            value: number;
            message: string;
        } | undefined;
        pattern?: RegExp | {
            value: RegExp;
            message: string;
        } | undefined;
        min?: number | {
            value: number;
            message: string;
        } | undefined;
        max?: number | {
            value: number;
            message: string;
        } | undefined;
        isEmail?: string | boolean | undefined;
        isUrl?: string | boolean | undefined;
        validate?: ((args_0: string) => string | boolean) | Record<string, (args_0: string) => string | boolean> | undefined;
    } | undefined;
    shareData?: {
        title?: string | undefined;
        url?: string | undefined;
        text?: string | undefined;
        image?: string | undefined;
    } | undefined;
}, {
    name: string;
    type: "number" | "search" | "select" | "text" | "color" | "dateTime" | "checkbox" | "radio" | "url" | "email" | "password" | "range" | "mobileNumber" | "phoneNumber" | "longText" | "fileUpload" | "multiSelect" | "starRating" | "multimediaSuggestion" | "shareInfo" | "nps";
    label?: string | undefined;
    placeholder?: string | undefined;
    isDisabled?: boolean | undefined;
    defaultValue?: string | number | undefined;
    options?: (string | number)[] | undefined;
    displayCondition?: {
        operator: string;
        questionId: string;
        value?: number | undefined;
    } | undefined;
    validationRules?: {
        required?: string | boolean | undefined;
        minLength?: number | {
            value: number;
            message: string;
        } | undefined;
        maxLength?: number | {
            value: number;
            message: string;
        } | undefined;
        pattern?: RegExp | {
            value: RegExp;
            message: string;
        } | undefined;
        min?: number | {
            value: number;
            message: string;
        } | undefined;
        max?: number | {
            value: number;
            message: string;
        } | undefined;
        isEmail?: string | boolean | undefined;
        isUrl?: string | boolean | undefined;
        validate?: ((args_0: string) => string | boolean) | Record<string, (args_0: string) => string | boolean> | undefined;
    } | undefined;
    shareData?: {
        title?: string | undefined;
        url?: string | undefined;
        text?: string | undefined;
        image?: string | undefined;
    } | undefined;
}>;
export type DisplayCondition = z.infer<typeof DisplayConditionSchema>;
export type FormInput = z.infer<typeof FormInputSchema>;
