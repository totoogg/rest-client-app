export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { slug } = await params;
  const searchParamsUrl = await searchParams;

  return (
    <div>
      search {String(searchParamsUrl)}
      param {slug}
    </div>
  );
}
