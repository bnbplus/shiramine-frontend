<template>
    <admin-place-add />
</template>

<script>
import AdminPlaceAdd from '@/components/organisms/AdminPlaceAdd.vue'
export default {
    async asyncData({store, app, redirect, params}) {
      if ( !store.state.user.loginToken ) { return redirect('/') }
    },
    layout:'admin',
    components: {
        AdminPlaceAdd,
    }
}
</script>

<style>

</style>