import { regExp, replaceVariable, RestClientContext } from '@/shared';
import { useContext, useEffect } from 'react';

export const useValidVariable = (
  headersInput: {
    key: string;
    value: string;
  }[]
) => {
  const { setHeaders, setError, variables } = useContext(RestClientContext);

  useEffect(() => {
    const headersStr = headersInput.map((el) => Object.values(el)).join(', ');

    if (regExp.test(headersStr)) {
      const res = replaceVariable(headersStr, variables, regExp);
      if (res.status === 'error') {
        setError?.((error) => ({
          ...error,
          headersValidVariable: (res.res as string[]).join(', '),
        }));
      }

      if (res.status === 'fulfilled') {
        setError?.((error) => ({
          ...error,
          headersValidVariable: '',
        }));
        setHeaders?.(
          (res.res as string)
            .split(', ')
            .map((el) => el.split(','))
            .map((el) => ({ key: el[0], value: el[1] }))
        );
      }
    } else {
      setError?.((error) => ({
        ...error,
        headersValidVariable: '',
      }));
      setHeaders?.(headersInput);
    }
  }, [headersInput, setError, setHeaders, variables]);
};
