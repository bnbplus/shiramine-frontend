<template>
    <section class="section">

        <form>

            <h1 class="title">ログイン</h1>
        
            <!-- <b-field label="Email">
                <b-input type="email" v-model="email" maxlength="100" />
            </b-field>

            <b-field label="Password">
                <b-input type="password" v-model="password" maxlength="100" password-reveal />
            </b-field>

            <b-button native-type="submit">
                ログイン
            </b-button> -->

            <b-button @click="loginOpenId" >
                Login with bnb+
            </b-button>

        </form>

    </section>
</template>

<script>
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
                    case 'null':
                        this.$router.push('first')
                }
        },
        loginOpenId() {
            const opUrl = process.env.bnbServerUrl
            const clientId = process.env.bnbClientId
            const redirectUri = `${process.env.baseUrl}/openid/callback`
            const url = `${opUrl}/auth?client_id=${clientId}&scope=openid%20email&response_type=code&redirect_uri=${redirectUri}`
            console.log(url);
            window.open(url,'popUpWindow','height=500,width=600,left=960,top=0')
        }
    }
}
</script>

<style>
</style>