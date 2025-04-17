import { Body, CodeGenerator, Headers, UrlLine } from '@/features';
import React, { FC } from 'react';
import { IRestClientProps } from '../model/RestClientTypes';
import { Flex } from 'antd';
import styles from './RestClient.module.css';
import { Response } from '@/entities';
import { RestClientProvider } from '@/shared';

export const RestClient: FC<IRestClientProps> = ({ slug, searchParams }) => {
  return (
    <RestClientProvider>
      <Flex
        gap="middle"
        wrap
        vertical={true}
        align="center"
        className={`${styles.wrapper} ${styles.restClient}`}
      >
        <UrlLine methodSelect={slug?.[0] || ''} urlServer={slug?.[1] || ''} />
        <Headers searchParams={searchParams} />
        <Body bodyUrl={slug?.[2] || ''} searchParams={searchParams} />
        <CodeGenerator />
        <Response />
      </Flex>
    </RestClientProvider>
  );
};
