<template>
    <div class="home">
        {{ $route.path }}
        <transition name="route" mode="out-in">
            <router-view></router-view>
        </transition>
        
    </div>
</template>
<script>
    export default {
        name: 'home',
        data() {
            return {
            }
        },
        components: {},
        props: ['name'],
        methods: {
           
        },
        mounted() {
        },
    };
</script>
<style scoped="">
    .route-enter-active, .route-leave-active {
        transition: all 1s;
    }
    .route-enter, .route-leave-to {
        opacity: 0;
    }
    .route-enter-to, .route-leave {
        opacity: 1;
    }
</style>