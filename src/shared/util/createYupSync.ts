import * as yup from 'yup';
import { RuleObject } from 'antd/lib/form';
import { AnyObject, Maybe } from 'yup';

export const createYupSync = <T extends Maybe<AnyObject>>(
  schema: yup.ObjectSchema<T>,
  fieldName: string,
  getFieldsValue: () => T
): RuleObject => ({
  async validator() {
    try {
      await schema.validateSyncAt(fieldName, getFieldsValue());
    } catch (e) {
      throw new Error((e as yup.ValidationError).message);
    }
  },
});
