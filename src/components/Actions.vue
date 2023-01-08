<template>
  <div v-if="showButtons">
    <button @click="showAction('set')">Внести деньги</button>
    <button @click="showAction('get')">Снять деньги</button>
    <button @click="showAction('views')">Посмотреть баланс</button>
  </div>
  <div v-else>
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
</template>

<script>
// import price from '@/halpers/filters.js'

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
      amount: ''
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
      }
      this.$emit('showFooter', !v)
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
