import { RestClientContext } from '@/shared';
import { useContext, useEffect } from 'react';
import { IHeaders } from '../../model/HeadersTypes';

export const useChangeHeaders = (input: IHeaders[]) => {
  const { setHeaders } = useContext(RestClientContext);

  useEffect(() => {
    function changeHeaders() {
      setHeaders?.((el) => ({
        clear: structuredClone(el.clear),
        dirt: input,
      }));
    }

    const id = setTimeout(() => {
      changeHeaders();
    }, 300);

    return () => {
      clearTimeout(id);
    };
  }, [input, setHeaders]);
};
