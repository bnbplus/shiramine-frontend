<template>
    <form @submit.prevent="editUser">
        <b-field label="名前">
            <b-input v-model="formName"></b-input>
        </b-field>
        <b-field label="種類"> 
            <b-input v-model="formRole"></b-input>
        </b-field>
        <b-field label="BLEタグ">
            <b-input v-model="formBleNumber"></b-input>
        </b-field>
        <div class="has-text-centered buttons" style="margin-top:20px">
            <b-button native-type="submit" type="is-primary" expanded>
                変更
            </b-button>
        </div>
    </form>
</template>

<script>
export default {
    data() {
        return {
            formName: null,
            formRole: null,
            formBleNumber: null
        }
    },
    mounted() {
        this.formName = this.name
        this.formRole = this.role
        this.formBleNumber = this.bleNumber
    },
    props: {
        id:{
            type: Number,
            default:''
        },
        name: {
            type: String,
            default: '',
        },
        formBleNumber: {
            type: String,
            default: ''
        },
        role: {
            type: String,
            default: ''
        }
    },
    methods: {
        async editUser () {
            try {
                const back = await this.$axios.$post(`/user/edit/${this.id}`, {
                    name: this.formName,
                    role: this.formRole,
                    bleNumber: this.formBleNumber
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