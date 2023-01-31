<script>
import checkAmountAuto from '@/helpers/checkAmountAuto.js'
import checkAmountHand from '@/helpers/checkAmountHand.js'

export default {
  name: 'ActionSet',
  data () {
    return {
      amount: '',
      selected: '',
      depositList: [
        {
          value: 5000,
          count: 0
        },
        {
          value: 1000,
          count: 0
        },
        {
          value: 500,
          count: 0
        },
        {
          value: 100,
          count: 0
        },
        {
          value: 50,
          count: 0
        }
      ]
    }
  },
  computed: {
    depositAmount () {
      const result = []

      for (const key in this.depositList) {
        const count = this.depositList[key].count

        if (count) {
          for (let i = 0; i < count; ++i) {
            result.push(this.depositList[key].value)
          }
        }
      }

      return !result.length ? 0 : result.reduce((acum, num) => acum + num, 0)
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
        this.$emit('setSummFromAuto', checkAmountAuto(Number(this.amount)))
        this.clear()
      }
      if (this.selected === 'купюра') {
        this.$emit('setSummFromHand', checkAmountHand(this.depositList))
        this.clear()
      }
    },
    clear () {
      this.amount = ''
      this.selected = ''
      for (const key in this.depositList) {
        this.depositList[key].count = 0
      }
    },
    decriment (index) {
      if (this.depositList[index].count > 0) {
        this.depositList[index].count--
      }
    },
    incriment (index) {
      this.depositList[index].count++
    }
  }
}
</script>

<template>
  <div class="actions">
    <div class="buttons" v-if="!selected">
      <button @click="selected = 'купюра'">выбрать купюры
      </button>
      <button @click="selected = 'сумма'">выбрать сумму</button>
    </div>
    <div>
      <div v-if="selected === 'купюра'">
        <div class="amount"
        v-if="depositAmount">{{ depositAmount | price }}</div>
        <div class="deposit"
          v-for="(deposit, index) in depositList"        :key="deposit.value">
          <span @click="decriment(index)">-</span>
          <span>{{ deposit.value }}</span>
          <span>{{ deposit.count }}</span>
          <span @click="incriment(index)">+</span>
        </div>
      </div>
      <div v-if="selected === 'сумма'">
        <div>Введите сумму</div>
        <div class="amount">{{ amount | price}}</div>
      </div>
    </div>
  </div>
</template>

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
  .amount .deposit {
    font-size: 20px;
    margin-inline: auto;
  }
  span {
    display: inline-block;
    width: 50px;
    padding:10px 0;
    margin: 14px;
    border: 1px solid #CCC;
    font-size: 18px;
    font-weight: 500;
    &:active {
      scale: 1.1;
    }
  }
</style>
