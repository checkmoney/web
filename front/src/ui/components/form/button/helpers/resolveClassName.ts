import { ButtonType } from '../ButtonType';

export const resolveClassName = (type: ButtonType): string =>
  ({
    [ButtonType.Primary]: '',
    [ButtonType.Secondary]: '',
    [ButtonType.Text]: 'textButton',
  }[type]);
