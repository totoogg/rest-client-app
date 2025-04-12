export interface IVariablesFromLocalStore {
  [key: string]: string;
}

export interface VariableProps {
  key: number;
  variable: string;
  currentValue: string;
}
