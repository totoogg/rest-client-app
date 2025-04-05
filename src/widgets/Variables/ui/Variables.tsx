'use client';
import React, { FC, Key, useState } from 'react';
import { Button, Popconfirm, Table } from 'antd';
import EditableRow from '../context/EditableRow';
import EditableCell from '../context/EditableCell';
import {
  convertVariablesToArray,
  getVariablesFromLocalStore,
  addDataVariablesToLocalStore,
} from '../utils/getVariablesFromLocalStore';
import { ColumnTypes, Item } from '../model/dataVariables';
import { useTranslations } from 'next-intl';

export const Variables: FC = () => {
  const alldata = getVariablesFromLocalStore();
  const arrData: Item[] = convertVariablesToArray(alldata);
  const [dataSource, setDataSource] = useState<Item[]>(arrData);
  const [count, setCount] = useState(arrData.length);
  const t = useTranslations();

  const handleDelete = (key: Key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };

  const handleAdd = () => {
    const newData: Item = {
      key: `${count}`,
      variable: `Name ${count}`,
      initialValue: t('variables.tooltipValue'),
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };

  const handleSave = (row: Item) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    newData.splice(index, 1, { ...newData[index], ...row });
    setDataSource(newData);
    addDataVariablesToLocalStore(newData);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const columns = [
    {
      title: t('variables.variableField'),
      dataIndex: 'variable',
      editable: true,
    },
    {
      title: t('variables.initialValueField'),
      dataIndex: 'initialValue',
      editable: true,
    },
    {
      title: t('variables.operationField'),
      dataIndex: 'operation',
      render: (_: unknown, record: Item) =>
        dataSource.length >= 1 ? (
          <Popconfirm
            title={t('variables.isDelete')}
            onConfirm={() => handleDelete(record.key)}
          >
            <a>{t('variables.buttonDelete')}</a>
          </Popconfirm>
        ) : null,
    },
  ].map((col) => ({
    ...col,
    onCell: (record: Item) => ({
      record,
      editable: col.editable,
      dataIndex: col.dataIndex,
      title: col.title,
      handleSave,
    }),
  }));

  return (
    <>
      <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
        {t('variables.buttonAddNewRow')}
      </Button>
      <Table<Item>
        style={{ width: '80%' }}
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={dataSource}
        columns={columns as ColumnTypes}
      />
    </>
  );
};
