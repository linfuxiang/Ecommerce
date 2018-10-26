<template>
    <div class="home">
        {{ $route.path }}
        <button @click="locate">sub2</button>
        <ul>
            <li v-for="i in 100">1</li>
        </ul>
    </div>
</template>
<script>
    export default {
        name: 'home',
        data() {
            return {}
        },
        components: {},
        props: ['name'],
        methods: {
            locate() {
                this.$router.push('sub')
            }
        },
        mounted() {},
    };
</script>
<style scoped="">
    .home {
        background: blue;
    }
</style>
</style>
</style>