<template>
    <admin-travelers-table :data="data" :columns="columns"></admin-travelers-table>
</template>

<script>
import AdminTravelersTable from '~/components/organisms/AdminTravelersTable.vue'



var myData = [
    { 'id': 1, 'name': 'Jesse', 'role': 'admin', 'mail': 'admin@gmail.com', 'bleToken': 'f2314g353wg'},
    { 'id': 2, 'name': 'John', 'role': 'travelers', 'mail': 'test@user', 'bleToken': 'j45hh934f'}
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
        field: 'role',
        label: '種類',
    },
    {
        field: 'mail',
        label: 'メール',
    },
    {
        field: 'bleToken',
        label: 'BLEトークン',
    }
]



export default {
    layout:'admin',
    data() {
        return {
            data: myData,
            columns: myColumns
        }
    },
    components:{
        AdminTravelersTable
    }
}
</script>
