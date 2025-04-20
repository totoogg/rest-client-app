'use client';
import {
  IVariablesFromLocalStore,
  VariableProps,
} from '../model/dataVariables';

const getCurrientUser = () => {
  const user = JSON.parse(localStorage.getItem('userRenderCrew') || '{}').user;
  return user;
};

export const getVariablesFromLocalStore = (): IVariablesFromLocalStore => {
  let data: IVariablesFromLocalStore = {};

  if (typeof window !== 'undefined') {
    const user = getCurrientUser();

    if (user) {
      const variables = JSON.parse(localStorage.getItem('dbRenderCrew')!)[user]
        .variables as IVariablesFromLocalStore;
      data = variables;
    }
  }

  return data;
};

export const convertVariablesToArray = (
  variables: IVariablesFromLocalStore
): VariableProps[] => {
  return Object.keys(variables).map((key, index) => ({
    key: index,
    variable: key,
    currentValue: variables[key],
  }));
};

export const convertVariablesToObject = (
  arrVariables: VariableProps[]
): IVariablesFromLocalStore => {
  return arrVariables.reduce((acc, { variable, currentValue }) => {
    acc[variable] = currentValue;
    return acc;
  }, {} as IVariablesFromLocalStore);
};

export const addDataVariablesToLocalStore = (
  newValueVariables: VariableProps[]
) => {
  const user = getCurrientUser();
  const dataAllFordbRenderCrew = JSON.parse(
    localStorage.getItem('dbRenderCrew')!
  );
  const convertToObj = convertVariablesToObject(newValueVariables);
  dataAllFordbRenderCrew[user].variables = convertToObj;
  const newData = JSON.stringify(dataAllFordbRenderCrew);
  localStorage.setItem('dbRenderCrew', newData);
};
