import { ChartOptions } from 'chart.js'

const FALLBACK_LABEL = 'Unknown'

export const createOptions = (
  displayValue: (value: number | string | undefined) => string,
  maintainAspectRatio = true,
): ChartOptions => ({
  tooltips: {
    callbacks: {
      label: ({ datasetIndex = 0, index = 0 }, { labels, datasets }) => {
        if (!labels || !datasets) {
          return FALLBACK_LABEL
        }

        const label = labels[index]

        const { data } = datasets[datasetIndex]

        if (!data) {
          return FALLBACK_LABEL
        }

        const value = data[index]

        if (typeof value !== 'number') {
          return FALLBACK_LABEL
        }

        const formattedValue = displayValue(value)
        return ` ${label}: ${formattedValue}`
      },
    },
  },
  legend: {
    position: maintainAspectRatio ? 'bottom' : 'right',
  },
  maintainAspectRatio,
})
