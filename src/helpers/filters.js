export const price = int => {
  const str = String(int)
  if (str.length < 4) {
    return str
  }

  let res = ''
  for (let j = 0, i = str.length - 1; i >= 0; --i) {
    if (j && j % 3 === 0) {
      res += ' '
      res += str[i]
      j++
    } else {
      res += str[i]
      j++
    }
  }
  return res.split('').reverse().join('')
}
