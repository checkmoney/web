import { Select as AntSelect } from 'antd';
import React, { ComponentType } from 'react';

import { OptionProps } from './select.types';

export const Option: ComponentType<OptionProps> = ({
  value,
  children,
}: OptionProps) => (
  <AntSelect.Option value={value}>{children}</AntSelect.Option>
);
