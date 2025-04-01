import { RestClientContext } from '@/shared';
import { Dispatch, SetStateAction, useContext, useEffect } from 'react';
import { convert } from 'postman-code-generators';
import { Request } from 'postman-collection';
import { languages } from '../../consts/languages';

export const useCodeGenerator = (
  selectCodeGenerate: string,
  setCodeGenerate: Dispatch<SetStateAction<string>>
) => {
  const { method, url, body, headers } = useContext(RestClientContext);

  useEffect(() => {
    const generateCode = () => {
      const options = {
        indentCount: 4,
        indentType: 'Space' as const,
        trimRequestBody: true,
        followRedirect: true,
      };

      const customRequest = new Request({
        url: url || '',
        method: method || 'GET',
        header: headers?.clear,
        body: body
          ? {
              mode: 'raw',
              raw: body,
            }
          : undefined,
      });

      convert(
        languages[selectCodeGenerate].lang,
        languages[selectCodeGenerate].variant,
        customRequest,
        options,
        (_, code) => {
          setCodeGenerate(code);
        }
      );
    };
    if (selectCodeGenerate !== 'none') {
      generateCode();
    }
  }, [body, headers?.clear, method, selectCodeGenerate, setCodeGenerate, url]);
};
