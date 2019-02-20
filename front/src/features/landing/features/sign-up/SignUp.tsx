import { useCallback } from 'react'
import { Field, Form } from 'react-final-form'
import { useMappedState } from 'redux-react-hook'

import { useSignUp } from '@front/domain/user/hooks/useSignUp'
import { getSignUpFetching } from '@front/domain/user/selectors/getSignUpFetching'
import { pushRoute } from '@front/pushRoute'
import { LoadingButton } from '@front/ui/atoms/loading-button'

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
        <form onSubmit={handleSubmit}>
          <h2>Sign-up</h2>

          <div>
            <label>Email</label>
            <Field
              name="email"
              component="input"
              placeholder="email@example.com"
              type="email"
            />
          </div>

          <div>
            <label>Password</label>
            <Field name="password" component="input" type="password" />
          </div>

          <div>
            <label>Again =) (fake!)</label>
            <Field name="password-again" component="input" type="password" />
          </div>

          <LoadingButton fethcing={fetching} submit>
            Sign-up
          </LoadingButton>
        </form>
      )}
    </Form>
  )
}
