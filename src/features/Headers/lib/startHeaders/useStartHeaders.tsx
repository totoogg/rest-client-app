import { RestClientContext } from '@/shared';
import { useContext, useEffect, useState } from 'react';

export const useStartHeaders = (searchParams: {
  [key: string]: string | string[] | undefined;
}) => {
  const { setHeaders } = useContext(RestClientContext);
  const [startHeaders, setStartHeadersInput] = useState<
    { key: string; value: string }[]
  >([]);

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

      setHeaders?.(headersArr as { key: string; value: string }[]);
      setStartHeadersInput(headersArr as { key: string; value: string }[]);
    }
  }, [searchParams, setHeaders]);

  return { startHeaders };
};
