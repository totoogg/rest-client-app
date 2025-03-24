'use client';
import { Select } from 'antd';
import { FC } from 'react';

const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};

export const LangToggle: FC = () => {
  return (
    <Select
      style={{ width: 120 }}
      defaultValue="en"
      onChange={handleChange}
      options={[
        { value: 'en', label: <span>English</span> },
        { value: 'ru', label: <span>Russian </span> },
      ]}
    />
  );
};
