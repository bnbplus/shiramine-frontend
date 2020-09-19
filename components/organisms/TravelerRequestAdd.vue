<template>
    <form @submit.prevent="addRequest">
        <b-field label="説明">
            <b-input v-model="information" maxlength="100" type="textarea"></b-input>
        </b-field>
        <div class="has-text-centered buttons" style="margin-top:20px">
            <b-button native-type="submit" type="is-primary" @click="$router.push(`/travelers/view`)" expanded>
                登録
            </b-button>
        </div>
        
    </form>
</template>

<script>
export default {
    data() {
        return {
            information: null
        }
    },
    methods: {
        async addRequest () {
            try {
                const back = await this.$axios.$post(`/request/create/user/${this.$store.state.user.userId}`, {
                    information: this.information
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
    },
}
</script>

<style>

</style>