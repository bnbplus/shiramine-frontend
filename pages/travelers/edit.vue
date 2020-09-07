<template>
  <section class="section"> 
    <div class="columns is-centered">
      <div class="column is-three-quarters">
        <div class="box">
          <travelers-edit :name="name" :age="age"/>
        </div>
      </div>
    </div>
  </section>
  
</template>

<script>
import TravelersEdit from '@/components/organisms/TravelersEdit.vue'

export default {
    layout:'travelers',

    async asyncData({ store, app, redirect }) {
        if ( !store.state.user.loginToken ) { return redirect('/') } // リダイレクト
        try {
            const res = await app.$axios.$get('/user', {
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    Authorization: store.state.user.loginToken
                }
            })
            return {
                name: res.records.name,
                age: 0
            }
        } catch (err) {
            console.log(err)
            return {
                name: "不明",
                age: 0
            }
        }
    },

    components: {
        TravelersEdit,
    }
}
</script>

<style>

</style>