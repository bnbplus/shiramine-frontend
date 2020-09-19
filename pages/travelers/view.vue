<template>
    <section class="section">
        <div class="container column is-10">
            <travelers-view :name="name" :blenum="blenum"/>
            <div style="margin-top:50px">
                <travelers-request :data="requestData" :columns="requestColumns" />
            </div>
        </div>
    </section>
    
</template>

<script>
import TravelersView from '~/components/organisms/TravelersView.vue'
import TravelersRequest from '~/components/organisms/TravelersRequest.vue'



export default {
    layout:'travelers',
    components:{
        TravelersView,
        TravelersRequest
    },
    data() {
        return {
            requestColumns: [
                {
                    field: 'information',
                    label: 'おねがい',
                },
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
            console.log(res)
            return {
                name: res.record.name,
                blenum: res.record.bleNumber,
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