import { parseUrl, RestClientContext } from '@/shared';
import { useContext, useEffect } from 'react';

export const useChangeUrl = () => {
  const { method, url, body, headers } = useContext(RestClientContext);

  useEffect(() => {
    const urlStart = parseUrl(window.location.href).pathSegments.slice(0, 2);
    const urlStr = btoa(encodeURIComponent(url || ''));
    let urlHeaders = '';
    let bodyText = '';
    let json = false;

    if (headers?.clear) {
      urlHeaders = headers.clear
        .map(
          (el) =>
            `${encodeURIComponent(el.key)}=${encodeURIComponent(el.value)}`
        )
        .join('&');
    }

    if (body) {
      try {
        bodyText = JSON.parse(body);
        json = true;
      } catch {
        bodyText = body;
        json = false;
      }
    }

    const bodyUrl = btoa(
      body
        ? json
          ? encodeURIComponent(JSON.stringify(bodyText))
          : encodeURIComponent(bodyText)
        : ''
    );

    window.history.replaceState(
      {},
      '',
      `/${urlStart[0]}/${urlStart[1]}/${method}${urlStr ? `/${urlStr}` : ''}${bodyUrl ? `/${bodyUrl}` : ''}${
        urlHeaders?.length ? `?${urlHeaders}` : ''
      }`
    );
  }, [body, headers?.clear, method, url]);
};
