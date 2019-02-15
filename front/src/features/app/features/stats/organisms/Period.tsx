import { format } from 'date-fns'
import { ChangeEvent, useCallback } from 'react'

interface Props {
  start: Date
  updateStart: (newStart: Date) => void
  end: Date
  updateEnd: (newEnd: Date) => void
}

export const Period = ({ start, end, updateStart, updateEnd }: Props) => {
  const createHandle = useCallback(
    (update: (d: Date) => void) => ({
      target,
    }: ChangeEvent<HTMLInputElement>) => {
      if (target.value) {
        return update(new Date(target.value))
      }
    },
    [],
  )

  const formatForInput = useCallback(
    (date: Date) => format(date, 'YYYY-MM-DD'),
    [],
  )

  return (
    <>
      <label>
        <input
          type="date"
          value={formatForInput(start)}
          onChange={createHandle(updateStart)}
        />
        Start
      </label>

      <label>
        <input
          type="date"
          value={formatForInput(end)}
          onChange={createHandle(updateEnd)}
        />
        End
      </label>
    </>
  )
}
