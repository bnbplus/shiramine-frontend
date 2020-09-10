<template>
  <form @submit.prevent="editPlace">
        <b-field label="名前">
            <b-input v-model="name"></b-input>
        </b-field>
        <b-field label="BLE UUID">
            <b-input v-model="bleuuid"></b-input>
        </b-field>
        <b-field label="緯度">
            <b-input v-model="latitude" type="number"></b-input>
        </b-field>
        <b-field label="経度">
            <b-input v-model="longitude" type="number"></b-input>
        </b-field>
        <b-field label="説明">
            <b-input v-model="description"></b-input>
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
    async editPlace () {
        try {
            const back = await this.$axios.post(`/spot/edit/${this.id}`, {
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    Authorization: store.state.user.loginToken
                },
                name: this.name,
                bleuuid: this.bleuuid,
                latitude: this.latitude,
                longitude: this.longitude,
                description: this.description
            })
        } catch (err) {
            console.log(err);
        }
    },
    
    props:{
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