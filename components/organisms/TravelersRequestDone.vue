<template>
    <form @submit.prevent="doneRequest">
        <b-field label="おねがいを解決してくれた人">
            <b-select v-model="formSolutioner">
                <option v-for="(option, i) in data" :value="option.id" :key="i">
                    {{ option.name }}
                </option>
            </b-select>
        </b-field>
        <div class="has-text-centered buttons" style="margin-top:20px">
            <b-button native-type="submit" type="is-link" @click="$router.push(`/travelers/view`)" expanded>
                完了
            </b-button>
        </div>
    </form>
</template>

<script>
export default {
    data(){
        return{
            formSolutioner:null
        }
    },
    props: {
        id:{
            type: Number,
            default:''
        },
        data:{
            type: Array,
            default:[]
        }
    },
    methods: {
        async doneRequest () {
            try {
                const back = await this.$axios.$post(`/request/done/${this.id}`, {
                    solutioner: this.formSolutioner
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