import { ReactElement } from 'react';

import { OptionProps } from '../Option/OptionProps';

export interface SelectProps {
  showSearch?: boolean;
  children: Array<ReactElement<OptionProps>>;
  value?: string;
  onChange?: (value: string | undefined) => void;
  className?: string;
}
