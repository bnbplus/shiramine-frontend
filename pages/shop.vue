<template>
  <section class="section">
      <shop :requestData="requestData" :userData="userData" :columns="columns"> </shop>
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
            columns: myColumns,
        }
    },

    async asyncData({ store, app, redirect }) {
        try {
            const res = await app.$axios.$get('/requests',{
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    Authorization: store.state.user.loginToken
                }
            })
            const res2 = await app.$$axios.$get(`/users`,{
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    Authorization: store.state.user.loginToken
                }
            })
            return {
                requestData: res.records,
                userData: res2.records
            }
        } catch (err) {
            console.log(err)
            return {
                requestData: [],
                userData:[]
            }
        }
    },

}
</script>

<style>

</style>