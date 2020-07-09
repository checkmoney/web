import React, { ComponentType } from 'react';

import { Select, Option } from '&front/presentation/atoms';

import { EnumSelectProps } from './enum_select.types';

export const EnumSelect: ComponentType<EnumSelectProps> = ({
  options,
  getLabel,
  ...props
}) => {
  const createLabel = (value: string) => getLabel?.(value) ?? value;

  return (
    <Select {...props}>
      {Object.values(options).map((value) => (
        <Option value={value} key={value}>
          {createLabel(value)}
        </Option>
      ))}
    </Select>
  );
};
