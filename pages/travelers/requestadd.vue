<template>
    <div class="container column is-10">
        <traveler-request-add />
    </div>
</template>

<script>
import TravelerRequestAdd from '@/components/organisms/TravelerRequestAdd.vue'
export default {
    layout:'travelers',
    components: {
        TravelerRequestAdd,
    }
}
</script>

<style>

</style>