import React, { useCallback } from 'react'
import { Form } from 'react-final-form'
import { useMappedState } from 'redux-react-hook'
import cx from 'classnames'

import { useThunk } from '&front/domain/store'
import { signUp } from '&front/domain/user/actions/signUp'
import { getSignUpFetching } from '&front/domain/user/selectors/getSignUpFetching'
import { Input } from '&front/features/final-form'
import { pushRoute } from '&front/features/routing'
import { InputType } from '&front/ui/components/form/input/InputType'
import { Label } from '&front/ui/components/form/label'
import { LoadingButton } from '&front/ui/components/form/loading-button'
import { useErrorAlert } from '&front/ui/hooks/useErrorAlert'
import { Card } from '&front/ui/components/layout/card'
import { useTranslation } from '&front/domain/i18n'

import * as styles from '../SignForm.css'

interface Props {
  className?: string
}

export const SignUp = ({ className }: Props) => {
  const dispatch = useThunk()
  const { t } = useTranslation()

  const onSubmit = useCallback(async ({ email, password }) => {
    await dispatch(signUp(email, password))
    await pushRoute('/hello')
  }, [])

  const fetching = useMappedState(getSignUpFetching)
  useErrorAlert(fetching.error)

  return (
    <Form onSubmit={onSubmit}>
      {({ handleSubmit }) => (
        <form
          onSubmit={handleSubmit}
          className={cx(styles.container, className)}
        >
          <Card title={t('landing:sign-up')} className={styles.card}>
            <Label text={t('landing:email')}>
              <Input
                name="email"
                type={InputType.Email}
                placeholder="email@example.com"
              />
            </Label>

            <Label text={t('landing:password')}>
              <Input name="password" type={InputType.Password} />
            </Label>

            <Label text={t('landing:repeat-password')}>
              <Input name="password-repeat" type={InputType.Password} />
            </Label>

            <LoadingButton fethcing={fetching} submit>
              {t('landing:sign-up-action')}
            </LoadingButton>
          </Card>
        </form>
      )}
    </Form>
  )
}
