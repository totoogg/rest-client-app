export interface IBodyProps {
  bodyUrl: string;
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}
