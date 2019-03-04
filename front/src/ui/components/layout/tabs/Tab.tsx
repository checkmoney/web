import { Tabs as AntTabs } from 'antd'

import { TabProps } from './TabProps'

export const Tab = ({ title, children }: TabProps) => (
  <AntTabs.TabPane tab={title} key={title}>
    {children}
  </AntTabs.TabPane>
)
