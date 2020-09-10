<template>
    <admin-travelers-table :data="data" :columns="columns"></admin-travelers-table>
</template>

<script>
import AdminTravelersTable from '~/components/organisms/AdminTravelersTable.vue'


export default {
    layout:'admin',

    data() {
        return {
            columns: [
                { field: 'id', label: 'ID' },
                { field: 'name', label: '名前' },
                { field: 'role', label: '種類' },
                { field: 'email', label: 'メール' },
                { field: 'bleUuid', label: 'BLEタグ' },
            ]
        }
    },
    async asyncData({ store, app, redirect }) {
        if ( !store.state.user.loginToken ) { return redirect('/') } // リダイレクト
        try {
            const res = await app.$axios.$get('/users', {
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    Authorization: store.state.user.loginToken
                }
            })
            return {
                data: res.records
            }
        } catch (err) {
            console.log(err)
            return {
                data: []
            }
        }
    },
    components:{
        AdminTravelersTable
    }
}
</script>
