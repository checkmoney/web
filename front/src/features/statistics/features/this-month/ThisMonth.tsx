import { Card } from '@front/ui/components/layout/card'
import { Stat } from '@front/ui/components/chart/stat'

import * as styles from './ThisMonth.css'

interface Props {
  className?: string
}

export const ThisMonth = ({ className }: Props) => (
  <Card title="This month" className={className}>
    <p>Compared to the average month (fake data, sorry)</p>

    <div className={styles.diff}>
      <Stat title="Income" value={23} suffix="%" />
      <Stat title="Outcome" value={-12} suffix="%" />
    </div>
  </Card>
)
