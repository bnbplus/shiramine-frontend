<template>
    <section>
        <info-view :title="titleName" :info="name"/>
        <info-view :title="titleBlenum" :info="blenum ? blenum : '未登録'"/>
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
        blenum: {
            type: String,
            default: ' '
        }
    },
    data() {
        return {
            titleName: '名前',
            titleBlenum: 'BLEタグ番号'
        }
    },
    components:{
        InfoView
    }
}
</script>

<style>

</style>