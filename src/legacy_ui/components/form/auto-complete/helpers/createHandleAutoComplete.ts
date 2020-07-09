import { SelectValue, LabeledValue } from 'antd/lib/select';
import { head } from 'lodash';

export const createHandleAutoComplete = (
  handleChange: (newValue?: string) => void,
) => (v: SelectValue) => {
  const realValue = Array.isArray(v)
    ? head<string | number | LabeledValue>(v)
    : v;

  if (typeof realValue === 'object' && realValue.key) {
    return handleChange(realValue.key);
  }

  if (typeof realValue === 'undefined') {
    return handleChange(realValue);
  }

  return handleChange(`${realValue}`);
};
