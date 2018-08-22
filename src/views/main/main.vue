<template>
  <div class="banner">
    {{ name }}
    <div class="a"></div>
    <div class="b"></div>
    <div class="c"></div>
    <div class="d"></div>
    <div class="e"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: 'main'
    }
  },
  methods: {},
  mounted() {
    this.bus.$on('boardcast', (msg) => {
      console.log(`${this.name}:${msg}`)
    });
  },
  beforeDestroy() {
    this.bus.$off('boardcast');
  },
}
</script>
<style scoped lang="scss">
@import 'main.scss';
</style>