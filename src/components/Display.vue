<template>
  <div class="display">
    <transition name="fade" v-if="error">
      <div class="error">{{ error }}</div>
    </transition>
    <transition name="fade" v-if="successMessage">
      <div class="success">{{ successMessage }}</div>
    </transition>
    <button
      v-if="hasCard"
      @click="hasCard = false, showPin = true"
    >Вставить карту</button>
    <PinCode
      ref="PinCode"
      v-if="showPin"
      :card="card"
      @setError="err => error = err"
      @success="showPin = false, showActions = true"
    />
    <Actions
      v-if="showActions"
      ref="Actions"
      :balance="card.balance"
      :moneyList="moneyList"
      @showFooter="flag => showFooter = flag"
      @update="updateMenuListBalance"
    />
    <div class="footer"
      v-if="showFooter">
      <button
        @click="back"
        >Назад
      </button>
    </div>
  </div>
</template>

<script>
import PinCode from '@/components/PinCode.vue'
import Actions from '@/components/Actions.vue'

export default {
  name: 'THeDisplay',
  components: {
    PinCode,
    Actions
  },
  data () {
    return {
      hasCard: true,
      showPin: false,
      error: '',
      successMessage: '',
      showActions: false,
      showFooter: false,
      moneyList: [5000, 5000, 1000, 500, 100],
      card: {
        name: 'Alesha',
        balance: 50000,
        pinCode: 1234
      }
    }
  },
  methods: {
    del () {
      if (this.showPin) {
        this.$refs.PinCode.del()
        return true
      }
      if (this.showActions) {
        this.$refs.Actions.del()
        return true
      }
    },
    set (num) {
      if (this.showPin) {
        this.$refs.PinCode.setPinCode(num)
        return
      }
      if (this.showActions) {
        this.$refs.Actions.set(num)
        return true
      }
    },
    ok () {
      if (this.showActions) {
        this.$refs.Actions.ok()
      }
    },
    back () {
      if (this.successMessage) {
        this.successMessage = ''
      }

      this.$refs.Actions.showActions()
    },
    updateMenuListBalance ({ received }) {
      this.successMessage = 'заберите ваши деньги'
      let sum = 0
      const receivedArr = []

      for (const key in received) {
        sum += key * received[key]
        for (let i = 1; i <= received[key]; i++) {
          receivedArr.push(key)
        }
      }
      this.card.balance = this.card.balance - sum

      for (const key of receivedArr) {
        const index = this.moneyList.indexOf(Number(key))
        this.moneyList.splice(index, 1)
      }
    }
  }
}
</script>

<style scoped>
  .display {
    width: 500px;
    height: 500px;
    border: 1px solid black;
    margin: 10px auto;
    background: #c1bfbf72;
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;
    position: relative;
  }
  button {
    padding: 4px 10px;
    cursor: pointer;
  }
  .footer{
    position: absolute;
    bottom: 10px;
    display: flex;
    justify-content: space-between;
  }
  .error, .success {
    position: absolute;
    top: 20px;
    color: red;
    animation: animate .3s ease-in-out;
  }
  .success{
    color: green;
  }
  @keyframes animate {
    0% {
        transform: translateY(1px);
        transform: translateX(1px);
    }
    20% {
        transform: translateX(0px);
    }
    40% {
        transform: translateY(-1px);
    }
    60% {
        transform: translateX(0px);
    }
    80% {
        transform: translateY(1px);
    }
    100% {
        transform: translateY(-1px);
        transform: translateXs(-1px);
    }
  }
</style>
