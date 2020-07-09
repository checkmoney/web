import { ButtonProps as AntButtonProps } from 'antd/lib/button';
import { ReactNode } from 'react';

export interface ButtonProps {
  mod?: AntButtonProps['type'];
  disabled?: boolean;
  loading?: boolean;
  type?: AntButtonProps['htmlType'];
  onClick?: AntButtonProps['onClick'];
  className?: string;
  children: ReactNode;
}
