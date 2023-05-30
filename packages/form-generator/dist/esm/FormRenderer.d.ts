import React from "react";
import { FormInput } from "types-and-schemas";
type FormValues = Record<string, any>;
interface FormRendererProps {
    inputs: FormInput[];
    onSave: (data: any) => void;
    conditionallyRenderSaveButton?: (data: any) => boolean;
    initalValues?: FormValues;
}
export declare const FormifyJSON: React.FC<FormRendererProps>;
export {};
