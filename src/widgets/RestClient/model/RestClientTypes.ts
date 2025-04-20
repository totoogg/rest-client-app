export interface IRestClientProps {
  slug: string | string[] | undefined;
  searchParams: { [key: string]: string | string[] | undefined };
}
