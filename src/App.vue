<template>
    <div class="app">
        {{ name }}
        <!-- {{ nameA }} -->
        <!-- {{ nameB }} -->
        <button @click="increment">increment</button>
        <!-- <router-view></router-view> -->
        <!-- <img src="@/assets/logo@2x.png" alt="" v-for="i in 50"> -->
    </div>
</template>
<script>
    // import iconfont from '../public/iconfont/iconfont.css'
    // import { mapState } from 'vuex'

    import { createNamespacedHelpers } from 'vuex'
    const { mapState } = createNamespacedHelpers('moduleA')
    export default {
        data() {
            return {}
        },
        computed: {
            // ...mapState('moduleA', {
            //     nameA: 'name',
            //     // b: state => state.b
            // })
            ...mapState(['name'])
        },
        watch: {
            name: {
                deep: true,
                handler(newV, oldV) {
                    console.log(oldV, '===>', newV)
                }
            }
        },
        methods: {
            boardcast() {
                this.bus.$emit('boardcast', 'hey my sons.')
            },
            increment() {
                this.$store.dispatch('moduleA/increment')
            },
        },
        mounted() {
            // this.$root.eventHandler.$on('changeTab', function (opt) {
            //  if() {

            //  }
            // })
        },
    };
</script>
<style lang="scss">
</style>