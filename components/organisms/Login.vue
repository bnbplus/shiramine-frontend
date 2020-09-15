<template>
    <section class="section">

        <form @submit.prevent="login" action="/">

            <h1 class="title">ログイン</h1>

            <b-field label="Email">
                <b-input type="email" v-model="email" maxlength="100" />
            </b-field>

            <b-field label="Password">
                <b-input type="password" v-model="password" maxlength="100" password-reveal />
            </b-field>

            <b-button native-type="submit">
                ログイン
            </b-button>

            <b-button @click="loginOpenId">
                Login with bnb+
            </b-button>

        </form>

    </section>
</template>

<script>
import OpenIdConfiguration from "@/constant/openid_config";

export default {
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        /** ログイン処理 */
        async login() {
            try {
                const back = await this.$axios.post('/login', {
                    email: this.email,
                    password: this.password
                })

                this.$store.commit('user/setLoginToken', back.data.token)
                this.$store.commit('user/setUserRole', back.data.role)
                this.$store.commit('user/serUserId', back.data.userId)
                this.transition()
            } catch (err) {
                console.log(err);
            }
            this.email = this.password = ''
        },

        /** OpenId Login */
        loginOpenId: function () {
            const opUrl = OpenIdConfiguration.SERVER_URL
            const clientId = OpenIdConfiguration.CLIENT_ID
            // front-end redirect url
            const redirectUri = "http://localhost:3000/openid/callback"
            // Open OpenId Login form
            let url = opUrl + "/auth?client_id=" + clientId + "&scope=openid%20email&response_type=code&redirect_uri=" + redirectUri
            window.open(url,'popUpWindow','height=500,width=600,left=960, top=0')
        },

        /** 画面遷移 */
        transition() {
            if ( !this.$store.state.user.loginToken || !this.$store.state.user.userRole ) { return }
            switch ( this.$store.state.user.userRole ) {
                    case 'admin':
                        this.$router.push('/admin/travelers')
                        break
                    case 'traveller':
                        this.$router.push('/travelers/view')
                        break
                    case 'shop':
                        this.$router.push('/shop')
                        break
                }
        },
        mounted() {
            // ログイン済みなら遷移
            this.transition()
        }
    }
}
</script>

<style>
</style>
