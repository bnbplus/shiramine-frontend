<template>
  <admin-place-table :data="data" :columns="columns"> </admin-place-table>
</template>

<script>
import AdminPlaceTable from '~/components/organisms/AdminPlaceTable.vue'

var myData = [
    { 'id': 1, 'name': 'Jesse', 'gatewayId': '125231', 'latitude': 1233235, 'longitude': 1233237, 'information': 'カフェ' },
    { 'id': 2, 'name': 'John', 'gatewayId': '246346', 'latitude': 1233233, 'longitude': 1233233, 'information': '駄菓子屋' },
    { 'id': 3, 'name': 'Tina', 'gatewayId': '84564', 'latitude': 1233236, 'longitude': 1111111, 'information': '温泉' },
    { 'id': 4, 'name': 'Clarence', 'gatewayId': '1251', 'latitude': 1233231, 'longitude': 12342352, 'information': 'カフェ' },
    { 'id': 5, 'name': 'Anne', 'gatewayId': '373543', 'latitude': 1233230, 'longitude': 72351, 'information': '飯屋' }
]

export default {
    layout:'admin',
    components:{
        AdminPlaceTable
    },
    data() {
        return {
            data: myData,
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
                },
                {
                    field: 'information',
                    label: '説明',
                }
            ],
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
                //data: res.records
            }
        } catch (err) {
            return {
                //data: []
            }
        }
    }
}
</script>

<style>

</style>