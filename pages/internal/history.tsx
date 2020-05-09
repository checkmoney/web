import * as React from 'react';

import { AppContext } from '&front/domain/AppContext';
import { pageWithTranslation, Namespace } from '&front/domain/i18n';
import { fetchFirstTransactionDate } from '&front/domain/money/actions/fetchFirstTransactionDate';
import { History } from '&front/features/history';

class HisotryPage extends React.Component {
  public static isSecure = true;

  public static async getInitialProps({ reduxStore }: AppContext) {
    await reduxStore.dispatch(fetchFirstTransactionDate() as any);

    return {};
  }

  public render() {
    return <History />;
  }
}

export default pageWithTranslation([
  Namespace.Transaction,
  Namespace.History,
  Namespace.Months,
])(HisotryPage);
