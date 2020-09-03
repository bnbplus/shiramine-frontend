<template>
    <div>
        <b-navbar style="height:100px">
            <template slot="brand">
                <b-navbar-item tag="router-link" :to="{ path: '/' }">
                    <img
                        src="https://raw.githubusercontent.com/buefy/buefy/dev/static/img/buefy-logo.png"
                        alt="Lightweight UI components for Vue.js based on Bulma"
                    >
                </b-navbar-item>
            </template>
            <template slot="start">
                <b-navbar-item>
                    <nuxt-link
                    to="view"
                    exact-active-class="is-active"
                    >
                        My Page
                    </nuxt-link>
                </b-navbar-item>
                <b-navbar-item>
                    <nuxt-link
                    to="edit"
                    exact-active-class="is-active"
                    >
                        Edit
                    </nuxt-link>
                </b-navbar-item>
            </template>
        </b-navbar>
        <div class="container column is-10">
            <nuxt />
        </div>
    </div>
    
</template>

<script>
export default {
  
}

</script>

<style>

</style>