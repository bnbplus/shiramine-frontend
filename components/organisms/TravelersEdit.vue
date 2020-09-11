<template>
    <form @submit.prevent="editUser">
        <b-field label="名前"> 
            <b-input v-model="formName" ></b-input>
        </b-field>
        <b-field label="メールアドレス">
            <b-input v-model="formEmail" type="email"></b-input>
        </b-field>
        <div class="has-text-centered buttons" style="margin-top:20px">
            <b-button native-type="submit" type="is-link" @click="$router.push(`/travelers/view`)" expanded>
                変更
            </b-button>
        </div>
    </form>
</template>

<script>
export default {
    props:{
        id:{
            type: Number,
            requiered: true
        },
        name:{
            type: String,
            requiered: true
        },
        email:{
            type: String,
            requiered: true
        }
    },
    data() {
        return {
            formName: null,
            formEmail: null,
        }
    },
    mounted() {
        this.formName = this.name
        this.formEmail = this.email
    },
    methods: {
        async editUser() {
            try {
                const back = await this.$axios.$post(`/user/edit/${this.id}`, {
                        name: this.formName,
                        email: this.formEmail
                    }, {
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8',
                        Authorization: this.$store.state.user.loginToken
                    },
                })
            } catch (err) {
                console.log(err);
            }
        },
    }
}
</script>

<style>

</style>