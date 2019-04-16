import { useCallback } from 'react'

import { Card } from '@front/ui/components/layout/card'
import { Button, ButtonType } from '@front/ui/components/form/button'
import { useThunk } from '@front/domain/store'

import { mergeTypos } from '@front/domain/mind/actions/mergeTypos'
import { DismissButton } from './dismiss-button'

interface Props {
  token: string
  variants: string[]
  target: string
}

export const Merge = ({ token, variants, target }: Props) => {
  const dispatch = useThunk()

  const createOnMerge = useCallback(
    (mainVariant: string) => {
      const merge = {
        primary: mainVariant,
        secondary: variants.filter(varinat => varinat !== mainVariant),
      }

      return () => dispatch(mergeTypos(token, merge))
    },
    [variants, token],
  )

  return (
    <Card
      title={`Possible typo in ${target}`}
      extra={<DismissButton token={token} />}
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
  )
}
