import { flatten } from 'lodash';
import { NextAppContext } from 'next/app';
import React, { Component } from 'react';
import { ComponentType } from 'react';

import { I18nProvider } from './I18nProvider';
import { Namespace } from './Namespace';

export const pageWithTranslation = (namespaces: Namespace | Namespace[]) => (
  Page: ComponentType,
) => {
  const namespacesRequired = [...flatten([namespaces]), Namespace.Common];

  return class PageWithTranslation extends Component {
    public static async getInitialProps(appContext: NextAppContext) {
      let appProps = {};
      if (typeof (Page as any).getInitialProps === 'function') {
        appProps = await (Page as any).getInitialProps(appContext);
      }

      return {
        ...appProps,
        namespacesRequired,
      };
    }

    public render() {
      return (
        <I18nProvider namespaces={namespacesRequired}>
          <Page {...this.props} />
        </I18nProvider>
      );
    }
  };
};
