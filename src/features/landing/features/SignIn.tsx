import React, { useCallback } from 'react';
import { useStore } from 'effector-react';
import { useRouter } from 'react-router5';
import { Form } from 'react-final-form';
import { Option } from 'tsoption';
import cx from 'classnames';

import { Input } from '&front/features/final-form';
import { InputType } from '&front/ui/components/form/input/InputType';
import { Label } from '&front/ui/components/form/label';
import { Button } from '&front/presentation/atoms/button';
import { Card } from '&front/ui/components/layout/card';
import { Route } from '&front/application/router';
import { signInByPasswordFx } from '&front/application/login';

import * as styles from './SignForm.css';

interface Props {
  className?: string;
}

export const SignIn = ({ className }: Props) => {
  const { navigate } = useRouter();

  const onSubmit = useCallback(async ({ email, password }) => {
    await signInByPasswordFx({ email, password });
    navigate(Route.Dashboard);
  }, []);

  const isLoading = useStore(signInByPasswordFx.pending);

  const fetching = { loading: isLoading, error: Option.of<string>(null) };

  return (
    <Form onSubmit={onSubmit}>
      {({ handleSubmit }) => (
        <form
          onSubmit={handleSubmit}
          className={cx(styles.container, className)}
        >
          <Card title="Вход" className={styles.card}>
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

            <Button loading={isLoading} mod="primary" type="submit">
              Войти
            </Button>
          </Card>
        </form>
      )}
    </Form>
  );
};
