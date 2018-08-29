<template>
  <div class="app">
    <router-view></router-view>
    <button class="tttt" @click="boardcast">广播</button>
    <button class="tttt" @click="request">Ajax</button>
    <img src="@/assets/logo@2x.png" alt="">
  </div>
</template>
<script>
export default {
  data() {
    return {
      hello: 'hello',
    }
  },
  methods: {
    boardcast() {
      this.bus.$emit('boardcast', 'hey my sons.')
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
        })
      this.$api({
          method: 'post',
          url: '/api/test',
          data: {
            type: 1,
          }
        })
        .then(res => {
          console.log(res.data)
        })
    },
  },
  mounted() {
    // this.$root.eventHandler.$on('changeTab', function (opt) {
    //  if() {

    //  }
    // })
  },
}
</script>
<style lang="scss">
// .app {
//   background-image: url(./assets/1.png);
//   background-repeat: repeat-y;
//   background-size: contain;
// }
button.tttt {
  font-size: 36px;
  border: 1px solid red;
  border-radius: 5px;
  background: yellow;
  color: #000;
}
</style>