<template>
    <div class="home">
        <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
        {{ name }}
        <transition name="slide">
            <div v-if="show">123</div>
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
        mounted() {
            this.$on('ttt', res => {
                this.show = !this.show;
                console.log(this.name);
            })
        },
    };
</script>
<style scoped="">
    .slide-enter-active {
        /*transition: all 2s;*/
        animation: bounce 1s;
    }
    .slide-leave-active {
    	animation: bounce 1s reverse;
    }
    .slide-enter-to,
    .slide-leave {
        opacity: 0.5;
    }
    @keyframes bounce {
    	0% {
    		opacity: 0;
    	}
    	50% {
    		opacity: 1;
    	}
    	100% {
    		opacity: 0.5;
    	}
    }
</style>