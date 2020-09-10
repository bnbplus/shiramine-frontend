<template>
  <travelers-edit :id="id" :name="name" :email="email" :request="request" />
</template>

<script>
import AdminTravelersEdit from '@/components/organisms/AdminTravelersEdit.vue'
export default {
    layout:'travelers',
    components: {
        AdminTravelersEdit,
    },
    async asyncData({store, app, redirect, params}) {
      if ( !store.state.user.loginToken ) { return redirect('/') } // リダイレクト
      try {
        const res = await app.$axios.$get(`/user/${params.id}`, {
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: store.state.user.loginToken
          }
        })
        console.log(res);
        return {
          id: params.id,
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