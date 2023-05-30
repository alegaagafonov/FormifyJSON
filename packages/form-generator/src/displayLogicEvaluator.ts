// displayLogicEvaluator.ts

export type DisplayLogicOperator = 'lte' | 'gte' | 'eq' | 'any';

export interface DisplayLogic {
  questionId: string;
  operator: DisplayLogicOperator;
  value?: any;
}

export function displayLogicEvaluator(
  displayLogic: DisplayLogic | null,
  formValues: Record<string, any>
): boolean {
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
