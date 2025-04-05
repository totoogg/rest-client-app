import React, {
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Form, Input } from 'antd';
import { EditableContext } from '../context/EditableContext';
import { EditableCellProps } from '../model/dataVariables';
import { useTranslations } from 'next-intl';

const EditableCell: FC<PropsWithChildren<EditableCellProps>> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  // ругается на Input не знаю что делать(
  //     "Input" относится к значению, но здесь используется как тип. Возможно, вы имели в виду "typeof Input"?ts(2749)
  // type Input = /*unresolved*/ any
  const inputRef = useRef<Input>(null);
  const form = useContext(EditableContext)!;
  const t = useTranslations();
  const customMessage = title + t('variables.validationMessage');

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[{ required: true, message: customMessage }]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingInlineEnd: 24 }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

export default EditableCell;
