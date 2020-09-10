<template>
    <section>
        <info-view :title="titleName" :info="name"/>
        <info-view :title="titleEmail" :info="email" />
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
        email: {
            type: String,
            default: '不詳'
        }
    },
    data() {
        return {
            titleName: '名前',
            titleEmail: 'メールアドレス'
        }
    },
    components:{
        InfoView
    }
}
</script>

<style>

</style>