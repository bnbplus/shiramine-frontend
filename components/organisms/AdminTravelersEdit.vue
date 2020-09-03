<template>
    <form @submit.prevent="sendData">
        <b-field label="BLEタグ">
            <b-input v-model="bletag"></b-input>
        </b-field>
        <b-field label="名前">
            <b-input v-model="name"></b-input>
        </b-field>
        <b-field label="年齢">
            <b-input v-model="age" type="number"></b-input>
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
            bletag: 'BLETAG',
            name: 'NAME',
            age: 34
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