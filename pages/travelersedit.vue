<template>
    <section class="section">
        <div class="columns is-centered">
            <div class="column is-three-quarters">
                <div class="box">
                    <admin-travelers-edit />
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import AdminTravelersEdit from '@/components/organisms/TravelersEdit.vue'
export default {
    layout:'travelers',
    components: {
        AdminTravelersEdit,
    }
}
</script>
 
<style>

</style>