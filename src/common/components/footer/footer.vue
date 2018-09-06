<template>
  <footer class="footer">
    <ul>
      <li v-for="i in help" :key="i.name">
        <span>{{ i.name }}</span>
        <i class="iconfont icon-zengjia"></i>
      </li>
    </ul>
    <p class="copyright">Copyright © 2018 Just Funny. 保留所有权利。</p>
  </footer>
</template>
<script>
export default {
  data() {
    return {
      help: [{
        name: '选购及了解',
        link: '/buy'
      }, {
        name: 'Apple Store 商店',
        link: '/buy'
      }, {
        name: '账户',
        link: '/buy'
      }, {
        name: '关于 Apple',
        link: '/buy'
      }, ],
    }
  },
  props: {},
  methods: {},
  mounted() {},
}
</script>
<style scoped lang="scss">
@import 'footer.scss';
</style>