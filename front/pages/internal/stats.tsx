import { startOfMonth, endOfMonth } from 'date-fns';
import * as React from 'react';

import { AppContext } from '&front/domain/AppContext';
import { pageWithTranslation, Namespace } from '&front/domain/i18n';
import { fetchFirstTransactionDate } from '&front/domain/money/actions/fetchFirstTransactionDate';
import { fetchStatsCategories } from '&front/domain/money/actions/fetchStatsCategories';
import { fetchStatsDynamics } from '&front/domain/money/actions/fetchStatsDynamics';
import { fetchStatsSources } from '&front/domain/money/actions/fetchStatsSources';
import { getDefaultCurrency } from '&front/domain/user/selectors/getDefaultCurrency';
import { Statistics } from '&front/features/statistics';
import { wantUTC } from '&front/helpers/wantUTC';
import { GroupBy } from '&shared/enum/GroupBy';

class StatsPage extends React.Component {
  public static isSecure = true;

  public static async getInitialProps({ reduxStore }: AppContext) {
    const from = wantUTC(startOfMonth)(new Date());
    const to = wantUTC(endOfMonth)(new Date());
    const currency = getDefaultCurrency(reduxStore.getState());

    await Promise.all([
      reduxStore.dispatch(fetchFirstTransactionDate() as any),
      reduxStore.dispatch(fetchStatsSources(from, to, currency) as any),
      reduxStore.dispatch(fetchStatsCategories(from, to, currency) as any),
      reduxStore.dispatch(fetchStatsDynamics(
        from,
        to,
        GroupBy.Month,
        currency,
      ) as any),
    ]);

    return {};
  }

  public render() {
    return <Statistics />;
  }
}

export default pageWithTranslation([
  Namespace.History,
  Namespace.Months,
  Namespace.Stats,
  Namespace.Currency,
])(StatsPage);
