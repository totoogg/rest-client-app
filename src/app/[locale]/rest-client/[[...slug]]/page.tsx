import { methods, parseUrl, RestClientProvider } from '@/shared';
import { RestClient } from '@/widgets';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { slug } = await params;
  const searchParamsUrl = await searchParams;

  if (slug === undefined || !methods.includes(slug[0])) {
    const headersList = await headers();
    const fullUrl = headersList.get('link')?.split('; ')[0].slice(1, -1);
    const pathSegments = parseUrl(fullUrl || '').pathSegments;

    redirect(`/${pathSegments[0]}/${pathSegments[1]}/GET`);
  }

  return (
    <RestClientProvider>
      <RestClient slug={slug} searchParams={searchParamsUrl} />
    </RestClientProvider>
  );
}
