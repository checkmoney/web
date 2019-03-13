import { Button, ButtonType } from '@front/ui/components/form/button'
import { pushRoute } from '@front/features/routing'

import * as styles from './FullHistoryButton.css'

export const FullHistoryButton = () => {
  return (
    <Button
      className={styles.button}
      onClick={() => pushRoute('/app/history')}
      type={ButtonType.Text}
    >
      Full history
    </Button>
  )
}
