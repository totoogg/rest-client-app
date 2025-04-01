import { Dispatch, SetStateAction, useContext, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { RestClientContext } from '@/shared';

export const useBodyStart = (
  bodyUrl: string,
  createBody: boolean,
  setInputBody: Dispatch<SetStateAction<string>>,
  setShowBody: Dispatch<SetStateAction<boolean>>,
  setSelectBody: Dispatch<SetStateAction<string>>
) => {
  const { setBody } = useContext(RestClientContext);
  const searchParams = useSearchParams();

  useEffect(() => {
    if (bodyUrl && !createBody) {
      const textBody = decodeURIComponent(atob(decodeURIComponent(bodyUrl)));
      setInputBody(textBody);
      setBody?.(textBody);

      const search = searchParams.get('Content-Type');

      if (search) {
        const typeBody = search.startsWith('text') ? 'text' : 'json';

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
