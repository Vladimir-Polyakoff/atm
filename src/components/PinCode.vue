<template>
  <div class="pin" v-if="!isCardBlocked">
    <div class="pin__title">Введите PIN код</div>
    <div class="pin__code">{{ pinCode }}</div>
  </div>
</template>

<script>
export default {
  name: 'PinCode',
  props: {
    card: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      hasCard: true,
      pinCode: '',
      pinCodeSecret: '',
      triesCount: 3,
      isCardBlocked: false
    }
  },
  methods: {
    del () {
      if (this.pinCode) {
        this.pinCode = this.pinCode.slice(0, -1)
        this.pinCodeSecret = this.pinCodeSecret.slice(0, -1)

        this.$emit('setError', '')
      }
    },
    setPinCode (num) {
      if (this.isCardBlocked) return

      if (this.pinCode.length < 4) {
        this.pinCode += '*'
        this.pinCodeSecret += String(num)

        this.$emit('setError', '')
      }
      if (this.pinCode.length === 4) {
        if (Number(this.pinCodeSecret) !== this.card.pinCode) {
          this.triesCount--

          if (this.triesCount) {
            setTimeout(() => {
              this.pinCode = ''
              this.pinCodeSecret = ''
            }, 450)

            this.$emit('setError', 'Неверный PIN код, осталось попыток: ' + this.triesCount)
          } else {
            this.isCardBlocked = true

            this.$emit('setError', 'Карта заблокированна')
          }
        } else {
          this.$emit('success')
        }
      }
    }
  }
}
</script>

<style scoped>
  .pin__title {
    margin-bottom: 20px;
  }
  .pin__code {
    letter-spacing: 10px;
    font-size: 20px;
    margin-inline: auto;
  }
</style>
