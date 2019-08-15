import { InputProps as AntInputProps } from 'antd/lib/input';
import { InputHTMLAttributes } from 'react';

import { InputType } from './InputType';

type HTMLInputProps = Pick<
  InputHTMLAttributes<HTMLInputElement>,
  'placeholder' | 'value'
>;

type AntProps = Pick<AntInputProps, 'addonBefore' | 'addonAfter'>;

interface OwnProps {
  onChange?: (v?: string | undefined) => void;
  type?: InputType;
}

export type InputProps = HTMLInputProps & AntProps & OwnProps;
