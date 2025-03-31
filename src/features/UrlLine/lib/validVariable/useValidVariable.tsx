import { regExp, replaceVariable, RestClientContext } from '@/shared';
import { useContext, useEffect } from 'react';

export const useValidVariable = (input: string) => {
  const { setUrl, variables, setError } = useContext(RestClientContext);

  useEffect(() => {
    if (regExp.test(input)) {
      const res = replaceVariable(input, variables, regExp);

      if (res.status === 'error') {
        setError?.((el) => ({
          ...el,
          inputValidVariable: (res.res as string[]).join(', '),
        }));
      }

      if (res.status === 'fulfilled') {
        const url = String(res.res);

        setError?.((el) => ({
          ...el,
          inputValidVariable: '',
        }));
        setUrl?.(url);
      }
    } else {
      const url = input;

      setError?.((el) => ({
        ...el,
        inputValidVariable: '',
      }));
      setUrl?.(url);
    }
  }, [input, setError, setUrl, variables]);
};
