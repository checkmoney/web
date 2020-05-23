import * as React from 'react';

import { App } from '&front/features/app';

class AppPage extends React.Component {
  public static isSecure = true;

  public static async getInitialProps() {
    return {};
  }

  public render() {
    return <App />;
  }
}

export default AppPage;
