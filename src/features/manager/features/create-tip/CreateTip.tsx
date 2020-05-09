import { addDays } from 'date-fns';
import React, { useCallback } from 'react';
import { Form } from 'react-final-form';

import { createTip } from '&front/domain/mind/actions/createTip';
import { useThunk } from '&front/domain/store';
import {
  Input,
  DatePicker,
  Checkbox,
  TextArea,
} from '&front/features/final-form';
import { Button } from '&front/ui/components/form/button';
import { Label } from '&front/ui/components/form/label';
import { Card } from '&front/ui/components/layout/card';
import { useNotifyAlert } from '&front/ui/hooks/useNotifyAlert';

import * as styles from './CreateTip.css';

export const CreateTip = () => {
  const dispatch = useThunk();
  const notify = useNotifyAlert();

  const onSubmit = useCallback(
    async (fields: any) => {
      await dispatch(createTip(fields));

      notify('Tip created');
    },
    [notify],
  );

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={{
        expireAt: addDays(new Date(), 10),
      }}
    >
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Card title="Create custom tip" className={styles.form}>
            <Label text="Title">
              <Input name="title" />
            </Label>

            <Label text="Content">
              <TextArea name="text" rows={4} />
            </Label>

            <Label text="Link">
              <Input name="link" placeholder="https://" />
            </Label>

            <Label text="Expire at">
              <DatePicker name="expireAt" />
            </Label>

            <Label text="Important" inside>
              <Checkbox name="important" />
            </Label>

            <Button submit>Create</Button>
          </Card>
        </form>
      )}
    </Form>
  );
};
