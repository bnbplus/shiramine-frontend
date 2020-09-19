<template>
    <div>
        <b-navbar style="height:100px">
            <template slot="brand">
                <b-navbar-item tag="router-link" :to="{ path: '/' }">
                    <img
                        src="@/assets/img/shiramine_logo_type2_grade.png"
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
                :to="`/movement`"
                exact-active-class="is-active"
                tag="b-navbar-item"
                >
                    行動履歴
                </nuxt-link>
                <nuxt-link
                :to="`/travelers/onegai`"
                exact-active-class="is-active"
                tag="b-navbar-item"
                >
                    みんなのおねがい
                </nuxt-link>
                <nuxt-link
                :to="`/travelers/edit/${$store.state.user.userId}`"
                exact-active-class="is-active"
                tag="b-navbar-item"
                >
                    個人情報の変更
                </nuxt-link>
            </template>
            <template slot="end">
                <b-navbar-item @click="logout()">
                    ログアウト
                </b-navbar-item>
            </template>
        </b-navbar>
        <nuxt />
    </div>
    
</template>

<script>
export default {
    methods: {
        logout() {
            this.$store.commit('user/setLoginToken', null)
            this.$store.commit('user/setUserRole', null)
            this.$store.commit('user/serUserId', null)
            this.$router.push('/')
        }
    }
}

</script>

<style>

</style>