import * as React from 'react';

import { Namespace, pageWithTranslation } from '&front/domain/i18n';
import { Landing } from '&front/features/landing';

class IndexPage extends React.Component {
  public render() {
    return <Landing />;
  }
}

export default pageWithTranslation(Namespace.Landind)(IndexPage);
