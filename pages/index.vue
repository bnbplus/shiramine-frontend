<template>
  <section class="section">
    <div class="columns is-centered">
      <div class="column is-three-quarters">
        <div class="box">
          <login />
        </div>
      </div>
    </div>
    {{ text }}
  </section>
</template>

<script>
import Login from '@/components/organisms/Login.vue'

export default {
  components: {
    Login,
  },
  async asyncData({ app }) {
    const response = await app.$axios.$get('http://localhost:3001/')
    console.log(response)
    return {
        text: response.message
    }
  }
}
</script>