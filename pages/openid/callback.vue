<template>

</template>

<script>
import OpenIdConfiguration from "@/constant/openid_config";
import axios from 'axios'

/**
 * This page is used for redirect only
 * 1) Get code and session_state from openId server
 * 2) Use code and session_state to get token
 * 3) Save token to local_storage
 * 4) Redirect to openid/tokeninfo page (Please change logic here as you want)
 */
export default {
    mounted() {
        // Get Code And Session_state to request Token
        const code = this.$route.query.code
        const session_state = this.$route.query.session_state
        const headers = {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic MTIzNDU2Nzg5OjEyMzQ1Njc4OQ==',
        }
        const redirectUri = "http://localhost:3000/openid/callback"
        const grant_type = OpenIdConfiguration.GRANT_TYPE
        const requestBody = "grant_type=" + grant_type + "&code=" + code + "&redirect_uri=" + redirectUri + "&state=" + session_state
        if (code && session_state) {
            // Get Token from local OpenId Server
            axios.post(OpenIdConfiguration.TOKEN_ENDPOINT, requestBody, { headers: headers })
            .then((response) => {
                const access_token = response.data.access_token
                console.log(access_token)

                // Save token to LocalStorage
                window.localStorage.setItem("access_token", access_token)
                window.opener.location.replace('http://localhost:3000/openid/tokeninfo');
                window.close();
            })
            .catch((error) => {
                console.log(error)
            })
        }
    },

}
</script>

<style>

</style>
