<template>
    <div>
        <div>
            <h1>新規登録</h1>
            <input type="text" name="name" placeholder="名前" v-model="name"/>
            <br />
            <select name="role" v-model="role">
                <option value="" style="display:none;">立場</option>
                <option value="traveller">旅人(参加者)</option>
                <option value="villager">村民</option>
                <option value="shop">店員</option>
            </select>
            <br />
            <br/>
            <p>
                <h2>内容確認</h2>
                <label>名前: {{name}} </label>
                <br/>
                <label>立場: {{role}} </label>
                <br/>
                <label>BNBTokenSub: {{ bnbSub }} </label>
                <br/>
            </p>
            <button @click="createUser">送信</button>
        </div>
    </div>
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