import { Select as AntSelect } from 'antd';
import React, { ComponentType } from 'react';

import { filterOption } from './select.utils';
import { SelectProps } from './select.types';

export const Select: ComponentType<SelectProps> = ({
  children,
  showSearch = false,
  value,
  onChange,
  className,
}) => {
  return (
    <AntSelect
      showSearch={showSearch}
      value={value}
      onChange={onChange}
      filterOption={filterOption}
      className={className}
    >
      {/* We must map it for suppress Ant warning */}
      {children.map((child) => (
        <AntSelect.Option key={child.props.value} {...child.props} />
      ))}
    </AntSelect>
  );
};
