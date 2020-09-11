<template>
    <section>
        <div class="content">
            <p>
            <strong>{{ titleInfo }}</strong>
            <br>
                {{ information }}
            </p>
        </div>
        <travelers-request-done :id="id" :data="data"/>
    </section>
    
</template>

<script>
import InfoView from '@/components/molecules/InfoView.vue'
import TravelersRequestDone from '@/components/organisms/TravelersRequestDone.vue'
export default {
  layout:'travelers',
  data(){
      return{
          titleInfo:"頼みごとの内容"
      }
    
  },

  components: {
      TravelersRequestDone
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
            const res2 = await app.$axios.$get('/users', {
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    Authorization: store.state.user.loginToken
                }
            })
            console.log(res2.records)
            return {
                id: res.record.id,
                userId: res.record.userId,
                information: res.record.information,
                data: res2.records
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