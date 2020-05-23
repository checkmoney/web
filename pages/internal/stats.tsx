import * as React from 'react';

import { Statistics } from '&front/features/statistics';

class StatsPage extends React.Component {
  public static isSecure = true;

  public static async getInitialProps() {
    return {};
  }

  public render() {
    return <Statistics />;
  }
}

export default StatsPage;
