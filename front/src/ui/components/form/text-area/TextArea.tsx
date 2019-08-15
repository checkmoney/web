import { Input as AntInput } from 'antd';
import React, { useCallback, ChangeEvent } from 'react';

import { useCustomInput } from '&front/ui/hooks/useCustomInput';

import { TextAreaProps } from './TextAreaProps';

const AntTextArea = AntInput.TextArea;

export const TextArea = ({ value, onChange, rows }: TextAreaProps) => {
  const { currentValue, handleChange } = useCustomInput(value, onChange);

  const antOnChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      handleChange(e.target.value);
    },
    [handleChange],
  );

  return (
    <AntTextArea value={currentValue} onChange={antOnChange} rows={rows} />
  );
};
