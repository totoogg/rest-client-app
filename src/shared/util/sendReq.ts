'use server';

import { parseUrl } from './parseUrl';

export async function sendReq(data: string) {
  const currentURL = parseUrl(data);

  const slug = currentURL.pathSegments.slice(2, 5);

  const method = slug[0];
  const url = decodeURIComponent(atob(decodeURIComponent(slug[1])));

  const textBody: undefined | string =
    method !== 'GET' && method !== 'HEAD' && slug[2]
      ? JSON.stringify(decodeURIComponent(atob(decodeURIComponent(slug[2]))))
      : undefined;

  const myHeaders = new Headers();

  if (currentURL.query.size > 0) {
    currentURL.query
      .entries()
      .forEach((el) =>
        myHeaders.append(
          decodeURIComponent(el[0] as string),
          decodeURIComponent(el[1] as string)
        )
      );
  }

  const requestOptions = {
    method,
    headers: myHeaders,
    body: textBody,
    next: { revalidate: 3600 },
  };

  try {
    console.log('requestOptions', requestOptions);
    const res = await fetch(url, requestOptions);

    if (res.status > 499) {
      return { status: res.status, res: 'Server error' };
    }

    if (res.status > 399) {
      return { status: res.status, res: 'Invalid request' };
    }

    const answer = await res.text();

    return { status: res.status, res: answer };
  } catch {
    return { status: -1, res: 'Network error. Could not send request' };
  }
}
