import React, { useCallback } from 'react';
import { useStore } from 'effector-react';
import { Form } from 'react-final-form';
import { Option } from 'tsoption';
import cx from 'classnames';

import { Input } from '&front/features/final-form';
import { InputType } from '&front/ui/components/form/input/InputType';
import { Label } from '&front/ui/components/form/label';
import { Button } from '&front/presentation/atoms/button';
import { Card } from '&front/ui/components/layout/card';
import { signUpFx } from '&front/application/login';

import * as styles from './SignForm.css';

interface Props {
  className?: string;
}

export const SignUp = ({ className }: Props) => {
  const onSubmit = useCallback(
    ({ email, password }) => signUpFx({ email, password }),
    [],
  );

  const isLoading = useStore(signUpFx.pending);

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

            <Button loading={isLoading} mod="primary" type="submit">
              Зарегистрироваться
            </Button>
          </Card>
        </form>
      )}
    </Form>
  );
};
