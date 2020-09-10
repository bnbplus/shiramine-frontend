<template>
    <form @submit.prevent="sendData">
        <b-field label="名前"> 
            <b-input v-model="name" ></b-input>
        </b-field>
        <b-field label="メールアドレス">
            <b-input v-model="email" type="number"></b-input>
        </b-field>
        <b-field label="頼みごと">
            <b-input v-model="request"></b-input>
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
    
    props:{
        name:{
            type: String,
            requiered: true
        },
        age:{
            type: Number,
            requiered: true
        },
        request:{
            type: String,
            requiered: true
        }
    },
    methods: {
        sendData() {
            console.log(this.name, this.age);
        }
    }
}
</script>

<style>

</style>