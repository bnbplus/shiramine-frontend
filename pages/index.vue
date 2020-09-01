<template>
  <section class="section">
    <div class="columns is-centered">
      <div class="column is-three-quarters">
        <div class="box">
          <login />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Login from '@/components/organisms/Login.vue'

export default {
  components: {
    Login,
  }
}
</script>