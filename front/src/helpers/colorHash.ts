export function colorHash(inputString: string) {
  let sum = 0

  for (const i of inputString) {
    sum += i.charCodeAt(0)
  }

  const r = Math.abs(~~(Math.sin(sum + 1) * 256))
  const g = Math.abs(~~(Math.sin(sum + 2) * 256))
  const b = Math.abs(~~(Math.sin(sum + 3) * 256))

  let hex = '#'

  hex += `00${r.toString(16)}`.substr(-2, 2).toUpperCase()
  hex += `00${g.toString(16)}`.substr(-2, 2).toUpperCase()
  hex += `00${b.toString(16)}`.substr(-2, 2).toUpperCase()

  return hex
}
