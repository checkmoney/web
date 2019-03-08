import { Statistic, Icon } from 'antd'
import { Option } from 'tsoption'

interface Props {
  title: string
  value: Option<number>
  suffix?: string
}

export const Stat = ({ title, value, suffix }: Props) => {
  if (value.nonEmpty()) {
    const positive = value.get() > 0

    const color = positive ? '#3f8600' : '#cf1322'
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

  return (
    <Statistic
      title={`${title}, no data`}
      value={0}
      precision={2}
      suffix={suffix}
    />
  )
}
