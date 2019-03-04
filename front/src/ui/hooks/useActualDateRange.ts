import { useState } from 'react'
import { useMemo } from 'react'

export const useActualDateRange = (
  initialFrom: Date,
  initialTo: Date,
  transfromFrom: (from: Date, to: Date) => Date,
  transfromTo: (to: Date, from: Date) => Date,
) => {
  const [from, setFrom] = useState(transfromFrom(initialFrom, initialTo))
  const [to, setTo] = useState(transfromTo(initialTo, initialFrom))

  const [actualFrom, actualTo] = useMemo(
    () => [transfromFrom(from, to), transfromTo(to, from)],
    [from, to],
  )

  return {
    from,
    to,
    setFrom,
    setTo,
    actualFrom,
    actualTo,
  }
}
