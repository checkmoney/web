import { Tabs as AntTabs } from 'antd'
import { ReactElement, useMemo, ReactNode } from 'react'
import { head } from 'lodash'

import { TabProps } from './TabProps'

interface Props {
  children: Array<ReactElement<TabProps>>
  className?: string
  tabBarExtraContent?: ReactNode
}

export const Tabs = ({ children, className, tabBarExtraContent }: Props) => {
  const defaultActiveKey = useMemo(() => {
    const firstChild = head(children)

    return firstChild ? firstChild.props.title : undefined
  }, [children])

  return (
    <AntTabs
      defaultActiveKey={defaultActiveKey}
      className={className}
      tabBarExtraContent={tabBarExtraContent}
    >
      {children.map(child => (
        <AntTabs.TabPane
          key={child.props.title}
          tab={child.props.title}
          {...child.props}
        />
      ))}
    </AntTabs>
  )
}
