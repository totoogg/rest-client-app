import { RestClientContext } from '@/shared';
import { useContext, useEffect, useState } from 'react';

export const useStartUrl = (urlServer: string) => {
  const { setUrl } = useContext(RestClientContext);
  const [inputUrl, setInputUrl] = useState('');

  useEffect(() => {
    let url = '';

    try {
      url = atob(decodeURIComponent(urlServer));
    } catch {
      url = urlServer;
    }

    setUrl?.(decodeURIComponent(url));
    setInputUrl(decodeURIComponent(url));
  }, [setUrl, urlServer]);

  return { inputUrl };
};
