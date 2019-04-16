import { Pie } from 'react-chartjs-2'

import { getColor } from './helpers/getColor'
import { createOptions } from './helpers/createOptions'
import { useMemo } from 'react'

type Display = (value: number | string | undefined) => string
const defaultDisplay: Display = v => `${v}`

interface DataSet {
  name: string
  data: number
}

interface Props {
  dataSets: DataSet[]
  displayValue?: Display
  fitToContainer?: boolean
}

export const PieChart = ({
  dataSets,
  displayValue = defaultDisplay,
  fitToContainer = false,
}: Props) => {
  const data = useMemo(
    () => ({
      labels: dataSets.map(set => set.name),
      datasets: [
        {
          data: dataSets.map(set => set.data),
          backgroundColor: dataSets.map(set => getColor(set.name)),
          borderWidth: 0,
        },
      ],
    }),
    [dataSets],
  )

  return (
    <Pie data={data} options={createOptions(displayValue, !fitToContainer)} />
  )
}
