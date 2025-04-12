import React, { Dispatch, useEffect } from 'react';
import { IHistoryState } from '../../model/typeState';
import { parseUrl } from '@/shared';

export const useGetHistory = (
  setHistory: Dispatch<React.SetStateAction<IHistoryState[]>>
) => {
  useEffect(() => {
    const userLocal = localStorage.getItem('userRenderCrew') || '{}';

    const user = JSON.parse(userLocal)?.user;

    if (user) {
      const history = JSON.parse(localStorage.getItem('dbRenderCrew') || '')[
        user
      ].history;
      const res = history.map((item: string, id: number) => {
        const currentURL = parseUrl(item);
        const slug = currentURL.pathSegments.slice(2, 5);
        const searchParams = item.slice(item.indexOf('?') + 1);
        const href = `/rest-client${slug.map((el) => `/${el}`).join('')}${
          searchParams ? `?${searchParams}` : ''
        }`;

        const method = slug[0];
        const url = decodeURIComponent(atob(decodeURIComponent(slug[1])));

        const textBody: undefined | string =
          method !== 'GET' && method !== 'HEAD' && slug[2]
            ? decodeURIComponent(atob(decodeURIComponent(slug[2])))
            : undefined;

        return { method, url, textBody, id, href };
      });

      setHistory(res);
    }
  }, [setHistory]);
};
