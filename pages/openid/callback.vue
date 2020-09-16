<template>
</template>

<script>
import jwt from 'jsonwebtoken'
/**
 * This page is used for redirect only
 * 1) Get code and session_state from openId server
 * 2) Use code and session_state to get token
 * 3) Save token to local_storage
 * 4) Redirect to openid/tokeninfo page (Please change logic here as you want)
 */
export default {
    async mounted() {
        // Get Code And Session_state to request Token
        const code = this.$route.query.code
        const session_state = this.$route.query.session_state
        const headers = {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic MTIzNDU2Nzg5OjEyMzQ1Njc4OQ==',
        }
        const redirectUri = `${process.env.baseUrl}/openid/callback`
        const grant_type = process.env.bnbGrantType
        const requestBody = `grant_type=${grant_type}&code=${code}&redirect_uri=${redirectUri}&state=${session_state}`
        if (code && session_state) {
            try {
                // Get Token from local OpenId Server
                const res = await this.$axios.post(process.env.bnbTokenEndpoint, requestBody, { headers: headers })
                const access_token = res.data.access_token
                const back_url = await this.serviceLogin(access_token)
                window.opener.location.replace(back_url)
                window.close()
            } catch ( err ) {
                console.log(err);
            }
        }
    },
    methods:{
        async serviceLogin(bnbplusToken) {

            const payload = jwt.decode(bnbplusToken)
            this.$store.commit('user/setBnbToken', bnbplusToken)
            try {
                const back = await this.$axios.post('/login', {
                    bnbplusSubject: payload.sub
                })
                this.$store.commit('user/setLoginToken', back.data.token)
                this.$store.commit('user/setUserRole', back.data.role)
                this.$store.commit('user/serUserId', back.data.userId)
                switch ( back.data.role ) {
                    case 'admin':
                        return `${process.env.baseUrl}/admin/travelers`
                    case 'villager':
                    case 'traveller':
                        return `${process.env.baseUrl}/travelers/view`
                    case 'shop':
                        return `${process.env.baseUrl}/shop`
                    default:
                        return `${process.env.baseUrl}/first`
                }
            } catch ( err ) {
                return `${process.env.baseUrl}/first`
            }
        }
    }
}
</script>

<style>
</style>