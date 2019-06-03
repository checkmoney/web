import { Statistic, Icon } from 'antd'
import { Option } from 'tsoption'

import { useTranslation } from '$front/domain/i18n'

interface Props {
  title: string
  value: Option<number>
  suffix?: string
  decreaseIsGood?: boolean
}

export const Stat = ({
  title,
  value,
  suffix,
  decreaseIsGood = false,
}: Props) => {
  if (value.nonEmpty()) {
    const positive = value.get() > 0

    const green = !decreaseIsGood ? positive : !positive

    const color = green ? '#3f8600' : '#cf1322'
    const iconType = positive ? 'arrow-up' : 'arrow-down'

    return (
      <Statistic
        title={title}
        value={Math.abs(value.get())}
        precision={2}
        valueStyle={{ color }}
        prefix={<Icon type={iconType} />}
        suffix={suffix}
      />
    )
  }

  const { t } = useTranslation()

  return (
    <Statistic
      title={`${title}, ${t('common:ui.no-data')}`}
      value={0}
      precision={2}
      suffix={suffix}
    />
  )
}
