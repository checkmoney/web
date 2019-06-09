import React from 'react'

import { TipModel } from '@shared/models/mind/TipModel'
import { Card } from '@front/ui/components/layout/card'
import { ExternalLink } from '@front/ui/components/controls/external-link'

import { CustomMeta } from './CustomMeta'
import { DismissButton } from '../components/dismiss-button'

interface Props {
  tip: TipModel<CustomMeta>
}

export const Custom = ({ tip: { meta, token } }: Props) => {
  const { title, text, link, important } = meta

  const actions = !!link && <ExternalLink href={link}>Open</ExternalLink>
  const dismiss = !important && <DismissButton token={token} />

  return (
    <Card title={title} extra={dismiss} actions={[actions].filter(Boolean)}>
      {text}
    </Card>
  )
}
