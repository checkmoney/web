import * as React from 'react';

import { History } from '&front/features/history';

class HisotryPage extends React.Component {
  public static isSecure = true;

  public static async getInitialProps() {
    return {};
  }

  public render() {
    return <History />;
  }
}

export default HisotryPage;
