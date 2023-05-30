// displayLogicEvaluator.ts
export function displayLogicEvaluator(displayLogic, formValues) {
    console.log('formValues', formValues);
    if (!displayLogic) {
        return true;
    }
    var questionId = displayLogic.questionId, operator = displayLogic.operator, value = displayLogic.value;
    var questionValue = formValues[questionId];
    switch (operator) {
        case 'lte':
            return questionValue <= value;
        case 'gte':
            return questionValue >= value;
        case 'eq':
            return questionValue === value;
        case 'any':
            return questionValue !== undefined && questionValue !== '';
        default:
            return true;
    }
}
//# sourceMappingURL=displayLogicEvaluator.js.map