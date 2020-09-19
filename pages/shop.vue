<template>
  <section class="section">
      <shop :requestData="requestData" :userData="userData" :columns="columns"> </shop>
  </section>
</template>

<script>
import Shop from '~/components/organisms/Shop.vue'

var myColumns = [
    {
        field: 'request',
        label: '頼みごと',
    },
    {
        field: 'solutioner',
        label: '頼みごとをしてくれた人'
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
        if ( !store.state.user.loginToken ) { return redirect('/') }
        try {
            const res = await app.$axios.$get('/requests',{
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    Authorization: store.state.user.loginToken
                }
            })
            console.log(res.records)
            const res2 = await app.$axios.$get(`/users`,{
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    Authorization: store.state.user.loginToken
                }
            })
            
            console.log(res2.records)
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