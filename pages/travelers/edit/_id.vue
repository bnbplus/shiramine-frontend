<template>
  <div class="container column is-10">
    <travelers-edit :id="id" :name="name" :email="email" />
  </div>
</template>

<script>
import TravelersEdit from '@/components/organisms/TravelersEdit.vue'

export default {
    layout:'travelers',
    components: {
        TravelersEdit,
    },
    async asyncData({store, app, redirect, params}) {
      if ( !store.state.user.loginToken ) { return redirect('/') } // リダイレクト

      try {
        const res = await app.$axios.$get(`/user`, {
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: store.state.user.loginToken
          }
        })

        return {
          id: res.record.id,
          name: res.record.name,
          email: res.record.email
        }
      } catch (err) {
        console.log(err)
        return {
          id: '',
          name: '',
          email: '',
        }
      }


    }
}
</script>

<style>
</style> 