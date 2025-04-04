import React, { FC } from 'react';
import { Form } from 'antd';
import { EditableContext } from '../context/EditableContext';

const EditableRow: FC = ({ ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

export default EditableRow;
