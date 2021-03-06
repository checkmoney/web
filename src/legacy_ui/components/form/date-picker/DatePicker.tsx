import { DatePicker as AntDatePicker } from 'antd';
import moment, { Moment } from 'moment';
import React, { useCallback, useMemo } from 'react';

import { useCustomInput } from '&front/legacy_ui/hooks/useCustomInput';

import * as styles from './DatePicker.css';
import { DatePickerProps } from './DatePickerProps';

export const DatePicker = ({ value, onChange }: DatePickerProps) => {
  const { currentValue, handleChange } = useCustomInput(value, onChange);

  const momentHandleChange = useCallback(
    (date: Moment | null) => handleChange(date ? date.toDate() : new Date()),
    [handleChange],
  );

  const momentValue = useMemo(() => moment(currentValue), [currentValue]);

  return (
    <AntDatePicker
      onChange={momentHandleChange}
      value={momentValue}
      className={styles.datePicker}
    />
  );
};
