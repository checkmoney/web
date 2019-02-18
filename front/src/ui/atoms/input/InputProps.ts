import { InputProps as AntInputProps } from 'antd/lib/input'
import { InputHTMLAttributes } from 'react'

type HTMLInputProps = Pick<
  InputHTMLAttributes<HTMLInputElement>,
  'placeholder' | 'value' | 'onChange'
>

type AntProps = Pick<AntInputProps, 'addonBefore' | 'addonAfter'>

export type InputProps = HTMLInputProps & AntProps
