import { InputType } from '../InputType';

export const resolveType = (type: InputType): string =>
  ({
    [InputType.Default]: '',
    [InputType.Email]: 'email',
    [InputType.Password]: 'password',
  }[type]);
