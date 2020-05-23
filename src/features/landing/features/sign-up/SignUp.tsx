import cx from 'classnames';
import React, { useCallback } from 'react';
import { Form } from 'react-final-form';
import { useMappedState } from 'redux-react-hook';
import { useRouter } from 'react-router5';

import { useThunk } from '&front/domain/store';
import { signUp } from '&front/domain/user/actions/signUp';
import { getSignUpFetching } from '&front/domain/user/selectors/getSignUpFetching';
import { Input } from '&front/features/final-form';
import { InputType } from '&front/ui/components/form/input/InputType';
import { Label } from '&front/ui/components/form/label';
import { LoadingButton } from '&front/ui/components/form/loading-button';
import { Card } from '&front/ui/components/layout/card';
import { useErrorAlert } from '&front/ui/hooks/useErrorAlert';
import { Route } from '&front/app/router';

import * as styles from '../SignForm.css';

interface Props {
  className?: string;
}

export const SignUp = ({ className }: Props) => {
  const dispatch = useThunk();
  const { navigate } = useRouter();

  const onSubmit = useCallback(async ({ email, password }) => {
    await dispatch(signUp(email, password));
    navigate(Route.Hello);
  }, []);

  const fetching = useMappedState(getSignUpFetching);
  useErrorAlert(fetching.error);

  return (
    <Form onSubmit={onSubmit}>
      {({ handleSubmit }) => (
        <form
          onSubmit={handleSubmit}
          className={cx(styles.container, className)}
        >
          <Card title="Регистрация" className={styles.card}>
            <Label text="Email">
              <Input
                name="email"
                type={InputType.Email}
                placeholder="email@example.com"
              />
            </Label>

            <Label text="Пароль">
              <Input name="password" type={InputType.Password} />
            </Label>

            <Label text="Пароль еще раз">
              <Input name="password-repeat" type={InputType.Password} />
            </Label>

            <LoadingButton fethcing={fetching} submit>
              Зарегистрироваться
            </LoadingButton>
          </Card>
        </form>
      )}
    </Form>
  );
};
