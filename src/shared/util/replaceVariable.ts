export function replaceVariable(
  str: string,
  vars: { [key: string]: string } = {},
  regExp: RegExp
) {
  const variables = Array.from(new Set(str.match(regExp)));
  const getVariables = variables.map((el) => el.slice(2, -2));
  const nonexistentVariables = getVariables.filter(
    (el) => !Object.keys(vars).includes(el)
  );

  if (str.includes('{{}}')) {
    nonexistentVariables.push('{{}}');
  }

  if (nonexistentVariables.length > 0) {
    return { status: 'error', res: nonexistentVariables.filter(Boolean) };
  }

  let res = str;

  for (const element of variables) {
    const el = element.slice(2, -2);
    res = res.replace(new RegExp(`\\{\\{${el}\\}\\}`, 'g'), String(vars[el]));
  }

  return { status: 'fulfilled', res };
}
