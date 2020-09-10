<template>
  <form @submit.prevent="editPlace">
        <b-field label="名前">
            <b-input v-model="formName"></b-input>
        </b-field>
        <b-field label="BLE UUID">
            <b-input v-model="formBleuuid"></b-input>
        </b-field>
        <b-field label="緯度">
            <b-input v-model="formLatitude"></b-input>
        </b-field>
        <b-field label="経度">
            <b-input v-model="formLongitude"></b-input>
        </b-field>
        <b-field label="説明">
            <b-input v-model="formDescription"></b-input>
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
            formBleuuid: null,
            formLatitude: null,
            formLongitude: null,
            formDescription: null
        }
    },
    mounted() {
        this.formName = this.name
        this.formBleuuid = this.bleuuid
        this.formLatitude = this.latitude
        this.formLongitude = this.longitude
        this.formDescription = this.description
    },
    methods: {
        async editPlace () {
            try {
                const back = await this.$axios.$post(`/spot/edit/${this.id}`, {
                    name: this.formName,
                    bleUuid: this.formBleuuid,
                    latitude: this.formLatitude,
                    longitude: this.formLongitude,
                    description: this.formDescription
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
    
    props:{
        id:{
            type: Number,
            requiered:true
        },
        name:{
            type: String,
            requiered: true
        },
        bleuuid:{
            type: String,
            requiered: true
        },
        latitude:{
            type: Number,
            requiered: true
        },
        longitude:{
            type:Number,
            requiered: true
        },
        description:{
            type: String,
            requiered: true
        }
    },
}
</script>

<style>

</style>