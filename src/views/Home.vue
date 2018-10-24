<template>
    <div class="home">
        <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
        {{ name }}
        <transition name="slide" v-on:before-enter="beforeEnter" v-on:enter="enter" :css="false">
            <!-- <transition name="slide"> -->
            <div class="a" v-if="show" v-focus:a.b.c="'abc'">123</div>
        </transition>
    </div>
</template>
<script>
    // @ is an alias to /src
    // import HelloWorld from '@/components/HelloWorld.vue'

    export default {
        name: 'home',
        data() {
            return {
                show: false
            }
        },
        components: {},
        props: ['name'],
        methods: {
            beforeEnter(el) {
                el.style.height = '0px';
                el.style.transition = 'all ' + 2000 + 'ms';
            },
            enter(el, done) {
                // console.log(el.style.height)
                // console.log(done)
                el.style.height = '42px';
                el.style.transition = 'height ' + 2000 + 'ms';
                setTimeout(done, 2000);
            },
        },
        mounted() {
            this.$on('ttt', res => {
                this.show = !this.show;
                console.log(this.name);
            })
        },
        directives: {
            'focus': {
                bind: function(el, binding, vnode, oldVnode) {
                    console.log('bind')
                    console.log(el, binding, vnode, oldVnode)
                },
                inserted: function(el) {
                    console.log('inserted')
                    console.log(el.style)
                },
            }
        }
    };
</script>
<style scoped="">
    .a {
        overflow: hidden;
    }
    .slide-enter-active {
        transition: height 2s;
        /*animation: bounce 1s;*/
    }
    .slide-leave-active {
        transition: height 2s;
        /*animation: bounce 1s reverse;*/
    }
    .slide-enter,
    .slide-leave-to {
        /*transform: translateY(-100%);*/
        height: 0;
    }
    .slide-enter-to,
    .slide-leave {
        /*transform: translateY(0);*/
        height: 42px;
    }
    /*@keyframes bounce {
    	0% {
    		height: 0;
    	}
    	100% {
    		opacity: ;
    	}
    }*/
</style>