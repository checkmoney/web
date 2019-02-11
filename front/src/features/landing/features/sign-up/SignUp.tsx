import { useCallback } from 'react'
import { Field, Form } from 'react-final-form'

import { useSignUp } from '@front/domain/user/hooks/useSignUp'
import { pushRoute } from '@front/pushRoute'

export const SignUp = () => {
  const signUp = useSignUp()

  const onSubmit = useCallback(async ({ email, password }) => {
    await signUp(email, password)
    await pushRoute('/hello')
  }, [])

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

          <button type="submit">sign-up</button>
        </form>
      )}
    </Form>
  )
}
