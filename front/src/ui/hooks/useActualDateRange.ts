import { useState, useMemo } from 'react'

export const useActualDateRange = (
  initialFrom: Date,
  initialTo: Date,
  transfromFrom: (from: Date, to: Date) => Date,
  transfromTo: (to: Date, from: Date) => Date,
) => {
  const [from, setFrom] = useState(initialFrom)
  const [to, setTo] = useState(initialTo)

  const [actualFrom, actualTo] = useMemo(
    () => [transfromFrom(from, to), transfromTo(to, from)],
    [from, to, transfromFrom, transfromTo],
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
