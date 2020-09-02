<template>
    <form>
        <b-field label="BLEタグ">
                <b-input v-model="bletag"></b-input>
        </b-field>
        <b-field label="名前">
            <b-input v-model="name"></b-input>
        </b-field>
        <b-field label="年齢">
            <b-input v-model="age"></b-input>
        </b-field>
        <b-button native-type="submit">
            変更
        </b-button>
    </form>
</template>

<script>
export default {
    data() {
        return {
            bletag: 'BLETAG',
            name: 'NAME',
            age: 'AGE'
        }
    }
}
</script>

<style>

</style>