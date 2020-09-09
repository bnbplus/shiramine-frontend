<template>
  <travelers-edit :name="name" :age="''" :request="request"/>
</template>

<script>
import AdminTravelersEdit from '@/components/organisms/AdminTravelersEdit.vue'
export default {
    layout:'admin',
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
          name: res.record.name,
        }
      } catch (err) {
        console.log(err)
        return {
          name: '',
          age: '',
          request: ''
        }
      }
    }
}
</script>

<style>
</style> 