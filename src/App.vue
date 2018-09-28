<template>
    <div class="app">
        <router-view></router-view>
        <!-- <img src="@/assets/logo@2x.png" alt="" v-for="i in 50"> -->
    </div>
</template>
<script>
    // import iconfont from '../public/iconfont/iconfont.css'
    export default {
        data() {
            return {}
        },
        methods: {
            boardcast() {
                this.bus.$emit('boardcast', 'hey my sons.')
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

</style>