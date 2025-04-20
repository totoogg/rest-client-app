import { RestClientContext } from '@/shared';
import { useContext, useEffect } from 'react';

export const useStartHeaders = (searchParams: {
  [key: string]: string | string[] | undefined;
}) => {
  const { setHeaders } = useContext(RestClientContext);

  useEffect(() => {
    if (Object.keys(searchParams).length > 0) {
      const headersArr = Object.entries(searchParams)
        .map((el) => {
          if (Array.isArray(el[1])) {
            return el[1].map((val) => ({
              key: decodeURIComponent(el[0]),
              value: decodeURIComponent(val),
            }));
          }

          return {
            key: decodeURIComponent(el[0] as string),
            value: decodeURIComponent(el[1] as string),
          };
        })
        .flat();

      setHeaders?.({
        clear: structuredClone(headersArr),
        dirt: structuredClone(headersArr),
      });
    }
  }, [searchParams, setHeaders]);
};
