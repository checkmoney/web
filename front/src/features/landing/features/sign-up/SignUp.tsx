import { useCallback } from 'react'
import { Form } from 'react-final-form'
import { useDispatch, useMappedState } from 'redux-react-hook'

import { signUp } from '@front/domain/user/actions/signUp'
import { getSignUpFetching } from '@front/domain/user/selectors/getSignUpFetching'
import { Input } from '@front/features/final-form'
import { pushRoute } from '@front/features/routing'
import { InputType } from '@front/ui/components/form/input/InputType'
import { Label } from '@front/ui/components/form/label'
import { LoadingButton } from '@front/ui/components/form/loading-button'
import { Card } from '@front/ui/components/layout/card'

import * as styles from '../SignForm.css'

export const SignUp = () => {
  const dispatch = useDispatch()

  const onSubmit = useCallback(async ({ email, password }) => {
    await dispatch(signUp(email, password) as any)
    await pushRoute('/hello')
  }, [])

  const fetching = useMappedState(getSignUpFetching)

  return (
    <Form onSubmit={onSubmit}>
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit} className={styles.container}>
          <Card title="Sign-up" className={styles.card}>
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

            <Label text="Repeat password">
              <Input name="password-repeat" type={InputType.Password} />
            </Label>

            <LoadingButton fethcing={fetching} submit>
              Sign-up
            </LoadingButton>
          </Card>
        </form>
      )}
    </Form>
  )
}
