<template>
    <section class="section">

        <form @submit.prevent="login" action="/">

            <h1 class="title">ロゴ</h1>
        
            <b-field label="Email">
                <b-input type="email" v-model="email" maxlength="100" />
            </b-field>

            <b-field label="Password">
                <b-input type="password" v-model="password" maxlength="100" password-reveal />
            </b-field>

            <b-button native-type="submit">
                ログイン
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
                    case 'keyperson':
                        // FIXME: goto keyperson page
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