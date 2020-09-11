<template>
  <traveler-request-edit :id="id" :information="information"/>
</template>

<script>
import TravelerRequestEdit from '@/components/organisms/TravelerRequestEdit.vue'

export default {
    layout:'travelers',
    components: {
        TravelerRequestEdit,
    },
    data(){
        return{
            myColumns:[
                {
                    field: 'request',
                    label: '頼みごと'
                }
            ]
        }
    },
    async asyncData({store, app, redirect, params}) {
        if ( !store.state.user.loginToken ) { return redirect('/') } // リダイレクト
        try {
            const res = await app.$axios.$get(`/request/user/${params.id}`, {
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                Authorization: store.state.user.loginToken
            }
            })
            return{
                id: params.id,
                data: res.records
            }
        } catch (err) {
            console.log(err)
            return {
                id: '',
                
            }
        }
    }
}
</script>

<style>

</style>