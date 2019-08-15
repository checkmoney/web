import React from 'react';

import { ExternalLink } from '&front/ui/components/controls/external-link';
import { Card } from '&front/ui/components/layout/card';
import { TipModel } from '&shared/models/mind/TipModel';

import { DismissButton } from '../components/dismiss-button';
import { CustomMeta } from './CustomMeta';

interface Props {
  tip: TipModel<CustomMeta>;
}

export const Custom = ({ tip: { meta, token } }: Props) => {
  const { title, text, link, important } = meta;

  const actions = !!link && <ExternalLink href={link}>Open</ExternalLink>;
  const dismiss = !important && <DismissButton token={token} />;

  return (
    <Card title={title} extra={dismiss} actions={[actions].filter(Boolean)}>
      {text}
    </Card>
  );
};
