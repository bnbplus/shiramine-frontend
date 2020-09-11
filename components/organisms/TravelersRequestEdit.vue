<template>
    <form @submit.prevent="editRequest">
        <b-field label="内容"> 
            <b-input v-model="formInformation" maxlength="100" type="textarea"></b-input>
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
    data() {
        return {
            formInformation: null
        }
    },
    mounted() {
        this.formInformation = this.information
    },
    props: {
        id:{
            type: Number,
            default:''
        },
        information: {
            type: String,
            default: ''
        }
    },
    methods: {
        async editRequest () {
            try {
                const back = await this.$axios.$post(`/request/edit/${this.id}`, {
                    information: this.formInformation
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