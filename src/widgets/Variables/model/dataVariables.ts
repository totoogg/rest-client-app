import type { Form, GetRef, TableProps } from 'antd';
import { ReactNode } from 'react';

export interface Item {
  key: string;
  variable: string;
  initialValue: string;
}

export type FormInstance<T> = GetRef<typeof Form<T>>;

export type EditableContectProps = FormInstance<Item>;

export interface EditableCellProps {
  title: ReactNode;
  editable: boolean;
  dataIndex: keyof Item;
  record: Item;
  handleSave: (record: Item) => void;
}

export type ColumnTypes = Exclude<TableProps<Item>['columns'], undefined>;

export interface IVariablesFromLocalStore {
  [key: string]: string;
}
