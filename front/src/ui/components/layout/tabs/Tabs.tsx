import { Tabs as AntTabs } from 'antd'
import { ReactElement, useMemo } from 'react'
import { head } from 'lodash'

import { TabProps } from './TabProps'

interface Props {
  children: Array<ReactElement<TabProps>>
  className?: string
}

export const Tabs = ({ children, className }: Props) => {
  const defaultActiveKey = useMemo(() => {
    const firstChild = head(children)

    return firstChild ? firstChild.props.title : undefined
  }, [children])

  return (
    <AntTabs defaultActiveKey={defaultActiveKey} className={className}>
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
