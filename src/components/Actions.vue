<template>
  <div v-if="showButtons && !error">
    <button @click="showAction('set')">Внести деньги</button>
    <button @click="showAction('get')">Снять деньги</button>
    <button @click="showAction('views')">Посмотреть баланс</button>
  </div>
  <div v-else-if="!showButtons && !error">
    <div></div>
    <div v-if="actions.get">
      <div>Введите сумму</div>
      <div class="amount">{{ amount | price}}</div>
    </div>
    <div v-if="actions.views">
      <div>Ваш баланс на {{ getDateNow }}г.</div>
      {{ balance | price }} руб.
    </div>
  </div>
  <div class="error" v-else-if="error">{{ error }}</div>
</template>

<script>
// import price from '@/halpers/filters.js'
import getMoney from '@/halpers/getMoney.js'

export default {
  name: 'TheActions',
  props: {
    balance: {
      type: Number,
      required: true
    },
    moneyList: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      showButtons: true,
      actions: {
        get: false,
        set: false,
        views: false
      },
      moneyCount: {
        all: 0,
        sorted: []
      },
      amount: '',
      error: ''
    }
  },
  // computed: {
  //   getPrice () {
  //     return price
  //   }
  // },
  computed: {
    getDateNow () {
      const now = new Date()
      const date = now.getDate()
      const month = now.getMonth() + 1

      return `${date < 10 ? '0' + date : date}.${month < 10 ? '0' + month : month}.${now.getFullYear()}`
    }
  },
  watch: {
    showButtons (v) {
      if (v) {
        for (const key in this.actions) {
          this.actions[key] = false
        }
        this.clear()
      }
      this.$emit('showFooter', !v)
    },
    moneyList (v) {
      this.checkAtm(v)
    }
  },
  created () {
    if (this.moneyList.length) {
      this.checkAtm(this.moneyList)
    } else {
      this.error = 'В банкомате нет денег'
      this.$emit('showFooter', true)
    }
  },
  methods: {
    showAction (key) {
      this.actions[key] = true
      this.showButtons = false
    },
    showActions () {
      this.showButtons = true
    },
    set (num) {
      if (this.actions.views) {
        return
      }
      this.amount += num
    },
    del () {
      if (this.actions.views) {
        return
      }
      if (this.amount) {
        this.amount = this.amount.slice(0, -1)
      }
    },
    checkAtm (arr) {
      this.moneyCount = {
        all: arr.reduce((accum, element) => accum + element, 0),
        sorted: [...new Set(arr)].sort((a, b) => b - a)
      }

      arr.forEach(element => {
        this.moneyCount[element] ? this.moneyCount[element]++ : this.moneyCount[element] = 1
      })
    },
    validMoney (amount) {
      if (amount > this.moneyCount.all) {
        this.error = 'недостаточно средств в банкомате'
        return false
      }
      if (amount > this.balance) {
        this.error = 'недостаточно средств на карте'
        return false
      }
      return true
    },
    ok () {
      if (this.actions.get && this.validMoney(Number(this.amount))) {
        const result = getMoney(Number(this.amount), this.moneyCount)

        if (result.error) {
          this.error = result.error
        } else {
          this.$emit('update', result)
          this.actions.get = false
          this.clear()
        }
      }
    },
    clear () {
      this.amount = ''
      this.error = ''
    }
  }
}
</script>

<style scoped lang="scss">
  div {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }
  button {
    background: rgba(204, 204, 204, 0.378);
    padding: 10px;
    &:active  {
      scale: 1.1;
    }
  }
  .amount {
    font-size: 20px;
    margin-inline: auto;
  }
</style>
