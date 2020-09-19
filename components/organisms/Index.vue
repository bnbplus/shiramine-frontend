<template>
    <section class="section">
        <div class="columns is-mobile centerdiv">
            <div class="column" style="margin-left:auto; margin-right:auto">
                <img src="@/assets/img/shiramine_logo_type1_grade.png" style="width:60%">
                <form>
                    <b-button @click="loginOpenId" size="is-large">
                        BNB＋でログイン
                    </b-button>
                </form>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    methods: {
        /** ログイン処理 */
        loginOpenId() {
            const opUrl = process.env.bnbServerUrl
            const clientId = process.env.bnbClientId
            const redirectUri = `${process.env.baseUrl}/openid/callback`
            const url = `${opUrl}/auth?client_id=${clientId}&scope=openid%20email&response_type=code&redirect_uri=${redirectUri}`
            console.log(url);
            window.open(url,'popUpWindow','height=500,width=600,left=960,top=0')
        }
    },
    mounted() {
        console.log(('hello'));
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