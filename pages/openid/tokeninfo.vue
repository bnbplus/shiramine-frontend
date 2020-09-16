<template>
    <section>
        <div v-if="access_token != null" class="container">
            <h1 class="title">Token Information</h1>
            <b-field label="Token:">
                <div class="accessToken">{{ access_token }}</div>
            </b-field>

            <b-field label="Decoded Token:">
                <div>
                    <div>sub (OpenId Server User ID): <br> <span style="color: purple"> {{ decoded_token['sub'] }}</span></div>
                    <div>jti: <br> <span style="color: purple"> {{ decoded_token['jti'] }}</span></div>
                    <div>iss: <br> <span style="color: purple"> {{ decoded_token['iss'] }}</span></div>
                    <div>iat: <br> <span style="color: purple"> {{ decoded_token['iat'] }}</span></div>
                    <div>exp: <br> <span style="color: purple"> {{ decoded_token['exp'] }}</span></div>
                    <div>scope: <br> <span style="color: purple"> {{ decoded_token['scope'] }}</span></div>
                    <div>aud: <br> <span style="color: purple"> {{ decoded_token['aud'] }}</span></div>
                </div>
            </b-field>
        </div>
        <div v-else class="container">>
            <h1 class="title">No Token Response</h1>
        </div>
    </section>
</template>

<style>
    .container {
        display: flex;
        flex-wrap: wrap;
    }
    .accessToken {
        color: blue;
        word-break: break-all;
    }
</style>

<script>

// FIXME: このファイルあとでけす

import jwt from 'jsonwebtoken'
export default {
    data () {
        return {
            access_token: null,
            decoded_token: {},
        }
    },
    methods: {
       
    },
    mounted() {
        this.access_token = this.$store.state.user.bnbToken
        this.decoded_token = this.access_token ? jwt.decode(this.access_token) : {}
    },
}
</script>

<style>
</style>