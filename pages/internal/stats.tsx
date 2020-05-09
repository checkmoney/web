import * as React from 'react';

import { AppContext } from '&front/domain/AppContext';
import { pageWithTranslation, Namespace } from '&front/domain/i18n';
import { fetchFirstTransactionDate } from '&front/domain/money/actions/fetchFirstTransactionDate';
import { Statistics } from '&front/features/statistics';

class StatsPage extends React.Component {
  public static isSecure = true;

  public static async getInitialProps({ reduxStore }: AppContext) {
    await reduxStore.dispatch(fetchFirstTransactionDate() as any);

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
