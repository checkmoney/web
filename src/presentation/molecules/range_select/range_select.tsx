import React, { ComponentType, useCallback } from 'react';
import { range } from 'lodash';

import { Select, Option } from '&front/presentation/atoms';

import { RangeSelectProps } from './range_select.types';

export const RangeSelect: ComponentType<RangeSelectProps> = ({
  min,
  max,
  value,
  onChange,
}) => {
  const years = range(min, max + 1);

  const handleChange = useCallback(
    (v: string | undefined) => {
      if (!v) {
        return;
      }

      if (onChange) {
        onChange(Number(v));
      }
    },
    [onChange],
  );

  return (
    <Select value={value?.toString()} onChange={handleChange}>
      {years.map((year) => (
        <Option value={year.toString()} key={year}>
          {year.toString()}
        </Option>
      ))}
    </Select>
  );
};
