<template>
  <section class="section">
      <shop :data="data" :columns="columns"> </shop>
  </section>
</template>

<script>
import Shop from '~/components/organisms/Shop.vue'

var myColumns = [
    {
        field: 'userId',
        label: '名前',
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
        try {
            const res = await app.$axios.$get('/requests',{
            })
            // const res2 = await app.$$axios.$get(`/user/${res.records.userId}`,{
            // })
            return {
                data: res.records,
                //userName: res2.record.name
            }
        } catch (err) {
            console.log(err)
            return {
                data: [],
                //userName: ""
            }
        }
    },

}
</script>

<style>

</style>