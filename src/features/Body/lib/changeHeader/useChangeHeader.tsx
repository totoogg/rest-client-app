import { RestClientContext } from '@/shared';
import { useContext, useEffect } from 'react';

export const useChangeHeader = (selectBody: string) => {
  const { setHeaders } = useContext(RestClientContext);

  useEffect(() => {
    setHeaders?.((val) => {
      const headers = structuredClone(val);
      const index = headers.clear.findIndex(
        (el) =>
          el.key === 'Content-Type' &&
          (el.value === 'application/json' || 'text/plain')
      );

      if (index < 0 && selectBody !== 'none') {
        const header = {
          key: 'Content-Type',
          value: selectBody === 'json' ? 'application/json' : 'text/plain',
        };
        return {
          clear: [...headers.clear, header],
          dirt: [...headers.dirt, header],
        };
      }

      if (index >= 0 && selectBody !== 'none') {
        const header = {
          key: 'Content-Type',
          value: selectBody === 'json' ? 'application/json' : 'text/plain',
        };
        headers.clear[index] = header;
        headers.dirt[index] = header;
      }

      if (selectBody === 'none' && index >= 0) {
        headers.clear.splice(index, 1);
        headers.dirt.splice(index, 1);
      }

      return headers;
    });
  }, [selectBody, setHeaders]);
};
