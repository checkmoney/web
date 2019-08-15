import { ButtonType } from './ButtonType';

export interface ButtonProps {
  submit?: boolean;
  children: string;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: ButtonType;
}
