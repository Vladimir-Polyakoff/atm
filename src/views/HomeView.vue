<template>
  <div>
    <Display ref="Display"/>
    <Keyboard
      @del="$refs.Display.del()"
      @ok="$refs.Display.ok()"
      @set="num => $refs.Display.set(num)"
    />
  </div>
</template>

<script>
import Display from '@/components/Display'
import TheKeyboard from '@/components/Keyboard'

export default {
  components: {
    Display,
    Keyboard: TheKeyboard
  }
}
</script>
