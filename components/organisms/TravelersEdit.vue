<template>
    <form @submit.prevent="sendData">
        <b-field label="名前"> 
            <b-input v-model="name" ></b-input>
        </b-field>
        <b-field label="年齢">
            <b-input v-model="age" ></b-input>
        </b-field>
        <b-button native-type="submit">
            変更
        </b-button>
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