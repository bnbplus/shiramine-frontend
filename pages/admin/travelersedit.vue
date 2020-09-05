<template>
  <admin-travelers-edit/>
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
                age: "不詳"
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