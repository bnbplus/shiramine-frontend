<template>
    
</template>

<script>

import axios from 'axios'

export default {
    mounted() {
        // Get Code And Session_state to request Token
        const code = this.$route.query.code
        const session_state = this.$route.query.session_state

        // Headers
        const headers = {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic MTIzNDU2Nzg5OjEyMzQ1Njc4OQ==',
        }

        // This RedirectUri == RedirectUri on login_openId function() at Login.vue
        const redirectUri = "http://localhost:3000/openid/callback"

        // We use authorization_code type
        const grant_type = "authorization_code"

        // Data
        const data = "grant_type=" + grant_type + "&code=" + code + "&redirect_uri=" + redirectUri + "&state=" + session_state

        if (code && session_state) {
            // Get Token from local OpenId Server
            axios.post('http://localhost:3001/token', data, { headers: headers })
            .then((response) => {
                // Access_token
                const access_token = response.data.access_token

                console.log(access_token)

                // Save it at LocalStorage
                window.localStorage.setItem("access_token", access_token)

                console.log(window.opener)
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