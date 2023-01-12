<template>
  <div class="actions">
    <div class="buttons" v-if="!selected">
      <button>выбрать купюры</button>
      <button @click="selected = 'сумма'">выбрать сумму</button>
    </div>
    <div>
      <div v-if="selected === 'сумма'">
        <div>Введите сумму</div>
        <div class="amount">{{ amount | price}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import checkAmount from '@/helpers/checkAmount.js'

export default {
  name: 'ActionSet',
  data () {
    return {
      amount: '',
      selected: ''
    }
  },
  methods: {
    back () {
      !this.selected
        ? this.$emit('back')
        : this.selected = ''
    },
    set (num) {
      if (this.selected === 'сумма') {
        this.amount += num
      }
    },
    del () {
      if (this.amount) {
        this.amount = this.amount.slice(0, -1)
      }
    },
    ok () {
      if (this.selected === 'сумма') {
        this.$emit('setSummFromAuto', checkAmount(Number(this.amount)))
        this.clear()
      }
    },
    clear () {
      this.amount = ''
      this.selected = ''
    }
  }

}
</script>

<style scoped lang="scss">
  .actions, .buttons {
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
