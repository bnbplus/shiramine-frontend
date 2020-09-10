<template>
  <admin-place-edit :name="name" :bleuuid="bleuuid" :latitude="latitude" :longitude="longitude"/>
</template>

<script>
import AdminPlaceEdit from '@/components/organisms/AdminPlaceEdit.vue'
export default {
  layout:'admin',

  components: {
      AdminPlaceEdit,
  },

  async asyncData({ store, app, redirect }) {
        if ( !store.state.user.loginToken ) { return redirect('/') } // リダイレクト
        try {
            const res = await app.$axios.$get('/spot', {
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    Authorization: store.state.user.loginToken
                }
            })
            return {
                name: res.records.name,
                bleuuid: res.records.bleuuid,
                latitude: res.records.latitude,
                longitude: res.records.longitude,
            }
        } catch (err) {
            console.log(err)
            return {
                name: "不明",
                bleuuid: "不明",
                latitude: 0,
                longitude: 0
            }
        }
    }
}
</script>

<style>

</style>