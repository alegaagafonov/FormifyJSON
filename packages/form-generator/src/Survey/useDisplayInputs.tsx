// useDisplayedInputs.js
import { FormInput } from "@formify-json/types-and-schemas";
const useDisplayedInputs = (inputs: any, values: any) => {
  return inputs.filter((input: FormInput) => {
    const { displayCondition } = input;
    if (!displayCondition) return true;

    const { questionId, operator, value } = displayCondition;
    const questionValue = values[questionId];

    switch (operator) {
      case "any":
        return questionValue;
      case "eq":
        return questionValue === value;
      case "gte":
        // @ts-ignore
        return questionValue >= value;
      case "lte":
        // @ts-ignore
        return questionValue <= value;

      default:
        return false;
    }
  });
};

export default useDisplayedInputs;
