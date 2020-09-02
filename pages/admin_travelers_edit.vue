<template>
    <section class="section">
    <div class="columns is-centered">
      <div class="column is-three-quarters">
        <div class="box">
          <admin_travelers_edit />
        </div>
      </div>
    </div>
  </section>
  
</template>

<script>
import Admin_travelers_edit from '@/components/organisms/admin_travelers_edit.vue'

export default {
    layout:'admin',
    components: {
        Admin_travelers_edit,
    }
}
</script>

<style>

</style>