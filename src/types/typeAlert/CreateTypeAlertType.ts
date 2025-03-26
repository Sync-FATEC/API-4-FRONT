export type CreateTypeAlertType = {
    parameterId: string;
    name: string;
    comparisonOperator: '>' | '<' | '=';
    value: number;
}