import { useMemo } from 'react'

import { useMemoState } from '@front/domain/store'
import { getTips } from '@front/domain/mind/selectors/getTips'
import { fetchTips } from '@front/domain/mind/actions/fetchTips'
import { getTipComponent } from './tips/getTipComponent'

interface Props {
  className?: string
}

export const Now = ({ className }: Props) => {
  const tips = useMemoState(() => getTips, () => fetchTips(), [])

  const components = useMemo(
    () =>
      tips.map(tip => {
        const Component = getTipComponent(tip)

        return <Component tip={tip} key={tip.token} />
      }),
    [tips],
  )

  return <div className={className}>{components}</div>
}
