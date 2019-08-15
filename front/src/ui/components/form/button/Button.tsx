import { Button as AntButton } from 'antd';
import cx from 'classnames';
import React from 'react';

import * as styles from './Button.css';
import { ButtonProps } from './ButtonProps';
import { ButtonType } from './ButtonType';
import { resolveAntdType } from './helpers/resolveAntdType';
import { resolveClassName } from './helpers/resolveClassName';
import { resolveType } from './helpers/resolveType';

export const Button = ({
  submit = false,
  children,
  onClick,
  className,
  disabled = false,
  type = ButtonType.Primary,
}: ButtonProps) => (
  <AntButton
    onClick={onClick}
    htmlType={resolveType(submit)}
    className={cx(className, (styles as any)[resolveClassName(type)])}
    type={resolveAntdType(type) as any}
    disabled={disabled}
  >
    {children}
  </AntButton>
);
