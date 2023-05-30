import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Button } from "@mui/material";
import {
  FormInput,
  FormInputEnum,
  DisplayCondition,
} from "@formify-json/types-and-schemas";
import {
  StarRatingInput,
  MultimediaSuggestionInput,
  NpsInput,
} from "./FormInputs";
// useFormContext
// Form input type to component mapping
const inputTypeComponentMap = {
  [FormInputEnum.starRating]: StarRatingInput,
  [FormInputEnum.multimediaSuggestion]: MultimediaSuggestionInput,
  [FormInputEnum.nps]: NpsInput,
  // Add the rest of your input types here
};

type FormValues = Record<string, any>;

interface FormRendererProps {
  inputs: FormInput[];
  onSave: (data: any) => void;
  conditionallyRenderSaveButton?: (data: any) => boolean;
  initalValues?: FormValues;
}

export const FormifyJSON: React.FC<FormRendererProps> = ({
  inputs,
  onSave,
  conditionallyRenderSaveButton,
  initalValues = {},
}) => {
  const [saving, setSaving] = useState(false);

  const methods = useForm({ defaultValues: initalValues });
  const { watch, getValues } = methods;
  const watchedValues = watch();
  const onSubmit = async (data: any) => {
    setSaving(true);
    await onSave(data);
    setSaving(false);
  };

  const renderSaveButton = () => {
    if (
      !conditionallyRenderSaveButton ||
      conditionallyRenderSaveButton(getValues())
    ) {
      return (
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={saving}
        >
          {saving ? "Saving..." : "Save"}
        </Button>
      );
    }
    return null;
  };

  const displayInput = (input: FormInput) => {
    if (!input.displayCondition) return true;
    const condition: DisplayCondition = input.displayCondition;
    const dependentFieldValue = watchedValues[condition.questionId];

    switch (condition.operator) {
      case "eq":
        return condition.value !== undefined
          ? dependentFieldValue === condition.value
          : false;
      case "any":
        return !!dependentFieldValue;
      case "gte":
        return condition.value !== undefined
          ? dependentFieldValue >= condition.value
          : false;
      case "lte":
        return condition.value !== undefined
          ? dependentFieldValue <= condition.value
          : false;
      case "notEqual":
        return condition.value !== undefined
          ? dependentFieldValue !== condition.value
          : false;
      default:
        return true;
    }
  };
  // if (Array.isArray(input.displayCondition)) {
  //   // Check all conditions if displayCondition is an array
  //   return input.displayCondition.every((condition) => evaluateDisplayCondition(condition, watchedValues))
  // }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {inputs.map((input) => {
          // @ts-ignore
          const InputComponent = inputTypeComponentMap[input.type];
          if (displayInput(input)) {
            return InputComponent ? (
              <InputComponent key={input.name} {...input} />
            ) : null;
          } else {
            return null;
          }
        })}
        {renderSaveButton()}
      </form>
    </FormProvider>
  );
};
