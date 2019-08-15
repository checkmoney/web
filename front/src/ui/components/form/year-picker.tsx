import React, { useMemo, useCallback } from 'react';
import { getYear } from 'date-fns';
import { range } from 'lodash';

import { useCustomInput } from '&front/ui/hooks/useCustomInput';

import { Select, Option } from './select';

interface Props {
  min?: number;
  max?: number;
  value?: number;
  onChange?: (value: number | undefined) => void;
}

export const YearPicker = ({
  min = 2000,
  max = getYear(new Date()),
  value,
  onChange,
}: Props) => {
  const { currentValue, handleChange } = useCustomInput(value, onChange);

  const stringValue = useMemo(
    () => (currentValue !== undefined ? currentValue.toString() : undefined),
    [currentValue],
  );
  const stringOnChange = useCallback(
    (v: string | undefined) => {
      const newValue = v !== undefined ? parseInt(v, 10) : v;

      handleChange(newValue);
    },
    [handleChange],
  );

  const years = range(min, max + 1);

  return (
    <Select value={stringValue} onChange={stringOnChange}>
      {years.map(year => (
        <Option value={year.toString()} key={year}>
          {year.toString()}
        </Option>
      ))}
    </Select>
  );
};
