import { useCallback } from 'react'
import { Field, Form } from 'react-final-form'
import { useMappedState } from 'redux-react-hook'

import { useSignIn } from '@front/domain/user/hooks/useSignIn'
import { getSignInFetching } from '@front/domain/user/selectors/getSignInFetching'
import { pushRoute } from '@front/pushRoute'
import { LoadingButton } from '@front/ui/atoms/loading-button'

export const SignIn = () => {
  const signIn = useSignIn()

  const onSubmit = useCallback(async ({ email, password }) => {
    await signIn(email, password)
    await pushRoute('/app')
  }, [])

  const fetching = useMappedState(getSignInFetching)

  return (
    <Form onSubmit={onSubmit}>
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <h2>Sign-in</h2>

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

          <LoadingButton fethcing={fetching} submit>
            Sign-in
          </LoadingButton>
        </form>
      )}
    </Form>
  )
}
