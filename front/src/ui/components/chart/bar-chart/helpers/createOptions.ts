import { ChartOptions } from 'chart.js'
import { isUndefined } from 'lodash'

export const createOptions = (
  displayValue: (value: number | string | undefined) => string,
  maintainAspectRatio = true,
): ChartOptions => ({
  scales: {
    yAxes: [
      {
        ticks: {
          callback: v => `${displayValue(v)}`,
          beginAtZero: true,
        },
      },
    ],
  },
  tooltips: {
    mode: 'x',
    callbacks: {
      label: (item, data) => {
        if (!isUndefined(data.datasets) && !isUndefined(item.datasetIndex)) {
          return `${data.datasets[item.datasetIndex].label}: ${displayValue(
            item.yLabel,
          )}`
        }

        return displayValue(item.yLabel)
      },
    },
  },
  layout: {
    padding: {
      top: 16,
      bottom: 16,
    },
  },
  legend: {
    position: 'bottom',
  },
  responsive: true,
  maintainAspectRatio,
})
