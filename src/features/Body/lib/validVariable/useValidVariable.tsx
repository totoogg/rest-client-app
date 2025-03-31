import { regExp, replaceVariable, RestClientContext } from '@/shared';
import { useContext, useEffect } from 'react';

export const useValidVariable = (inputBody: string, selectBody: string) => {
  const { setBody, variables, setError } = useContext(RestClientContext);

  useEffect(() => {
    function checkVariable() {
      const checkJson = (value: string) => {
        try {
          JSON.parse(value);
          setError?.((el) => ({
            ...el,
            errorBody: false,
          }));
        } catch {
          setError?.((el) => ({
            ...el,
            errorBody: true,
          }));
        }
      };

      if (regExp.test(inputBody)) {
        const res = replaceVariable(inputBody, variables, regExp);

        if (res.status === 'error') {
          setError?.((el) => ({
            ...el,
            inputBodyValidVariable: (res.res as string[]).join(', '),
          }));
        }

        if (res.status === 'fulfilled') {
          setError?.((el) => ({
            ...el,
            inputBodyValidVariable: '',
          }));
          setBody?.(res.res as string);

          if (selectBody === 'json') {
            checkJson(res.res as string);
          }
        }
      } else {
        setError?.((el) => ({
          ...el,
          inputBodyValidVariable: '',
        }));
        setBody?.(inputBody);

        if (selectBody === 'json') {
          checkJson(inputBody);
        }
      }
    }

    const id = setTimeout(() => {
      checkVariable();
    }, 300);

    return () => {
      clearTimeout(id);
    };
  }, [inputBody, selectBody, setBody, setError, variables]);
};
