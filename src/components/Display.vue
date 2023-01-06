<template>
  <div class="display">
    <transition name="fade" v-if="error">
      <div class="error">{{ error }}</div>
    </transition>
    <button
      v-if="hasCard"
      @click="hasCard = false, showPin = true"
    >Вставить карту</button>
    <PinCode
      v-if="showPin"
    @setError="err => error = err"
    ref="PinCode"
    :card="card"
    />
  </div>
</template>

<script>
import PinCode from '@/components/PinCode.vue'

export default {
  name: 'THeDisplay',
  components: {
    PinCode
  },
  data () {
    return {
      hasCard: true,
      showPin: false,
      error: '',
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
      }
    },
    set (num) {
      if (this.showPin) {
        this.$refs.PinCode.setPinCode(num)
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
  .error {
    position: absolute;
    top: 20px;
    color: red;
    animation: animate .3s ease-in-out;
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
