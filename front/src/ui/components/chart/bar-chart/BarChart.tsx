import { capitalize, flatten, uniq } from 'lodash'
import { Bar } from 'react-chartjs-2'
import { useMemo } from 'react'

import { createOptions } from './helpers/createOptions'
import { getColor } from './helpers/getColor'

interface Data {
  [key: string]: number
}

interface DataSet {
  name: string
  data: Data
}

type Display = (value: number | string | undefined) => string
const defaultDisplay: Display = v => `${v}`

interface Props {
  dataSets: DataSet[]
  displayValue?: Display
  fitToContainer?: boolean
}

export const BarChart = ({
  dataSets,
  displayValue = defaultDisplay,
  fitToContainer = false,
}: Props) => {
  const data = useMemo(
    () => ({
      labels: uniq(flatten(dataSets.map(set => set.name))),
      datasets: uniq(flatten(dataSets.map(set => Object.keys(set.data)))).map(
        (name, index) => ({
          label: capitalize(name),
          data: dataSets.map(set => set.data[name]),
          backgroundColor: getColor(index),
        }),
      ),
    }),
    [dataSets],
  )

  return (
    <Bar data={data} options={createOptions(displayValue, !fitToContainer)} />
  )
}
