<template>
    <form @submit.prevent="sendData">
        <b-field label="場所名">
            <b-input v-model="name" ></b-input>
        </b-field>
        <b-field label="BLEゲートウェイのUUID">
            <b-input v-model="bleid"></b-input>
        </b-field>
        <b-field label="その場所に顔認証">
            <b-input v-model="face"></b-input>
        </b-field>
        <b-field label="緯度">
            <b-input v-model="latitude" type="number"></b-input>
        </b-field>
        <b-field label="経度">
            <b-input v-model="longitude" type="number"></b-input>
        </b-field>
        <b-field label="説明">
            <b-input v-model="longitude" maxlength="200" type="textarea"></b-input>
        </b-field>
        <div class="has-text-centered buttons" style="margin-top:20px">
            <b-button native-type="submit" type="is-primary" expanded>
                登録
            </b-button>
        </div>
        
    </form>
</template>

<script>
export default {
    data() {
        return {
            name: '',
            bleid: '',
            face: '',
            latitude: '',
            longitude: ''
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