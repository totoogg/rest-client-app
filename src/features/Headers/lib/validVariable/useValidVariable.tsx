import { regExp, replaceVariable, RestClientContext } from '@/shared';
import { useContext, useEffect } from 'react';

export const useValidVariable = () => {
  const { setHeaders, setError, variables, headers } =
    useContext(RestClientContext);

  useEffect(() => {
    const headersStr =
      headers?.dirt.map((el) => Object.values(el)).join(', ') || '';

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
        setHeaders?.((el) => ({
          ...el,
          clear: (res.res as string)
            .split(', ')
            .map((el) => el.split(','))
            .map((el) => ({ key: el[0], value: el[1] })),
        }));
      }
    } else {
      setError?.((error) => ({
        ...error,
        headersValidVariable: '',
      }));
      setHeaders?.((el) => ({
        ...el,
        clear: headers?.dirt || [],
      }));
    }
  }, [headers?.dirt, setError, setHeaders, variables]);
};
