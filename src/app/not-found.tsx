import { parseUrl } from '@/shared';
import { NotFound as CustomNotFound } from '@/widgets';
import { headers } from 'next/headers';

export default async function NotFound() {
  const headersList = await headers();
  const fullUrl = headersList.get('link')?.split('; ')[0].slice(1, -1);
  const local = parseUrl(fullUrl || '').pathSegments[0];

  return (
    <html lang={local}>
      <body>
        <CustomNotFound />
      </body>
    </html>
  );
}
