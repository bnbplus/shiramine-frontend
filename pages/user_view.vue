<template>
    <div>
        {{ text }}
    </div>
</template>

<script>
export default {
    layout:'user',
    async asyncData({ app }) {
        const response = await app.$axios.$get('http://localhost:3001/')
        console.log(response)
        return {
            text: response.message
        }
    }
}
</script>

<style>

</style>