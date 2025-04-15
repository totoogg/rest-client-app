import { regExp, replaceVariable, RestClientContext } from '@/shared';
import { useContext, useEffect } from 'react';

export const useValidVariable = (input: string, startChange: boolean) => {
  const { setUrl, variables, setError } = useContext(RestClientContext);

  useEffect(() => {
    function checkVariable() {
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

      if (startChange) {
        if (input.length === 0) {
          setError?.((el) => ({ ...el, inputValid: true }));
        } else {
          setError?.((el) => ({ ...el, inputValid: false }));
        }
      }
    }

    const id = setTimeout(() => {
      checkVariable();
    }, 300);

    return () => {
      clearTimeout(id);
    };
  }, [input, setError, setUrl, startChange, variables]);
};
