import { UrlLine } from '@/features';
import React, { FC } from 'react';
import { IRestClientProps } from '../model/RestClientTypes';

export const RestClient: FC<IRestClientProps> = ({ slug, searchParams }) => {
  return (
    <>
      <div>{String(searchParams)}</div>
      <UrlLine methodSelect={slug?.[0] || ''} urlServer={slug?.[1] || ''} />
    </>
  );
};
