import { Input as AntInput } from 'antd';
import React, { ChangeEvent, useCallback } from 'react';

import { InputProps } from './input.types';

export const Input = ({ onChange, ...props }: InputProps) => {
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(e.target.value);
      }
    },
    [onChange],
  );

  return <AntInput onChange={handleChange} {...props} />;
};
