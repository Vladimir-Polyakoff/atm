export default obj => {
  const result = []

  for (const key in obj) {
    const count = obj[key].count
    if (count) {
      for (let i = 0; i < count; ++i) {
        result.push(obj[key].value)
      }
    }
  }

  return result
}
