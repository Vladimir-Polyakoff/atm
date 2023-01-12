export default num => {
  // 23000 5000
  const dictionaryMoney = [5000, 1000, 500, 100, 50]

  const result = {
    list: [],
    // остаток
    remainder: 0
  }

  let i = 0
  while (i < dictionaryMoney.length) {
    if (num >= dictionaryMoney[i]) {
      num -= dictionaryMoney[i]
      result.list.push(dictionaryMoney[i])
    } else {
      i++
    }
  }
  result.remainder = num

  return result
}
