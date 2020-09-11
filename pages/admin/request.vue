<template>
  <admin-request-table :data="data" :columns="columns" />  
</template>

<script>
import AdminRequestTable from '~/components/organisms/AdminRequestTable.vue'

export default {
    layout:'admin',
    components:{
        AdminRequestTable
    },
    data() {
        return {
            columns: [
                {
                    field: 'id',
                    label: 'ID',
                },
                {
                    field: 'userId',
                    label: 'ユーザID',
                },
                {
                    field: 'information',
                    label: '内容',
                }
            ],
        }
    },
    async asyncData({ store, app, redirect }) {
        if ( !store.state.user.loginToken ) { return redirect('/') } // リダイレクト
        try {
            const res = await app.$axios.$get('/requests', {
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    Authorization: store.state.user.loginToken
                }
            })
            return {
                data: res.records
            }
        } catch (err) {
            return {
                data: []
            }
        }
    }
}
</script>

<style>

</style>