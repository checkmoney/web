import React from 'react';
import { useStore } from 'effector-react';
import { Form, Field } from 'react-final-form';
import cx from 'classnames';

import { Button, Input, Label } from '&front/presentation/atoms';
import { Card } from '&front/legacy_ui/components/layout/card';
import { signInByPasswordFx } from '&front/application/login';

import * as styles from './SignForm.css';

interface Props {
  className?: string;
}

export const SignIn = ({ className }: Props) => {
  const isLoading = useStore(signInByPasswordFx.pending);

  return (
    <Form onSubmit={signInByPasswordFx}>
      {({ handleSubmit }) => (
        <form
          onSubmit={handleSubmit}
          className={cx(styles.container, className)}
        >
          <Card title="Вход" className={styles.card}>
            <Field name="email">
              {({ input }) => (
                <Label text="Email">
                  <Input
                    {...input}
                    type="email"
                    placeholder="email@example.com"
                  />
                </Label>
              )}
            </Field>

            <Field name="password">
              {({ input }) => (
                <Label text="Пароль">
                  <Input {...input} type="password" />
                </Label>
              )}
            </Field>

            <Button loading={isLoading} mod="primary" type="submit">
              Войти
            </Button>
          </Card>
        </form>
      )}
    </Form>
  );
};
