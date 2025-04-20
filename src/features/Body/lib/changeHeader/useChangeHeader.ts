import { RestClientContext } from '@/shared';
import { useContext, useEffect, useState } from 'react';

export const useChangeHeader = (selectBody: string) => {
  const { setHeaders } = useContext(RestClientContext);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count) {
      setHeaders?.((val) => {
        const headers = structuredClone(val);
        const index = headers.clear.findIndex(
          (el) =>
            el.key === 'Content-Type' &&
            (el.value === 'application/json' || el.value === 'text/plain')
        );

        if (index < 0 && selectBody !== 'none') {
          const header = {
            key: 'Content-Type',
            value: selectBody === 'json' ? 'application/json' : 'text/plain',
          };
          return {
            clear: [...structuredClone(headers.clear), header],
            dirt: [...structuredClone(headers.dirt), header],
          };
        }

        if (index >= 0 && selectBody !== 'none') {
          const header = {
            key: 'Content-Type',
            value: selectBody === 'json' ? 'application/json' : 'text/plain',
          };
          headers.clear[index] = structuredClone(header);
          headers.dirt[index] = structuredClone(header);
        }

        if (selectBody === 'none' && index >= 0) {
          headers.clear.splice(index, 1);
        }

        return headers;
      });
    } else {
      setCount(1);
    }
  }, [count, selectBody, setHeaders]);
};
