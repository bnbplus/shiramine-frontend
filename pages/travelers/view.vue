<template>
    <section class="section">
        <div class="container column is-10">
            <travelers-view :name="name" :email="email"/>
            <div style="margin-top:50px">
                <travelers-request :data="requestData" :columns="requestColumns" />
            </div>
            <div style="margin-top:50px">
                <travelers-table :data="data" :columns="columns"> </travelers-table>
            </div>
        </div>
    </section>
    
</template>

<script>
import TravelersView from '~/components/organisms/TravelersView.vue'
import TravelersTable from '~/components/organisms/TravelerTable.vue'
import TravelersRequest from '~/components/organisms/TravelersRequest.vue'

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
        TravelersTable,
        TravelersRequest
    },
    data() {
        return {
            data: myData,
            columns: myColumns,
            requestColumns: [
                {
                    field: 'information',
                    label: '頼みごと',
                }
            ]

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

            const resreq = await app.$axios.$get(`/request/user/${store.state.user.userId}`, {
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    Authorization: store.state.user.loginToken
                }
            })
            console.log(resreq)
            return {
                name: res.record.name,
                email: res.record.email,
                requestData: resreq.records

            }
        } catch (err) {
            console.log(err)
            return {
                request: ''
            }
        }
    }

}
</script>

<style>

</style>