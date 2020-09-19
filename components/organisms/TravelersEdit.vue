<template>
    <form @submit.prevent="editUser">
        <b-field label="名前"> 
            <b-input v-model="formName" ></b-input>
        </b-field>
        <b-field label="BLEタグ番号">
            <b-input v-model="formBlenum"></b-input>
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
        blenum:{
            type: String,
            requiered: true
        }
    },
    data() {
        return {
            formName: null,
            formBlenum: null,
        }
    },
    mounted() {
        this.formName = this.name
        this.formBlenum = this.blenum
    },
    methods: {
        async editUser() {
            try {
                const back = await this.$axios.$post(`/user/edit/${this.id}`, {
                        name: this.formName,
                        bleNumber: this.formBlenum
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