<template>
  <nav class="banner">
    <!-- <router-link v-for="title in options" :to="{path: '/' + title.url}" :key="title.url">
      <p :class="{active: active == title.desc}">{{ title.desc }}</p>
    </router-link> -->
    <svg class="icon icon-svg" aria-hidden="true" @click="isShowList=true">
      <use xlink:href="#icon-xitongcaidan"></use>
    </svg>
    <svg class="icon icon-svg" aria-hidden="true" @click="showMore">
      <use xlink:href="#icon-shouyefill"></use>
    </svg>
    <svg class="icon icon-svg" aria-hidden="true">
      <use xlink:href="#icon-duogouwu"></use>
    </svg>
    <div class="list" v-show="isShowList">
      <div class="head">
        <svg class="icon icon-svg" aria-hidden="true" @click="isShowList=false">
          <use xlink:href="#icon-guanbi"></use>
        </svg>
        <svg class="icon icon-svg" aria-hidden="true">
          <use xlink:href="#icon-shouyefill"></use>
        </svg>
      </div>
      <div class="search">
        <div class="search-container">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-sousuo"></use>
          </svg>
          <input type="text" v-model="searchVal" placeholder="搜索lfx.com">
        </div>
      </div>
      <ul>
        <li v-for="i in options" :key="i.desc">{{ i.desc }}</li>
      </ul>
    </div>
  </nav>
</template>
<script>
export default {
  data() {
    return {
      name: 'banner',
      isShowList: false,
      searchVal: '',
      options: [{
        desc: 'Mac',
        url: '',
      }, {
        desc: 'iPad',
        url: 'list'
      }, {
        desc: 'iPhone',
        url: 'user'
      }, {
        desc: 'Watch',
        url: 'user'
      }, {
        desc: 'Music',
        url: 'user'
      }, ]
    }
  },
  props: {
    active: {
      default: 'main',
    }
  },
  methods: {
    showMore() {
      this.$emit('update:active', this.active + '1')
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
@import 'banner.scss';
</style>