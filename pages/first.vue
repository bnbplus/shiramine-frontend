<template>
    <section class="section">
        <div class="container column is-10">
            <div class="box">
                <article class="media">
                    <div class="media-content">
                        <div class="content">
                            <h1>ようこそ</h1>
                            <b-field label="名前" style="margin-top:5%">
                                <b-input v-model="name"></b-input>
                            </b-field>
                            <br />
                            <strong>立場</strong>
                            <b-select name="role" v-model="role">
                                <option value="" style="display:none;">立場</option>
                                <option value="traveller">旅人(参加者)</option>
                                <option value="villager">村民</option>
                                <option value="shop">店員</option>
                            </b-select>
                            <b-button native-type="submit" type="is-link" @click="createUser" expanded style="margin-top:5%">
                                送信
                            </b-button>
                        </div>
                    </div>
                </article>
            </div>
        </div>
    </section>
</template>

<script>
import jwt from 'jsonwebtoken'

export default {
    data() {
        return {
            name: '',
            role: '',
            bnbSub: '',
        }
    },
    created() {
        this.bnbSub = jwt.decode(this.$store.state.user.bnbToken).sub
    },
    methods: {
        async createUser() {
            const param = {
                name: this.name,
                bnbplusSubject: this.bnbSub,
                role: this.role,
            }
            try {
                await this.$axios.$post(`/user/create`, param, {
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8',
                        Authorization: this.$store.state.user.loginToken
                    },
                })
                const back = await this.$axios.post('/login', {
                    bnbplusSubject: this.bnbSub
                })
                this.$store.commit('user/setLoginToken', back.data.token)
                this.$store.commit('user/setUserRole', back.data.role)
                this.$store.commit('user/serUserId', back.data.userId)
                switch ( back.data.role ) {
                    case 'admin': return this.$router.push('/admin/travelers')
                    case 'traveller': return this.$router.push('/travelers/view')
                    case 'villager': return this.$router.push('/travelers/view')
                    case 'shop': return this.$router.push('/shop')
                }
            } catch ( err ) {
                console.log(err);
            }
        },
    }
}
</script>

<style>

</style>