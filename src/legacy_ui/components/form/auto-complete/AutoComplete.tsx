import { AutoComplete as AntAutoComplete } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';

import { useCustomInput } from '&front/legacy_ui/hooks/useCustomInput';

import { AutoCompleteProps } from './AutoCompleteProps';
import { createHandleAutoComplete } from './helpers/createHandleAutoComplete';
import { filterOption } from './helpers/filterOption';

export const AutoComplete = ({
  value,
  onChange,
  variants,
  placeholder,
  className,
}: AutoCompleteProps) => {
  const { currentValue, handleChange } = useCustomInput(value, onChange);

  const handleAutoComplete = useCallback(
    createHandleAutoComplete(handleChange),
    [handleChange],
  );

  // hide hint if `currentValue` is empty
  const [dataSource, setDataSource] = useState<string[]>([]);
  useEffect(() => {
    const valueExists = currentValue && currentValue.length !== 0;

    setDataSource(valueExists ? variants : []);
  }, [currentValue, variants]);

  return (
    <AntAutoComplete
      onChange={handleAutoComplete}
      value={currentValue}
      dataSource={dataSource}
      placeholder={placeholder}
      filterOption={filterOption}
      className={className}
    />
  );
};
