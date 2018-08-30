<template>
    <div class="banner">
        {{ name }}
        <button @click="toIndex">backtoindex</button>
    </div>
</template>
<script>
export default {
    data() {
        return {
            name: 'sub'
        }
    },
    methods: {
        toIndex() {
            this.$router.push({ path: '/' })
        }
    },
    mounted() {
        this.bus.$on('boardcast', (msg) => {
            console.log(`${this.name}:${msg}`)
        });
    },
    beforeDestroy() {
        this.bus.$off('boardcast');
    },
}
</script>
<style scoped lang="scss">
</style>