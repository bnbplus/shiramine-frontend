<template>
  <admin-place-table :data="data" :columns="columns"> </admin-place-table>
</template>

<script>
import AdminPlaceTable from '~/components/organisms/AdminPlaceTable.vue'

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
                    field: 'bleUuid',
                    label: 'BLE UUID',
                },
                {
                    field: 'bnbSub',
                    label: 'BNB+のsub',
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
                    field: 'description',
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