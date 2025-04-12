'use client';
import React, { FC, useEffect, useState } from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Flex, Form, Input, Space, Typography } from 'antd';
import {
  convertVariablesToArray,
  getVariablesFromLocalStore,
  addDataVariablesToLocalStore,
} from '../utils/getVariablesFromLocalStore';
import { VariableProps } from '../model/dataVariables';

const { Title } = Typography;

export const Variables: FC = () => {
  const [form] = Form.useForm();
  const [variables, setVariables] = useState<VariableProps[]>([]);

  useEffect(() => {
    const dataObjectFromLocalStore = getVariablesFromLocalStore();
    const initialSavedVariables = convertVariablesToArray(
      dataObjectFromLocalStore
    );

    setVariables(initialSavedVariables);
    form.setFieldsValue({ variable: initialSavedVariables });
  }, [form]);

  const handleBlur = (index: number) => {
    const updatedVariables = [...variables];
    const variable = updatedVariables[index];
    console.log('variable', variable);
    setVariables(updatedVariables);
  };

  const handleAddField = () => {
    const newField: VariableProps = {
      variable: '',
      currentValue: '',
      key: variables.length,
    };
    const updatedVariables = [...variables, newField];
    setVariables(updatedVariables);
    form.setFieldsValue({ variable: updatedVariables });
  };

  const handleRemoveField = (index: number) => {
    const newVariables = variables.filter((_, idx) => idx !== index);
    setVariables(newVariables);
    addDataVariablesToLocalStore(newVariables);
    form.setFieldsValue({ variable: newVariables });
  };

  const handleSubmit = () => {
    const allValues = form.getFieldsValue();
    console.log('Значения формы при отправке:', allValues);
    addDataVariablesToLocalStore(allValues.variable);
  };

  return (
    <div>
      <Form
        form={form}
        name="dynamic_form_nest_item"
        style={{ maxWidth: 900 }}
        autoComplete="off"
        onFinish={handleSubmit}
      >
        <Form.List name="variable">
          {(fields) => (
            <>
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={handleAddField}
                  block
                  icon={<PlusOutlined />}
                >
                  Add field
                </Button>
              </Form.Item>
              <Flex justify="space-around" align="center">
                <Title level={5}>Variable</Title>
                <Title level={5}>Current Value</Title>
              </Flex>
              {fields.map(({ key, name }, index) => (
                <Space
                  key={key}
                  style={{ display: 'flex', marginBottom: 8 }}
                  align="baseline"
                >
                  <Form.Item
                    name={[name, 'variable']}
                    rules={[
                      { required: true, message: 'Missing naming variable' },
                    ]}
                  >
                    <Input
                      placeholder="Variable"
                      onBlur={() => handleBlur(index)}
                    />
                  </Form.Item>
                  <Form.Item
                    name={[name, 'currentValue']}
                    rules={[
                      { required: true, message: 'Missing value variable' },
                    ]}
                  >
                    <Input
                      placeholder="Current value"
                      onBlur={() => handleBlur(index)}
                    />
                  </Form.Item>
                  <MinusCircleOutlined
                    onClick={() => handleRemoveField(index)}
                  />
                </Space>
              ))}
            </>
          )}
        </Form.List>
        <Form.Item style={{ width: '100%', textAlign: 'center' }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
