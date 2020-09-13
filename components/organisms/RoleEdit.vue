<template>
    <form @submit.prevent="editRole">
        <b-field>
            <b-select v-model="formRole">
                <option :value="traveller">
                    旅人
                </option>
                <option :value="villager">
                    村人
                </option>
                <option :value="shop">
                    店員
                </option>
            </b-select>
            <b-button native-type="submit" type="is-link" style="left:5%">
                登録
            </b-button>
        </b-field>
    </form>
</template>

<script>
export default {
    data() {
        return {
            formRole: null
        }
    },
    methods: {
        async editRole() {
            try {
                const back = await this.$axios.$post(`/user/edit/${this.$store.state.user.userId}`, {
                        role: this.formRole,
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