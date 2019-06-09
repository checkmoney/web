import { flatten, uniq } from 'lodash'
import { Bar } from 'react-chartjs-2'
import React, { useMemo } from 'react'

import { createOptions } from './helpers/createOptions'
import { getColor } from './helpers/getColor'

interface Data {
  [key: string]: {
    label: string
    value: number
  }
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
          label: dataSets[index].data[name].label,
          data: dataSets.map(set => set.data[name].value),
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
