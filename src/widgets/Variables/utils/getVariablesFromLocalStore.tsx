import { Item, IVariablesFromLocalStore } from '../model/dataVariables';

const getCurrientUser = () => {
  const user = JSON.parse(localStorage.getItem('userRenderCrew') || '{}').user;
  return user;
};

export const getVariablesFromLocalStore = (): IVariablesFromLocalStore => {
  let data: IVariablesFromLocalStore = {};

  if (typeof window !== 'undefined') {
    const user = getCurrientUser();

    if (user) {
      const storedData = localStorage.getItem('dbRenderCrew');
      const variables = storedData ? JSON.parse(storedData) : {};

      data = { ...variables, ...user.variables };
    }
  }

  return data;
};

export const convertVariablesToArray = (
  variables: IVariablesFromLocalStore
) => {
  return Object.keys(variables).map((key, index) => ({
    key: `${index}`,
    variable: key,
    initialValue: variables[key],
  }));
};

export const convertVariablesToObject = (
  arrVariables: Item[]
): IVariablesFromLocalStore => {
  return arrVariables.reduce((acc, { variable, initialValue }) => {
    acc[variable] = initialValue;
    return acc;
  }, {} as IVariablesFromLocalStore);
};

export const addDataVariablesToLocalStore = (newValueVariables: Item[]) => {
  const user = getCurrientUser();
  const dataAllFordbRenderCrew = JSON.parse(
    localStorage.getItem('dbRenderCrew')!
  );
  const convertToObj = convertVariablesToObject(newValueVariables);
  //   const oldDataVariables = dataAllFordbRenderCrew[user].variables;
  dataAllFordbRenderCrew[user].variables = convertToObj;

  //   console.log('oldDataVariables', oldDataVariables);
  //   console.log('convertToObj', convertToObj);
  const newData = JSON.stringify(dataAllFordbRenderCrew);
  localStorage.setItem('dbRenderCrew', newData);
};
