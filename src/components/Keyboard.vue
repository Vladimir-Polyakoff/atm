<template>
  <ul>
    <li
      v-for="button in buttonList"
      :key="button"
      :style="!button && 'margin-left: 156px'"
      @click="$emit(button.length ? 'del' :'set', button)"
    >
      {{ button }}
    </li>
  </ul>
</template>

<script>
export default {
  name: 'TheKeyboard',
  data () {
    return {
      buttonList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 'Удалить']
    }
  }
}
</script>

<style scoped lang="scss">
  ul {
    width: 500px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
      li {
        // убрать выделение - мигающий курсор
        user-select: none;
        list-style: none;
        width: 150px;
        padding-block: 14px;
        cursor: pointer;
        font-weight:600;
        border: 1px solid rgba(38, 37, 37, 0.449);
        &:hover {
          background: #53535319;
          scale: 1.03;
          transition: .3s;
        }
      }
  }
</style>
