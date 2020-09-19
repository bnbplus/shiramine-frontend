<template>
  <admin-travelers-edit :name="name" :bleNumber="bleNumber" :role="role" :id="id"/>
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
        const res = await app.$axios.$get(`/userid/${params.id}`, {
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: store.state.user.loginToken
          }
        })
        console.log(res);
        return {
          id: res.record.id,
          name: res.record.name,
          bleNumber: res.record.bleNumber,
          role: res.record.role
        }
      } catch (err) {
        console.log(err)
        return {
          id: 0,
          name: '',
          bleNumber: '',
          role: ''
        }
      }
    }
}
</script>

<style>
</style> 
