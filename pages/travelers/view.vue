<template>
    <section class="section">
        <travelers-view :name="name" :age="age"/>
        <div style="margin-top:50px">
            <travelers-table :data="data" :columns="columns"> </travelers-table>
        </div>
    </section>
    
</template>

<script>
import TravelersView from '~/components/organisms/TravelersView.vue'
import TravelersTable from '~/components/organisms/TravelerTable.vue'

var myData = [
    { 'place': '雪だるまカフェ', 'time': '2020/9/20 12:19'},
    { 'place': '志んさ', 'time': '2020/9/21 11:02'}
]
var myColumns = [
    {
        field: 'place',
        label: '場所',
    },
    {
        field: 'time',
        label: '時間',
    }
]

export default {
    layout:'travelers',
    components:{
        TravelersView,
        TravelersTable
    },
    data() {
        return {
            data: myData,
            columns: myColumns
        }
    },
    async asyncData({ store, app, redirect }) {
        if ( !store.state.user.loginToken ) { return redirect('/') }
        try {
            const res = await app.$axios.$get('/user', {
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    Authorization: store.state.user.loginToken
                }
            })
            return {
                name: res.record.name,
                age: '不詳'
            }
        } catch (err) {
            console.log(err)
            return {
                name: '不明',
                age: '不詳'
            }
        }
    }

}
</script>

<style>

</style>