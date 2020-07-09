import { InputProps as AntInputProps } from 'antd/lib/input';

export interface InputProps
  extends Pick<
    AntInputProps,
    'addonBefore' | 'addonAfter' | 'name' | 'placeholder'
  > {
  onChange?: (v?: string) => void;
  type?: string;
  value?: string;
}
