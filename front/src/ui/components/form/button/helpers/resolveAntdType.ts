import { ButtonType } from '../ButtonType'

export const resolveAntdType = (type: ButtonType) =>
  ({
    [ButtonType.Primary]: 'primary',
    [ButtonType.Text]: 'ghost',
    [ButtonType.Secondary]: 'secondary',
  }[type])
