<template>
  <admin-place-edit :name="name" :bleuuid="bleuuid" :latitude="latitude" :longitude="longitude" :description="description"/>
</template>

<script>
import AdminPlaceEdit from '@/components/organisms/AdminPlaceEdit.vue'
export default {
  layout:'admin',

  components: {
      AdminPlaceEdit,
  },

  async asyncData({ store, app, redirect, params }) {
        if ( !store.state.user.loginToken ) { return redirect('/') } // リダイレクト
        try {
            const res = await app.$axios.$get(`/spot/${params.id}`, {
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    Authorization: store.state.user.loginToken
                }
            })
            console.log(res.record)
            return {
                name: res.record.name,
                bleuuid: res.record.bleuuid,
                latitude: res.record.latitude,
                longitude: res.record.longitude,
                description: res.record.description
            }
        } catch (err) {
            console.log(err)
            return {
                name: "不明",
                bleuuid: "不明",
                latitude: 0,
                longitude: 0,
                description: "不明"
            }
        }
    }
}
</script>

<style>

</style>