'use client';

import {
  createContext,
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from 'react';

type header = {
  key: string;
  value: string;
};

type response = {
  status: number;
  res: string;
};

type error = {
  inputValid: boolean;
  headersValidVariable: string;
  errorBody: boolean;
  inputBodyValidVariable: string;
  inputValidVariable: string;
};

type variables = { [key: string]: string };

interface IRestClientContext {
  method?: string;
  setMethod?: (method: string) => void;
  url?: string;
  setUrl?: (url: string) => void;
  body?: string;
  setBody?: (body: string) => void;
  headers?: { dirt: header[]; clear: header[] };
  setHeaders?: Dispatch<SetStateAction<{ dirt: header[]; clear: header[] }>>;
  variables?: variables;
  error?: error;
  setError?: Dispatch<SetStateAction<error>>;
  response?: response;
  setResponse?: (response: response) => void;
}

interface IRestClientProvider {
  children: React.ReactNode;
}

export const RestClientContext = createContext<IRestClientContext>({});

export const RestClientProvider: FC<IRestClientProvider> = ({ children }) => {
  const [method, setMethod] = useState<string>('');
  const [url, setUrl] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const [headers, setHeaders] = useState<{ dirt: header[]; clear: header[] }>({
    clear: [],
    dirt: [],
  });
  const [variables, setVariables] = useState<variables>({});
  const [response, setResponse] = useState<response>({ res: '', status: -1 });
  const [error, setError] = useState<error>({
    errorBody: false,
    headersValidVariable: '',
    inputBodyValidVariable: '',
    inputValidVariable: '',
    inputValid: false,
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
      response,
      setResponse,
    }),
    [body, error, headers, method, response, url, variables]
  );

  return (
    <RestClientContext.Provider value={defaultValue}>
      {children}
    </RestClientContext.Provider>
  );
};
