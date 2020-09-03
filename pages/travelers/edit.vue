<template>
  <section class="section"> 
    <div class="columns is-centered">
      <div class="column is-three-quarters">
        <div class="box">
          <travelers-edit />
        </div>
      </div>
    </div>
  </section>
  
</template>

<script>
import TravelersEdit from '@/components/organisms/TravelersEdit.vue'

export default {
    layout:'travelers',
    components: {
        TravelersEdit,
    }
}
</script>

<style>

</style>