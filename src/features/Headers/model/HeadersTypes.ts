export interface IHeadersProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

export interface IHeaders {
  key: string;
  value: string;
}
