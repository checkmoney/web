import { Button, ButtonType } from '@front/ui/components/form/button'
import { pushRoute } from '@front/features/routing'

import * as styles from './FullHistoryButton.css'
import { useTranslation } from '@front/domain/i18n'

export const FullHistoryButton = () => {
  const { t } = useTranslation()

  return (
    <Button
      className={styles.button}
      onClick={() => pushRoute('/app/history')}
      type={ButtonType.Text}
    >
      {t('short-history:action')}
    </Button>
  )
}
