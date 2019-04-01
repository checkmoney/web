import { useCallback } from 'react'
import { Form } from 'react-final-form'
import { useMappedState } from 'redux-react-hook'
import cx from 'classnames'

import { useThunk } from '@front/domain/store'
import { signIn } from '@front/domain/user/actions/signIn'
import { getSignInFetching } from '@front/domain/user/selectors/getSignInFetching'
import { Input } from '@front/features/final-form'
import { pushRoute } from '@front/features/routing'
import { InputType } from '@front/ui/components/form/input/InputType'
import { Label } from '@front/ui/components/form/label'
import { LoadingButton } from '@front/ui/components/form/loading-button'
import { useErrorAlert } from '@front/ui/hooks/useErrorAlert'
import { Card } from '@front/ui/components/layout/card'

import * as styles from '../SignForm.css'

interface Props {
  className?: string
}

export const SignIn = ({ className }: Props) => {
  const dispatch = useThunk()

  const onSubmit = useCallback(async ({ email, password }) => {
    await dispatch(signIn(email, password))
    await pushRoute('/app')
  }, [])

  const fetching = useMappedState(getSignInFetching)
  useErrorAlert(fetching.error)

  return (
    <Form onSubmit={onSubmit}>
      {({ handleSubmit }) => (
        <form
          onSubmit={handleSubmit}
          className={cx(styles.container, className)}
        >
          <Card title="Sign-in" className={styles.card}>
            <Label text="Email">
              <Input
                name="email"
                type={InputType.Email}
                placeholder="email@example.com"
              />
            </Label>

            <Label text="Password">
              <Input name="password" type={InputType.Password} />
            </Label>

            <LoadingButton fethcing={fetching} submit>
              Sign-in
            </LoadingButton>
          </Card>
        </form>
      )}
    </Form>
  )
}
