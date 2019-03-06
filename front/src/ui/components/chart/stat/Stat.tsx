import { Statistic, Icon } from 'antd'

interface Props {
  title: string
  value: number
  suffix?: string
}

export const Stat = ({ title, value, suffix }: Props) => {
  const positive = value > 0

  const color = positive ? '#3f8600' : '#cf1322'
  const iconType = positive ? 'arrow-up' : 'arrow-down'

  return (
    <Statistic
      title={title}
      value={Math.abs(value)}
      precision={2}
      valueStyle={{ color }}
      prefix={<Icon type={iconType} />}
      suffix={suffix}
    />
  )
}
