<template>
    <div class="banner">
        {{ name }}
    </div>
</template>
<script>
export default {
    data() {
        return {
            name: 'list'
        }
    },
    methods: {},
    mounted() {
        this.bus.$on('boardcast', (msg) => {
            console.log(`${this.name}:${msg}`)
        });
        console.log(this.$route.params.productId)
    },
    beforeDestroy() {
        this.bus.$off('boardcast');
    },
}
</script>
<style scoped lang="scss">
</style>