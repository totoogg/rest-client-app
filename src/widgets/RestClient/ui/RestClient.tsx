import { Body, CodeGenerator, Headers, UrlLine } from '@/features';
import React, { FC } from 'react';
import { IRestClientProps } from '../model/RestClientTypes';
import { Flex } from 'antd';
import styles from './RestClient.module.css';
import { Response } from '@/entities';

export const RestClient: FC<IRestClientProps> = ({ slug, searchParams }) => {
  return (
    <Flex
      gap="middle"
      wrap
      vertical={true}
      align="center"
      className={styles.wrapper}
    >
      <UrlLine methodSelect={slug?.[0] || ''} urlServer={slug?.[1] || ''} />
      <Headers searchParams={searchParams} />
      <Body bodyUrl={slug?.[2] || ''} />
      <CodeGenerator />
      <Response />
    </Flex>
  );
};
