import { PageHeader as AntPageHeader } from 'antd'

import './AntPageHeader.css?CSSModulesDisable'

interface Props {
  onBack: () => void
  title: string
}

export const PageHeader = ({ onBack, title }: Props) => {
  return <AntPageHeader onBack={onBack} title={title} />
}
