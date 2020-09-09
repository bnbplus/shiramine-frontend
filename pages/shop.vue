<template>
  <section class="section">
      <shop :data="data" :columns="columns"> </shop>
  </section>
</template>

<script>
import Shop from '~/components/organisms/Shop.vue'

var myData = [
    { 'name': '白峰太郎', 'age': "46", 'request:': "草むしり"},
    { 'name': '金沢二郎', 'age': "21", 'request:': "掃除"},
    { 'name': '白峰太郎', 'age': "46", 'request:': "片付け"},
    { 'name': '金沢二郎', 'age': "21", 'request:': "草むしり"}
]

var myColumns = [
    {
        field: 'name',
        label: '名前',
    },
    {
        field: 'age',
        label: '年齢',
    },
    {
        field: 'request',
        label: '頼みごと'
    }
]


export default {
    components:{
        Shop
    },

    data() {
        return {
            columns: myColumns
        }
    },

    async asyncData({ store, app, redirect }) {
        // if ( !store.state.user.loginToken ) { return redirect('/') } // リダイレクト
        try {
            const res = await app.$axios.$get('/shops', {
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    Authorization: store.state.user.loginToken
                }
            })
            return {
                data: myData //res.records
            }
        } catch (err) {
            console.log(err)
            return {
                data: myData
            }
        }
    },
}
</script>

<style>

</style>