import React from "react";
import { FormInput } from "types-and-schemas";
import { RegisterOptions } from "react-hook-form";
interface ControlledInputProps extends FormInput {
    children: (field: any, error: any) => JSX.Element;
}
export declare const ControlledInput: React.FC<ControlledInputProps>;
type InputLabelProps = Partial<FormInput>;
export declare const InputLabel: React.FC<InputLabelProps>;
export interface InputComponentProps {
    id: string;
    title?: string;
    placeholder?: string;
    register: (name: string, options: RegisterOptions) => void;
    validation: any;
}
export declare const StarRatingInput: React.FC<FormInput>;
interface MultimediaSuggestionInputProps extends FormInput {
    onAddPhoto?: () => void;
    onAddAudio?: () => void;
}
export declare const MultimediaSuggestionInput: React.FC<MultimediaSuggestionInputProps>;
export declare const TextInput: React.FC<FormInput>;
export declare const EmailInput: React.FC<FormInput>;
export declare const NpsInput: React.FC<FormInput>;
export {};
