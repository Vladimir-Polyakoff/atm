export default (userAmount, count) => {
  const moneyCount = count
  const received = {}
  let amount = userAmount

  function myWhile () {
    check()

    if (amount) {
      return { error: 'Запросите другую сумму, остаток - ' + amount }
    }
  }
  myWhile()

  function check () {
    for (const money of moneyCount.sorted) {
      if (moneyCount[money] && amount >= money) {
        set(money)

        check()

        return
      }
      if (!amount) return
    }
  }

  function set (money) {
    amount -= money
    received[money] ? received[money]++ : received[money] = 1
    moneyCount[money]--
  }

  console.log({ received })
  return { received }
}
