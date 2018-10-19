<template>
    <div class="app">
        {{ name }}
        <!-- {{ nameA }} -->
        <!-- {{ nameB }} -->
        <button @click="increment">increment</button>
        <select name="" id="">
            <option value="i" v-for="i in obj.arr">{{ i }}</option>
        </select>
        <Home ref="home" :name="mmm"></Home>
        <!-- <router-view></router-view> -->
        <!-- <img src="@/assets/logo@2x.png" alt="" v-for="i in 50"> -->
    </div>
</template>
<script>
    // import iconfont from '../public/iconfont/iconfont.css'
    // import { mapState } from 'vuex'
    import Home from './views/Home'
    import { createNamespacedHelpers } from 'vuex'
    const { mapState } = createNamespacedHelpers('moduleA')
    export default {
        data() {
            return {
                obj: {
                    arr: [1, 2, 3, 4, 5, 6]
                },
                mmm: '123',
            }
        },
        components: {
            Home
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
                // this.$store.dispatch('moduleA/increment')
                // this.obj.arr.splice(0, 1);
                this.mmm = '456';
                this.$refs.home.$emit('ttt');
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