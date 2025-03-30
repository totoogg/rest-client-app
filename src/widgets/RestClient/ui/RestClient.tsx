import { Headers, UrlLine } from '@/features';
import React, { FC } from 'react';
import { IRestClientProps } from '../model/RestClientTypes';
import { Flex } from 'antd';
import styles from './RestClient.module.css';

export const RestClient: FC<IRestClientProps> = ({ slug, searchParams }) => {
  return (
    <Flex
      gap="middle"
      wrap
      vertical={true}
      align="center"
      className={styles.wrapper}
    >
      <h2>REST Client</h2>
      <UrlLine methodSelect={slug?.[0] || ''} urlServer={slug?.[1] || ''} />
      <Headers searchParams={searchParams} />
    </Flex>
  );
};
