<template>
    <admin-travelers-table :data="data" :columns="columns"></admin-travelers-table>
</template>

<script>
import AdminTravelersTable from '~/components/organisms/AdminTravelersTable.vue'

var myData = [
    { 'id': 1, 'name': '白峰太郎', 'role': "traveler", 'email': "test@test" ,'request:': "草むしり", 'bleToken': '36135411'},
    { 'id': 2, 'name': '金沢二郎', 'role': "admin", 'email': "test1@test" ,'request:': "掃除", 'bleToken': '613527231'},
    { 'id': 3, 'name': '石川三郎', 'role': "traveler", 'email': "test2@test" ,'request:': "皿洗い", 'bleToken': 'hb242j131'},
]

export default {
    layout:'admin',

    data() {
        return {
            columns: [
                { field: 'id', label: 'ID' },
                { field: 'name', label: '名前' },
                { field: 'role', label: '種類' },
                { field: 'email', label: 'メール' },
                { field: 'request', label: '頼みごと'},
                { field: 'bleToken', label: 'BLEトークン' }
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
                data: myData//res.records
            }
        } catch (err) {
            console.log(err)
            return {
                data: myData
            }
        }
    },
    components:{
        AdminTravelersTable
    }
}
</script>
