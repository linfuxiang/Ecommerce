<template>
  <div class="banner border-b">
    <router-link v-for="title in options" :to="{path: '/' + title.url}" :key="title.url">
      <p :class="{active: active == title.desc}">{{ title.desc }}</p>
    </router-link>
    <!-- <div class="logo"></div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: 'banner',
      options: [{
        desc: '首页',
        url: '',
      }, {
        desc: '产品',
        url: 'list'
      }, {
        desc: '我的',
        url: 'user'
      }]
    }
  },
  props: {
    active: {
      default: 'main',
    }
  },
  methods: {
    changeTab(opt) {
      this.bus.$emit('changeTab', opt);
    },
  },
  mounted() {
    this.bus.$on('boardcast', (msg) => {
      console.log(`${this.name}:${msg}`)
    });
  },
}
</script>

<style scoped lang="scss">
.banner {
  width: 100%;
  font-size: 36px;
  display: flex;
  border-bottom: 1px solid red;
  overflow-x: auto;
  p {
    margin: 0;
    display: inline-block;
    margin: 0 20px;
    width: 120px;
    line-height: 50px;
  }
}

.router-link-exact-active {
  color: red;
}
</style>