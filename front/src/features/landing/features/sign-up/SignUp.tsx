import { useCallback } from 'react'
import { Form } from 'react-final-form'
import { useMappedState } from 'redux-react-hook'

import { useSignUp } from '@front/domain/user/hooks/useSignUp'
import { getSignUpFetching } from '@front/domain/user/selectors/getSignUpFetching'
import { Input } from '@front/features/final-form'
import { pushRoute } from '@front/pushRoute'
import { InputType } from '@front/ui/atoms/input/InputType'
import { Label } from '@front/ui/atoms/label'
import { LoadingButton } from '@front/ui/atoms/loading-button'
import { Card } from '@front/ui/molecules/card'

import * as styles from '../SignForm.css'

export const SignUp = () => {
  const signUp = useSignUp()

  const onSubmit = useCallback(async ({ email, password }) => {
    await signUp(email, password)
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
