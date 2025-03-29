'use client';

import { createContext, FC, useEffect, useMemo, useState } from 'react';

type header = {
  key: string;
  value: string;
};

type error = {
  headersValidVariable: string;
  errorBody: boolean;
  inputBodyValidVariable: string;
};

type variables = { [key: string]: string };

interface IRestClientContext {
  method?: string;
  setMethod?: (method: string) => void;
  url?: string;
  setUrl?: (url: string) => void;
  body?: string;
  setBody?: (body: string) => void;
  headers?: header[];
  setHeaders?: (headers: header[]) => void;
  variables?: variables;
  error?: error;
  setError?: (error: error) => void;
}

interface IRestClientProvider {
  children: React.ReactNode;
}

export const RestClientContext = createContext<IRestClientContext>({});

export const RestClientProvider: FC<IRestClientProvider> = ({ children }) => {
  const [method, setMethod] = useState<string>('');
  const [url, setUrl] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const [headers, setHeaders] = useState<header[]>([]);
  const [variables, setVariables] = useState<variables>({});
  const [error, setError] = useState<error>({
    errorBody: false,
    headersValidVariable: '',
    inputBodyValidVariable: '',
  });

  useEffect(() => {
    const user = JSON.parse(
      localStorage.getItem('userRenderCrew') || '{}'
    )?.user;

    const variables = JSON.parse(
      localStorage.getItem('dbRenderCrew') || '{}'
    )?.[user]?.variables;

    if (variables && Object.keys(variables).length > 0) {
      setVariables(variables);
    }
  }, []);

  const defaultValue = useMemo(
    () => ({
      method,
      setMethod,
      url,
      setUrl,
      body,
      setBody,
      headers,
      setHeaders,
      variables,
      error,
      setError,
    }),
    [body, error, headers, method, url, variables]
  );

  return (
    <RestClientContext.Provider value={defaultValue}>
      {children}
    </RestClientContext.Provider>
  );
};
