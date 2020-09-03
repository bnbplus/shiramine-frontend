<template>
  <form @submit.prevent="sendData">
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
        <div class="has-text-centered buttons" style="margin-top:20px">
            <b-button native-type="submit" type="is-primary" expanded>
                登録
            </b-button>
        </div>
    </form>
</template>

<script>
export default {

}
</script>

<style>

</style>