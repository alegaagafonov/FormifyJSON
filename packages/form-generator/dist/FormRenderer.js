"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormifyJSON = void 0;
const react_1 = __importStar(require("react"));
const react_hook_form_1 = require("react-hook-form");
const material_1 = require("@mui/material");
const schema_1 = require("./schema");
const FormInputs_1 = require("./FormInputs");
// useFormContext
// Form input type to component mapping
const inputTypeComponentMap = {
    [schema_1.FormInputEnum.starRating]: FormInputs_1.StarRatingInput,
    [schema_1.FormInputEnum.multimediaSuggestion]: FormInputs_1.MultimediaSuggestionInput,
    [schema_1.FormInputEnum.nps]: FormInputs_1.NpsInput,
    // Add the rest of your input types here
};
const FormifyJSON = ({ inputs, onSave, conditionallyRenderSaveButton, initalValues = {}, }) => {
    const [saving, setSaving] = (0, react_1.useState)(false);
    const methods = (0, react_hook_form_1.useForm)({ defaultValues: initalValues });
    const { watch, getValues } = methods;
    const watchedValues = watch();
    const onSubmit = async (data) => {
        setSaving(true);
        await onSave(data);
        setSaving(false);
    };
    const renderSaveButton = () => {
        if (!conditionallyRenderSaveButton || conditionallyRenderSaveButton(getValues())) {
            return (<material_1.Button type='submit' variant='contained' color='primary' disabled={saving}>
          {saving ? 'Saving...' : 'Save'}
        </material_1.Button>);
        }
        return null;
    };
    const displayInput = (input) => {
        if (!input.displayCondition)
            return true;
        const condition = input.displayCondition;
        const dependentFieldValue = watchedValues[condition.questionId];
        switch (condition.operator) {
            case 'eq':
                return condition.value !== undefined ? dependentFieldValue === condition.value : false;
            case 'any':
                return !!dependentFieldValue;
            case 'gte':
                return condition.value !== undefined ? dependentFieldValue >= condition.value : false;
            case 'lte':
                return condition.value !== undefined ? dependentFieldValue <= condition.value : false;
            case 'notEqual':
                return condition.value !== undefined ? dependentFieldValue !== condition.value : false;
            default:
                return true;
        }
    };
    // if (Array.isArray(input.displayCondition)) {
    //   // Check all conditions if displayCondition is an array
    //   return input.displayCondition.every((condition) => evaluateDisplayCondition(condition, watchedValues))
    // }
    return (<react_hook_form_1.FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {inputs.map((input) => {
            // @ts-ignore
            const InputComponent = inputTypeComponentMap[input.type];
            if (displayInput(input)) {
                return InputComponent ? <InputComponent key={input.name} {...input}/> : null;
            }
            else {
                return null;
            }
        })}
        {renderSaveButton()}
      </form>
    </react_hook_form_1.FormProvider>);
};
exports.FormifyJSON = FormifyJSON;
