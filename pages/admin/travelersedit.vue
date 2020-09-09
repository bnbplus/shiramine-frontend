<template>
  <admin-travelers-edit :name="name" :bletag="bletag" :request="request" />
</template>

<script>
import AdminTravelersEdit from '@/components/organisms/AdminTravelersEdit.vue'
export default { 
    layout:'admin',

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
                name: res.records.name,
                bletag: "不明",
                request: "不明"
            }
        } catch (err) {
            console.log(err)
            return {
                data: []
            }
        }
    },

    components: {
        AdminTravelersEdit,
    }
}
</script>

<style>

</style>