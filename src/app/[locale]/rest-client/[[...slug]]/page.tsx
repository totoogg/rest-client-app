import { methods, parseUrl } from '@/shared';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import dynamic from 'next/dynamic';

const RestClient = dynamic(() =>
  import('../../../../widgets').then((mod) => mod.RestClient)
);

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string | string[] | undefined }>;
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

  return <RestClient slug={slug} searchParams={searchParamsUrl} />;
}
