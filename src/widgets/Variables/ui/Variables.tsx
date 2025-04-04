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

// export default Variables;

// 'use client';
// import React, {
//   useContext,
//   useEffect,
//   useRef,
//   useState,
//   FC,
//   PropsWithChildren,
//   Key,
//   createContext,
// } from 'react';
// import type { InputRef } from 'antd';
// import { Button, Form, Input, Popconfirm, Table } from 'antd';
// import {
//   convertVariablesToArray,
//   getVariablesFromLocalStore,
//   addDataVariablesToLocalStore,
// } from '../utils/getVariablesFromLocalStore';
// import {
//   ColumnTypes,
//   EditableCellProps,
//   EditableContectProps,
//   Item,
// } from '../model/dataVariables';
// import { useTranslations } from 'next-intl';

// const EditableRow: FC = ({ ...props }) => {
//   const [form] = Form.useForm();
//   return (
//     <Form form={form} component={false}>
//       <EditableContext.Provider value={form}>
//         <tr {...props} />
//       </EditableContext.Provider>
//     </Form>
//   );
// };

// const EditableCell: FC<PropsWithChildren<EditableCellProps>> = ({
//   title,
//   editable,
//   children,
//   dataIndex,
//   record,
//   handleSave,
//   ...restProps
// }) => {
//   const [editing, setEditing] = useState(false);
//   const inputRef = useRef<InputRef>(null);
//   const form = useContext(EditableContext)!;
//   const t = useTranslations();
//   // t(`variables.${title}Field`)
//   const customMessage = title + t('variables.validationMessage');
//   useEffect(() => {
//     if (editing) {
//       inputRef.current?.focus();
//     }
//   }, [editing]);

//   const toggleEdit = () => {
//     setEditing(!editing);
//     form.setFieldsValue({ [dataIndex]: record[dataIndex] });
//   };

//   const save = async () => {
//     try {
//       const values = await form.validateFields();

//       toggleEdit();
//       handleSave({ ...record, ...values });
//     } catch (errInfo) {
//       console.log('Save failed:', errInfo);
//     }
//   };

//   let childNode = children;

//   if (editable) {
//     childNode = editing ? (
//       <Form.Item
//         style={{ margin: 0 }}
//         name={dataIndex}
//         rules={[{ required: true, message: customMessage }]}
//       >
//         <Input ref={inputRef} onPressEnter={save} onBlur={save} />
//       </Form.Item>
//     ) : (
//       <div
//         className="editable-cell-value-wrap"
//         style={{ paddingInlineEnd: 24 }}
//         onClick={toggleEdit}
//       >
//         {children}
//       </div>
//     );
//   }

//   return <td {...restProps}>{childNode}</td>;
// };

// export const Variables: FC = () => {
//   const alldata = getVariablesFromLocalStore();
//   const arrData: Item[] = convertVariablesToArray(alldata);

//   const [dataSource, setDataSource] = useState<Item[]>(arrData);
//   const initKeyForCount = arrData.length;
//   const [count, setCount] = useState(initKeyForCount);
//   const t = useTranslations();

//   const handleDelete = (key: Key) => {
//     const newData = dataSource.filter((item) => item.key !== key);
//     setDataSource(newData);
//   };

//   const defaultColumns: (ColumnTypes[number] & {
//     editable?: boolean;
//     dataIndex: string;
//   })[] = [
//     {
//       title: t('variables.variableField'),
//       dataIndex: 'variable',
//       width: '40%',
//       editable: true,
//     },
//     {
//       title: t('variables.initialValueField'),
//       dataIndex: 'initialValue',
//       width: '40%',
//       editable: true,
//     },
//     {
//       title: t('variables.operationField'),
//       dataIndex: 'operation',
//       render: (_, record) =>
//         dataSource.length >= 1 ? (
//           <Popconfirm
//             title={t('variables.isDelete')}
//             onConfirm={() => handleDelete(record.key)}
//           >
//             <a>{t('variables.buttonDelete')}</a>
//           </Popconfirm>
//         ) : null,
//     },
//   ];

//   // const t = useTranslations();
//   const handleAdd = () => {
//     const newData: Item = {
//       key: `${count}`,
//       variable: `Name ${count}`,
//       initialValue: t('variables.tooltipValue'),
//     };
//     setDataSource([...dataSource, newData]);
//     setCount(count + 1);
//   };

//   const handleSave = (row: Item) => {
//     const newData = [...dataSource];
//     const index = newData.findIndex((item) => row.key === item.key);
//     const item = newData[index];
//     newData.splice(index, 1, {
//       ...item,
//       ...row,
//     });
//     setDataSource(newData);
//     console.log('dataSource', dataSource);
//     addDataVariablesToLocalStore(dataSource);
//   };

//   const components = {
//     body: {
//       row: EditableRow,
//       cell: EditableCell,
//     },
//   };

//   const columns = defaultColumns.map((col) => {
//     if (!col.editable) {
//       return col;
//     }
//     return {
//       ...col,
//       onCell: (record: Item) => ({
//         record,
//         editable: col.editable,
//         dataIndex: col.dataIndex,
//         title: col.title,
//         handleSave,
//       }),
//     };
//   });

//   return (
//     <>
//       <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
//         {/* Add a row */}
//         {t('variables.buttonAddNewRow')}
//       </Button>
//       <Table<Item>
//         style={{ width: '80%', height: '100%' }}
//         components={components}
//         rowClassName={() => 'editable-row'}
//         bordered
//         dataSource={dataSource}
//         columns={columns as ColumnTypes}
//       />
//     </>
//   );
// };
