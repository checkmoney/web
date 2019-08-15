import { Input as AntInput } from 'antd';
import React, { ChangeEvent, useCallback } from 'react';

import { resolveType } from './helpers/resolveType';
import { InputProps } from './InputProps';
import { InputType } from './InputType';

export const Input = ({
  onChange,
  type = InputType.Default,
  ...props
}: InputProps) => {
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(e.target.value);
      }
    },
    [onChange],
  );

  return (
    <AntInput type={resolveType(type)} onChange={handleChange} {...props} />
  );
};
