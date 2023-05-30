export type DisplayLogicOperator = 'lte' | 'gte' | 'eq' | 'any';
export interface DisplayLogic {
    questionId: string;
    operator: DisplayLogicOperator;
    value?: any;
}
export declare function displayLogicEvaluator(displayLogic: DisplayLogic | null, formValues: Record<string, any>): boolean;
