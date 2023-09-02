// useDisplayedInputs.js
const useDisplayedInputs = (inputs: any, values: any) => {
  return inputs.filter((input) => {
    const { displayCondition } = input;
    if (!displayCondition) return true;

    const { questionId, operator, value } = displayCondition;
    const questionValue = values[questionId];

    switch (operator) {
      case 'any':
        return questionValue;
      case 'eq':
        return questionValue === value;
      case 'gte':
        return questionValue >= value;
      case 'lte':
        return questionValue <= value;

      default:
        return false;
    }
  });
};

export default useDisplayedInputs;
