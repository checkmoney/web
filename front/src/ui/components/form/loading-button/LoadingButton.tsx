import { Omit } from 'utility-types'
import { FetchingState } from 'redux-clear'

import { Button, ButtonProps } from '../button'

type CompatibleButtonProps = Omit<ButtonProps, 'disabled'>

interface OwnProps {
  fethcing: FetchingState
}

export const LoadingButton = ({
  fethcing,
  children,
  ...props
}: OwnProps & CompatibleButtonProps) => {
  const disabled = fethcing.loading

  return (
    <Button {...props} disabled={disabled}>
      {children}
    </Button>
  )
}
