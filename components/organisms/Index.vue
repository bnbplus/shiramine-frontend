<template>
    <section class="section">
        <div class="columns is-mobile centerdiv">
            <div class="column" style="margin-left:auto; margin-right:auto">
                <img src="@/assets/img/shiramine_logo_type1_grade.png" style="width:60%">
                <form @submit.prevent="login" action="/">
                    <b-button native-type="submit" size="is-large">
                        BNB＋でログイン
                    </b-button>
                </form>
            </div>
        </div>
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
.centerdiv{
    text-align: center; 
    position: absolute; 
    top: 50%; 
    left: 50%; 
    -webkit-transform: translateY(-50%) translateX(-50%); 
    transform: translateY(-50%) translateX(-50%);
}
</style>