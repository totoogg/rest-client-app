import { Dispatch, SetStateAction, useContext, useEffect } from 'react';
import { RestClientContext } from '@/shared';

export const useBodyStart = (
  bodyUrl: string,
  createBody: boolean,
  setInputBody: Dispatch<SetStateAction<string>>,
  setShowBody: Dispatch<SetStateAction<boolean>>,
  setSelectBody: Dispatch<SetStateAction<string>>,
  searchParams: { [key: string]: string | string[] | undefined }
) => {
  const { setBody } = useContext(RestClientContext);

  useEffect(() => {
    if (bodyUrl && !createBody) {
      const textBody = decodeURIComponent(atob(decodeURIComponent(bodyUrl)));
      setInputBody(textBody);
      setBody?.(textBody);

      const search = searchParams['Content-Type'];

      if (search && typeof search === 'string') {
        const typeBody = search.startsWith('application') ? 'json' : 'text';

        if (typeBody === 'json') {
          try {
            setInputBody(JSON.stringify(JSON.parse(textBody), null, 4));
          } catch {
            setInputBody(textBody);
          }
        }

        setSelectBody(typeBody);
        setShowBody(true);
      }

      if (!search && textBody) {
        setSelectBody('text');
        setShowBody(true);
      }
    }
  }, [
    bodyUrl,
    createBody,
    searchParams,
    setBody,
    setInputBody,
    setSelectBody,
    setShowBody,
  ]);
};
