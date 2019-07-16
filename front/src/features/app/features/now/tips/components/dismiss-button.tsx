import React, { useCallback } from 'react'

import { Button, ButtonType } from '$front/ui/components/form/button'
import { useThunk } from '$front/domain/store'
import { disableTips } from '$front/domain/mind/actions/disableTips'
import { useTranslation } from '$front/domain/i18n'

interface Props {
  token: string
}

export const DismissButton = ({ token }: Props) => {
  const dispatch = useThunk()
  const { t } = useTranslation()

  const onDismiss = useCallback(() => dispatch(disableTips([token])), [token])

  return (
    <Button type={ButtonType.Text} onClick={onDismiss}>
      {t('tips:dismiss')}
    </Button>
  )
}
