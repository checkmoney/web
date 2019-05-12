import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { Option } from 'tsoption'
import useMedia from 'use-media'
import { useMappedState } from 'redux-react-hook'
import { useState, useMemo } from 'react'
import { sortBy } from 'lodash'

import { GroupBy } from '@shared/enum/GroupBy'
import { Container } from '@front/ui/components/layout/container'
import { getStatsCategoriesFetchingStatus } from '@front/domain/money/selectors/getStatsCategoriesFetchingStatus'
import { useMemoState, State, ExtraArg } from '@front/domain/store'
import { getDefaultCurrency } from '@front/domain/user/selectors/getDefaultCurrency'
import { PageHeader } from '@front/ui/components/layout/page-header'
import { Loader } from '@front/ui/components/layout/loader'
import { displayMoney } from '@shared/helpers/displayMoney'
import { PieChart } from '@front/ui/components/chart/pie-chart'
import { pushRoute } from '@front/features/routing'
import { Currency } from '@shared/enum/Currency'
import { Api } from '@front/domain/api'

import { PeriodChooser } from './features/period-chooser'
import { useDateRange } from './helpers/useDateRange'
import * as styles from './Detail.css'

interface Data {
  name: string
  data: number
}

interface Props<T> {
  group?: GroupBy
  detailType: string
  detailTitle: string
  fetchData: (
    from: Date,
    to: Date,
    currency: Currency,
  ) => (
    dispatch: ThunkDispatch<State, ExtraArg, AnyAction>,
    getState: () => State,
    createApi: (token: Option<string>) => Api,
  ) => Promise<void>
  getData: (
    from: Date,
    to: Date,
    currency: Currency,
  ) => (state: State) => Option<T[]>
  toAmount: (item: T) => number
  toData: (item: T) => Data
}

export const Detail = <T extends object = any>({
  group,
  detailType,
  detailTitle,
  fetchData,
  getData,
  toAmount,
  toData,
}: Props<T>) => {
  const fetching = useMappedState(getStatsCategoriesFetchingStatus)
  const currency = useMappedState(getDefaultCurrency)
  const isSmall = useMedia({ maxWidth: 768 })

  const [previousPeriodNumber, setPreviousPeriodNumber] = useState(0)

  const { from, to } = useDateRange(previousPeriodNumber, group)

  const stats = useMemoState(
    () => getData(from, to, currency),
    () => fetchData(from, to, currency),
    [from, to, currency],
  )

  const preparedData = useMemo(
    () => stats.map(s => sortBy(s, t => -toAmount(t)).map(toData)),
    [stats],
  )

  return (
    <Container>
      <PageHeader title={detailTitle} onBack={() => pushRoute('/app/stats')} />

      <section className={styles.categories}>
        <aside className={styles.aside}>
          <PeriodChooser
            setPreviousPeriodNumber={setPreviousPeriodNumber}
            previousPeriodNumber={previousPeriodNumber}
            detailType={detailType}
            from={from}
            to={to}
            group={group}
          />
        </aside>

        <div className={styles.chart}>
          <Loader status={fetching}>
            {preparedData.nonEmpty() && (
              <PieChart
                dataSets={preparedData.get()}
                displayValue={value =>
                  displayMoney(currency)(value, { withPenny: false })
                }
                fitToContainer={isSmall}
              />
            )}
          </Loader>
        </div>
      </section>
    </Container>
  )
}
