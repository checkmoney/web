import { ButtonType } from '../ButtonType'

export const resolveAntdType = (type: ButtonType) =>
  ({
    [ButtonType.Primary]: 'primary',
    [ButtonType.Text]: 'ghost',
  }[type])
