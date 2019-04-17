import { GroupBy } from '@shared/enum/GroupBy'
import { Button, ButtonType } from '@front/ui/components/form/button'
import { Card } from '@front/ui/components/layout/card'
import { pushRoute } from '@front/features/routing'

interface Props {
  group?: GroupBy
}

export const GroupChooser = ({ group }: Props) => {
  const showYear = !group || group !== GroupBy.Year
  const showMonth = !group || group !== GroupBy.Month
  const showWhole = !!group

  return (
    <Card
      title={'Group'}
      actions={[
        showYear && (
          <Button
            onClick={() => pushRoute('/app/stats/categories/year')}
            type={ButtonType.Text}
          >
            Show year
          </Button>
        ),
        showMonth && (
          <Button
            onClick={() => pushRoute('/app/stats/categories/month')}
            type={ButtonType.Text}
          >
            Show month
          </Button>
        ),
        showWhole && (
          <Button
            onClick={() => pushRoute('/app/stats/categories')}
            type={ButtonType.Text}
          >
            Show all time
          </Button>
        ),
      ].filter(Boolean)}
    >
      {!!group && <p>You see data for one {group}</p>}
      {!group && <p>You see data for all time</p>}
    </Card>
  )
}
