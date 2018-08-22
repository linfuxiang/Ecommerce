<template>
  <div>
    <router-view></router-view>
    <button @click="boardcast">广播</button>
    <button @click="request">Ajax</button>
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
button {
  font-size: 36px;
  @include border-radius(1px, solid, red, 5px, green);
  color: #000;
}
</style>