<template>
    <section>
        <info-view :title="titleName" :info="name"/>
    </section>
</template>

<script>
import InfoView from '~/components/molecules/InfoView.vue'

export default {
    props: {
        name: {
            type: String,
            default: '匿名'
        }
    },
    data() {
        return {
            titleName: '名前'
        }
    },
    components:{
        InfoView
    }
}
</script>

<style>

</style>