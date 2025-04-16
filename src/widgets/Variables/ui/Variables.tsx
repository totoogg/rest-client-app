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

const { Title, Paragraph } = Typography;

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
              {variables.length > 0 ? (
                <Flex
                  justify="center"
                  align="center"
                  gap="20px"
                  style={{ marginRight: '40px' }}
                >
                  <Title
                    level={5}
                    style={{
                      margin: 0,
                      width: '204px',
                      textAlign: 'center',
                    }}
                  >
                    {t('variables.variableField')}
                  </Title>
                  <Title
                    level={5}
                    style={{
                      margin: 0,
                      width: '204px',
                      textAlign: 'center',
                    }}
                  >
                    {t('variables.сurrentValueField')}
                  </Title>
                </Flex>
              ) : (
                <Flex>
                  <Paragraph> {t('variables.noneSavedVariables')}</Paragraph>
                </Flex>
              )}
              {fields.map(({ key, name }, index) => (
                <Space
                  key={key}
                  style={{
                    display: 'flex',
                    marginBottom: 0,
                    width: '100%',
                    justifyContent: 'center',
                    gap: '20px',
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
                    <Input placeholder={t('variables.variableField')} />
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
                    <Input placeholder={t('variables.сurrentValueField')} />
                  </Form.Item>
                  <MinusCircleOutlined
                    onClick={() => handleRemoveField(index)}
                  />
                </Space>
              ))}
            </>
          )}
        </Form.List>
        {variables.length !== 0 && (
          <Form.Item style={{ width: '100%', textAlign: 'center' }}>
            <Button type="primary" htmlType="submit">
              {t('variables.savedVariables')}
            </Button>
          </Form.Item>
        )}
      </Form>
    </div>
  );
};
