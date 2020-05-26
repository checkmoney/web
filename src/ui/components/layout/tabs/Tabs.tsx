import { Tabs as AntTabs } from 'antd';
import { head } from 'lodash';
import React, { ReactElement, useMemo, ReactNode } from 'react';

import { TabProps } from './TabProps';

interface Props {
  children: Array<ReactElement<TabProps>>;
  className?: string;
  tabBarExtraContent?: ReactNode;
  defaultSelected?: string;
}

export const Tabs = ({
  children,
  className,
  tabBarExtraContent,
  defaultSelected,
  vertical = false,
}: Props) => {
  const defaultActiveKey = useMemo(() => {
    if (defaultSelected !== undefined) {
      return defaultSelected;
    }

    const firstChild = head(children);

    return firstChild ? firstChild.props.title : undefined;
  }, [children, defaultSelected]);

  const actualChildren = useMemo(() => {
    if (vertical) {
      return children.reverse();
    }

    return children;
  }, [vertical, children]);

  return (
    <AntTabs
      defaultActiveKey={defaultActiveKey}
      className={className}
      tabBarExtraContent={tabBarExtraContent}
      tabBarStyle={{ height: '45px' }}
    >
      {actualChildren.map((child) => (
        <AntTabs.TabPane
          key={child.props.title}
          tab={child.props.title}
          {...child.props}
        />
      ))}
    </AntTabs>
  );
};
