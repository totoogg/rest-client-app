//   const obj = {
//     'margobraun777@gmail.com': {
//       variables: {
//         proxy: 'husdfoufdgn',
//         hgfmdk: 'sdgdfgf',
//         ssfsdhdjk: 'dsszd',
//       },
//       history: [],
//     },
//   };
import { Item } from '../model/dataVariables';

interface IVariablesFromLocalStore {
  [key: string]: string;
}

const getCurrientUser = () => {
  let user;
  if (typeof window !== 'undefined') {
    user = JSON.parse(localStorage.getItem('userRenderCrew')!).user;
  }
  return user;
};

export const getVariablesFromLocalStore = () => {
  let data: IVariablesFromLocalStore = {};
  if (typeof window !== 'undefined') {
    const user = getCurrientUser();
    if (user) {
      const variables = JSON.parse(localStorage.getItem('dbRenderCrew')!)[user]
        .variables as IVariablesFromLocalStore;
      data = variables;
      console.log('data', data);
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

// const mokedata = [
//   {
//     key: '0',
//     variable: 'url',
//     initialValue: 'https:/testing',
//   },
//   {
//     key: '1',
//     variable: 'First name',
//     initialValue: 'params',
//   },
// ];

export const addDataVariablesToLocalStore = (newValueVariables: Item[]) => {
  const user = getCurrientUser();
  const dataAllFordbRenderCrew = JSON.parse(
    localStorage.getItem('dbRenderCrew')!
  );
  const convertToObj = convertVariablesToObject(newValueVariables);
  const oldDataVariables = dataAllFordbRenderCrew[user].variables;
  dataAllFordbRenderCrew[user].variables = convertToObj;

  console.log('oldDataVariables', oldDataVariables);
  console.log('convertToObj', convertToObj);
  const newData = JSON.stringify(dataAllFordbRenderCrew);
  localStorage.setItem('dbRenderCrew', newData);
};
