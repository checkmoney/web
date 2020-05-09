import { Select as AntSelect } from 'antd';
import React from 'react';

import { OptionProps } from './OptionProps';

const AntOption = AntSelect.Option;

export const Option = ({ value, children }: OptionProps) => (
  <AntOption value={value}>{children}</AntOption>
);
