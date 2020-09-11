<template>
  <travelers-request-edit :id="id" :information="information"/>
</template>

<script>
import TravelersRequestEdit from '@/components/organisms/TravelersRequestEdit.vue'
export default {
  layout:'travelers',

  components: {
      TravelersRequestEdit,
  },

  async asyncData({ store, app, redirect, params }) {
        if ( !store.state.user.loginToken ) { return redirect('/') } // リダイレクト
        try {
            const res = await app.$axios.$get(`/request/${params.id}`, {
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    Authorization: store.state.user.loginToken
                }
            })
            console.log(res.record)
            return {
                id: res.record.id,
                userId: res.record.userId,
                information: res.record.information
            }
        } catch (err) {
            console.log(err)
            return {
                id: 0,
                userId: "",
                information: "",
            }
        }
    }
}
</script>

<style>

</style>