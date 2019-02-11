import { useCallback } from 'react'
import { Field, Form } from 'react-final-form'

import { useSignIn } from '@front/domain/user/hooks/useSignIn'
import { pushRoute } from '@front/pushRoute'

export const SignIn = () => {
  const signIn = useSignIn()

  const onSubmit = useCallback(async ({ email, password }) => {
    await signIn(email, password)
    await pushRoute('/app')
  }, [])

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

          <button type="submit">sign-in</button>
        </form>
      )}
    </Form>
  )
}
