import { Omit } from 'utility-types';

import { SelectProps } from '&front/presentation/atoms';

export interface EnumSelectProps extends Omit<SelectProps, 'children'> {
  options: object;
  getLabel?: (value: any) => string;
}
