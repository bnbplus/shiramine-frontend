<template>
  <section class="section">
    <div class="columns is-centered">
      <div class="column is-four-fifths">
        <div class="box">
          <shop />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Shop from '@/components/organisms/Shop.vue'

export default {
  components: {
    Shop,
  }
}
</script>