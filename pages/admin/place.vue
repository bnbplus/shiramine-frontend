<template>
  <admin-place-table :data="data" :columns="columns"> </admin-place-table>
</template>

<script>
import AdminPlaceTable from '~/components/organisms/AdminPlaceTable.vue'

var myData = [
    { 'id': 1, 'name': 'Jesse', 'bleId': '125231', 'latitude': 1233235, 'longitude': 1233237 },
    { 'id': 2, 'name': 'John', 'bleId': '246346', 'latitude': 1233233, 'longitude': 1233233 },
    { 'id': 3, 'name': 'Tina', 'bleId': '84564', 'latitude': 1233236, 'longitude': 1111111 },
    { 'id': 4, 'name': 'Clarence', 'bleId': '1251', 'latitude': 1233231, 'longitude': 12342352 },
    { 'id': 5, 'name': 'Anne', 'bleId': '373543', 'latitude': 1233230, 'longitude': 72351 }
]

export default {
    layout:'admin',
    components:{
        AdminPlaceTable
    },
    data() {
        return {
            columns: [
                {
                    field: 'id',
                    label: 'ID',
                },
                {
                    field: 'name',
                    label: '名前',
                },
                {
                    field: 'gatewayId',
                    label: 'BLE UUID',
                },
                {
                    field: 'latitude',
                    label: '緯度',
                },
                {
                    field: 'longitude',
                    label: '経度',
                }
            ],
            data: myData
        }
    },
    async asyncData({ store, app, redirect }) {
        if ( !store.state.user.loginToken ) { return redirect('/') } // リダイレクト
        try {
            const res = await app.$axios.$get('/spots', {
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    Authorization: store.state.user.loginToken
                }
            })
            return {
                data: myData//res.records
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