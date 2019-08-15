import { Tabs as AntTabs } from 'antd';
import React from 'react';

import { TabProps } from './TabProps';

export const Tab = ({ title, children, className }: TabProps) => (
  <AntTabs.TabPane tab={title} key={title} className={className}>
    {children}
  </AntTabs.TabPane>
);
