import { useState, useCallback } from 'react'
import { useMappedState } from 'redux-react-hook'

import { CurrencySwitch } from '$front/ui/components/controls/currency-switch'
import { Container } from '$front/ui/components/layout/container'
import { Tabs, Tab } from '$front/ui/components/layout/tabs'
import { GroupBy } from '$shared/enum/GroupBy'
import { getDefaultCurrency } from '$front/domain/user/selectors/getDefaultCurrency'
import { PageHeader } from '$front/ui/components/layout/page-header'
import { useTranslation } from '$front/domain/i18n'

import { Yearly } from './features/yearly'
import { Monthly } from './features/monthly'
import { Dynamics } from './features/dynamics'
import { Categories } from './features/categories'
import { Sources } from './features/sources'
import * as styles from './Statistics.css'
import { pushRoute } from '../routing'

const columnWidthPercent = 40
const maxLength = 5

export const Statistics = () => {
  const defaultCurrency = useMappedState(getDefaultCurrency)
  const [currency, setCurrency] = useState(defaultCurrency)
  const { t } = useTranslation()

  const renderContent = useCallback(
    (title: string, group: GroupBy.Month | GroupBy.Year) => (
      <Tab title={title} className={styles.statistics}>
        <aside className={styles.aside}>
          <Dynamics group={group} currency={currency} />
          <Categories
            group={group}
            currency={currency}
            widthPercent={columnWidthPercent}
            maxLength={maxLength}
          />
          <Sources
            group={group}
            currency={currency}
            widthPercent={columnWidthPercent}
            maxLength={maxLength}
          />
        </aside>

        <div className={styles.charts}>
          {group === GroupBy.Month && <Monthly currency={currency} />}
          {group === GroupBy.Year && <Yearly currency={currency} />}
        </div>
      </Tab>
    ),
    [currency],
  )

  return (
    <Container>
      <PageHeader
        title={t('common:nav.stats')}
        onBack={() => pushRoute('/app')}
      />

      <Tabs
        tabBarExtraContent={
          <CurrencySwitch currency={currency} updateCurrency={setCurrency} />
        }
      >
        {renderContent(t('stats:monthly'), GroupBy.Month)}
        {renderContent(t('stats:yearly'), GroupBy.Year)}
      </Tabs>
    </Container>
  )
}
