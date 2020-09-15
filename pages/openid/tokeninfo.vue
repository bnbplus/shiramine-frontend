<template>
    <section>       
        <div v-if="access_token != null" class="container">
            <h1 class="title">Information</h1>
            <b-field label="Access Token:">
                <div class="accessToken">{{ access_token }}</div>
            </b-field>

            <b-field label="Decode Access Token:">
                <div>
                    <div>sub (Your Id in our OpenId Server): <br> <span style="color: purple"> {{ sub }}</span></div>
                    <div>jti: <br> <span style="color: purple"> {{ jti }}</span></div>
                    <div>iss: <br> <span style="color: purple"> {{ iss }}</span></div>
                    <div>iat: <br> <span style="color: purple"> {{ iat }}</span></div>
                    <div>exp: <br> <span style="color: purple"> {{ exp }}</span></div>
                    <div>scope: <br> <span style="color: purple"> {{ scope }}</span></div>
                    <div>aud: <br> <span style="color: purple"> {{ aud }}</span></div>
                </div>
            </b-field>
        </div>
        <div v-else>
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

import jwt_decode from "jwt-decode";

export default {
    data () {
        return {
            access_token: null,
            jti: '',
            sub: '',
            iss: '',
            iat: '',
            exp: '',
            scope: '',
            aud: ''
        }
    },
    mounted() {
        this.access_token = window.localStorage.getItem('access_token') ? window.localStorage.getItem('access_token') : null
        
        // Decode Token
        const decoded = this.access_token ? jwt_decode(this.access_token) : null

        if(decoded != null) {
            this.sub = decoded.sub    
            this.jti = decoded.jti
            this.iss = decoded.iss
            this.iat = decoded.iat
            this.exp = decoded.exp
            this.scope = decoded.scope
            this.aud = decoded.aud
        }   
    },
}
</script>

<style>

</style>