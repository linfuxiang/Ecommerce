<template>
  <div>
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
      this.bus.$emit('boardcast', 'hey my sons.');
    },
    request() {
      this.axios.get('/api/user')
        .then(res => {
          console.log(res);
        });
    },
  },
  mounted() {
    // this.$root.eventHandler.$on('changeTab', function (opt) {
    //  if() {

    //  }
    // });
  },
}
</script>
<style lang="scss">
button.tttt {
  font-size: 36px;
  border: 1px solid red;
  border-radius: 5px;
  background: yellow;
  color: #000;
  &::after {
    content: '';
  }
  &:after {
    content: '1';
  }
}
</style>