<template>
    <section>
        <info-view :title="titleName" :info="name"/>
        <info-view :title="titleAge" :info="age" />
    </section>
</template>

<script>
import InfoView from '~/components/molecules/InfoView.vue'

export default {
    props: {
        name: {
            type: String,
            default: '匿名'
        },
        age: {
            type: String,
            default: '不詳'
        },
    },
    data() {
        return {
            titleName: '名前',
            titleAge: '年齢',
        }
    },
    components:{
        InfoView
    }
}
</script>

<style>

</style>