import { useCallback } from 'react'

import { Card } from '@front/ui/components/layout/card'
import { Button, ButtonType } from '@front/ui/components/form/button'
import { useThunk } from '@front/domain/store'

import * as styles from './Merge.css'
import { disableTips } from '@front/domain/mind/actions/disableTips'
import { mergeTypos } from '@front/domain/mind/actions/mergeTypos'

interface Props {
  token: string
  variants: string[]
  target: string
}

export const Merge = ({ token, variants, target }: Props) => {
  const dispatch = useThunk()

  const onDismiss = useCallback(() => dispatch(disableTips([token])), [token])

  const createOnMerge = useCallback(
    (mainVariant: string) => {
      const otherVaraints = variants.filter(varinat => varinat !== mainVariant)

      return () => dispatch(mergeTypos(token, mainVariant, otherVaraints))
    },
    [variants, token],
  )

  return (
    <div className={styles.card}>
      <Card
        title={`Possible typo in ${target}`}
        extra={
          <Button type={ButtonType.Text} onClick={onDismiss}>
            Dismiss
          </Button>
        }
        actions={variants.map(variant => (
          <Button
            type={ButtonType.Text}
            key={variant}
            onClick={createOnMerge(variant)}
          >
            {variant}
          </Button>
        ))}
      >
        We found possible typos in some transaction. Please, choose correct or
        dismiss this tip.
      </Card>
    </div>
  )
}
