<template>
    <div class="home">
        {{ $route.path }}
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
</style>