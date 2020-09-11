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
                <nuxt-link
                to="/travelers/view/"
                exact-active-class="is-active"
                tag="b-navbar-item"
                >
                    マイページ
                </nuxt-link>
                <nuxt-link
                :to="`/travelers/edit/${$store.state.user.userId}`"
                exact-active-class="is-active"
                tag="b-navbar-item"
                >
                    個人情報の変更
                </nuxt-link>
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