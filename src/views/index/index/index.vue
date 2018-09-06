<template>
  <div class="index">
    <cmp-banner :active.sync="name"></cmp-banner>
    <!-- <router-view></router-view> -->
    <!-- <router-link :to="{path: '/sub'}">跳转去副页</router-link> -->
    <!-- <button class="tttt" @click="boardcast">广播</button> -->
    <!-- <button class="tttt" @click="request">Ajax</button> -->
    <!-- <img src="@/assets/logo@2x.png" alt="" v-for="i in 5" :data-id="i" :key="i"> -->
    <!-- <div class="more">{{ fontSize }}, {{ dpr }}</div> -->
    <ul>
      <li v-for="product in proData" :key="product.id">
        <div class="title">{{ product.productName }}</div>
        <img :src="product.img" alt="">
      </li>
    </ul>
    <cmp-footer></cmp-footer>
  </div>
</template>
<script>
import cmpBanner from '@/common/components/banner/banner'
import cmpFooter from '@/common/components/footer/footer'
export default {
  data() {
    return {
      name: 'index',
      fontSize: document.documentElement.style.fontSize,
      dpr: window.devicePixelRatio,
      proData: [],
    }
  },
  components: {
    cmpBanner,
    cmpFooter,
  },
  methods: {
    boardcast() {

    },
    request() {
      this.$api({
          method: 'get',
          url: '/api/data',
          data: {
            type: 1,
          }
        })
        .then(res => {
          console.log(res.data)
          this.proData = res.data.content
        })
        .catch(res => {
          console.warn('网络出错了')
        })
    },
  },
  created() {
    this.request()
  },
  mounted() {
    this.bus.$on('boardcast', (msg) => {
      console.log(`${this.name}:${msg}`);
    })
  },
  beforeDestroy() {
    this.bus.$off('boardcast')
    for (var i of [1]) {
      console.log(1)
    }
  },
}
</script>
<style scoped lang="scss">
@import 'index.scss';
</style>