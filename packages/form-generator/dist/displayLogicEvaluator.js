"use strict";
// displayLogicEvaluator.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.displayLogicEvaluator = void 0;
function displayLogicEvaluator(displayLogic, formValues) {
    console.log('formValues', formValues);
    if (!displayLogic) {
        return true;
    }
    const { questionId, operator, value } = displayLogic;
    const questionValue = formValues[questionId];
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
exports.displayLogicEvaluator = displayLogicEvaluator;
