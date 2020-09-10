<template>
    <form @submit.prevent="addPlace">
        <b-field label="場所名">
            <b-input v-model="name" ></b-input>
        </b-field>
        <b-field label="BLEゲートウェイのUUID">
            <b-input v-model="bleUuid"></b-input>
        </b-field>
        <b-field label="BNB+のSub">
            <b-input v-model="bnbSub"></b-input>
        </b-field>
        <b-field label="緯度">
            <b-input v-model="latitude"></b-input>
        </b-field>
        <b-field label="経度">
            <b-input v-model="longitude"></b-input>
        </b-field>
        <b-field label="説明">
            <b-input v-model="description" maxlength="200" type="textarea"></b-input>
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
            name: null,
            bleUuid: null,
            bnbSub: null,
            latitude: null,
            longitude: null,
            description: null
        }
    },
    methods: {
        async addPlace () {
            try {
                const back = await this.$axios.$post(`/spot/create`, {
                    name: this.name,
                    bleUuid: this.bleUuid,
                    bnbSub: this.bnbSub,
                    latitude: this.latitude,
                    longitude: this.longitude,
                    description: this.description
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