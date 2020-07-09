import { Button as AntButton } from 'antd';
import React, { ComponentType } from 'react';

import { ButtonProps } from './button.types';

export const Button: ComponentType<ButtonProps> = ({
  mod,
  disabled,
  loading,
  children,
  type,
  onClick,
  className,
}: ButtonProps) => (
  <AntButton
    onClick={onClick}
    htmlType={type}
    className={className}
    type={mod}
    disabled={disabled}
    loading={loading}
  >
    {children}
  </AntButton>
);
