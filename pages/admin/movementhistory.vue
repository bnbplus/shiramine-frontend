<template>
  <admin-movement-history-table :data="data" :columns="columns"> </admin-movement-history-table>
</template>

<script>
import AdminMovementHistoryTable from '~/components/organisms/AdminMovementHistoryTable.vue'

var myData = [
    { 'id': 1, 'name': 'place', 'bleId': '125231', 'latitude': '1233235', 'longitude': '1233237' },
    { 'id': 2, 'name': 'place', 'bleId': '246346', 'latitude': '1233233', 'longitude': '1233233' },
    { 'id': 3, 'name': 'place', 'bleId': '84564', 'latitude': '1233236', 'longitude': '1111111' },
    { 'id': 4, 'name': 'place', 'bleId': '1251', 'latitude': '1233231', 'longitude': '12342352' },
    { 'id': 5, 'name': 'place', 'bleId': '373543', 'latitude': '1233230', 'longitude': '0000000' }
]

var myColumns = [
    {
        field: 'id',
        label: 'ID',
    },
    {
        field: 'name',
        label: '名前',
    },
    {
        field: 'bleId',
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
]
export default {
    layout:'admin',
    components:{
        AdminMovementHistoryTable
    },
    data() {
        return {
            data: myData,
            columns: myColumns
        }
    },
}
</script>

<style>

</style>