<template>
    <section>
        <info-view :title="titleName" :info="infoName"/>
        <info-view :title="titleAge" :info="infoAge" />
    </section>
</template>

<script>
import InfoView from '~/components/molecules/InfoView.vue'

export default {
    data() {
        return {
            titleName: "名前",
            infoName: "白峰太郎",
            titleAge: "年齢",
            infoAge: "22",
        }
    },
    components:{
        InfoView
    }
}
</script>

<style>

</style>