import { ReactElement } from 'react';

import { VariantProps } from './VariantProps';

export interface ToggleProps {
  children: Array<ReactElement<VariantProps>>;
  value?: string;
  onChange?: (newValue?: string) => void;
  className?: string;
}
