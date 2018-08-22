<template>
  <div class="banner">
    <banner :active="name"></banner>
    <router-view></router-view>
    <router-link :to="{path: '/sub'}">跳转去副页</router-link>
    <button>ddd</button>
    <div class="a"></div>
    <div class="b"></div>
    <div class="c"></div>
    <div class="d"></div>
    <div class="e"></div>
  </div>
</template>
<script>
import banner from '@/common/components/banner'
export default {
  data() {
    return {
      name: 'index'
    }
  },
  components: {
    banner,
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
@import 'index.scss';
</style>