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
import styles from './Variables.module.css';
import { useTranslations } from 'next-intl';

const { Title } = Typography;

export const Variables: FC = () => {
  const [form] = Form.useForm();
  const [variables, setVariables] = useState<VariableProps[]>([]);
  const t = useTranslations();

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
    <div className={styles.containerForm}>
      <Form
        form={form}
        name="dynamic_form_nest_item"
        className={styles.form}
        autoComplete="off"
        onFinish={handleSubmit}
      >
        <Form.List name="variable">
          {(fields) => (
            <>
              <Form.Item>
                <Button
                  type="dashed"
                  style={{ width: 180 }}
                  onClick={handleAddField}
                  block
                  icon={<PlusOutlined />}
                >
                  {t('variables.buttonAddNewRow')}
                </Button>
              </Form.Item>
              <Flex
                // justify="space-around"
                justify="center"
                align="center"
                gap="60px"
                // style={{ width: '100%' }}
              >
                <Title level={5} style={{ margin: 0, padding: '0 30px' }}>
                  {t('variables.variableField')}
                </Title>
                <Title level={5} style={{ margin: 0, padding: '0 30px' }}>
                  {t('variables.сurrentValueField')}
                </Title>
              </Flex>
              {fields.map(({ key, name }, index) => (
                <Space
                  key={key}
                  style={{
                    display: 'flex',
                    // marginBottom: 8,
                    marginBottom: 0,
                    width: '100%',
                    justifyContent: 'center',
                    gap: '20px',
                    // justifyContent: 'space-evenly',
                  }}
                  align="baseline"
                >
                  <Form.Item
                    name={[name, 'variable']}
                    rules={[
                      {
                        required: true,
                        message: t('variables.validationMessage'),
                      },
                    ]}
                  >
                    <Input
                      placeholder={t('variables.variableField')}
                      onBlur={() => handleBlur(index)}
                    />
                  </Form.Item>
                  <Form.Item
                    name={[name, 'currentValue']}
                    rules={[
                      {
                        required: true,
                        message: t('variables.validationMessage'),
                      },
                    ]}
                  >
                    <Input
                      placeholder={t('variables.сurrentValueField')}
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
            {t('variables.savedVariables')}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
