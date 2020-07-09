import { ReactElement } from 'react';

export interface OptionProps {
  value: string;
  children: string;
  className?: string;
}

export interface SelectProps {
  showSearch?: boolean;
  children: Array<ReactElement<OptionProps>>;
  value?: string;
  onChange?: (value: string | undefined) => void;
  className?: string;
}
