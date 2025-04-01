import { RestClientContext } from '@/shared';
import { useContext, useEffect, useState } from 'react';

export const useValidSend = (input: string) => {
  const { error } = useContext(RestClientContext);

  const [valid, setValid] = useState(false);

  useEffect(() => {
    if (
      !input ||
      error?.inputValid ||
      (error?.inputValidVariable || '').length > 0 ||
      error?.errorBody ||
      (error?.headersValidVariable || '').length > 0 ||
      (error?.inputBodyValidVariable || '').length > 0
    ) {
      setValid(false);
    } else {
      setValid(true);
    }
  }, [
    error?.errorBody,
    error?.headersValidVariable,
    error?.inputBodyValidVariable,
    error?.inputValid,
    error?.inputValidVariable,
    input,
  ]);

  return { valid };
};
