import { Card } from '@front/ui/components/layout/card'
import { Stat } from '@front/ui/components/chart/stat'

import * as styles from './Dynamics.css'
import { GroupBy } from '@shared/enum/GroupBy'
import { format } from 'date-fns'

interface Props {
  className?: string
  group: GroupBy.Month | GroupBy.Year
}

export const Dynamics = ({ className, group }: Props) => {
  const period =
    group === GroupBy.Month
      ? format(new Date(), 'MMMM YYYY')
      : format(new Date(), 'YYYY')

  return (
    <Card title={period} className={className}>
      <p>Compared to the average {group} (fake data, sorry)</p>

      <div className={styles.diff}>
        <Stat title="Income" value={23} suffix="%" />
        <Stat title="Outcome" value={-12} suffix="%" />
      </div>
    </Card>
  )
}
