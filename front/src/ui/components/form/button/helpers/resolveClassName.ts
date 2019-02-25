import { ButtonType } from '../ButtonType'

export const resolveClassName = (type: ButtonType): string =>
  ({
    [ButtonType.Primary]: 'defaultButton',
    [ButtonType.Text]: 'textButton',
  }[type])
