<template>
    <section class="section">

        <form>

            <h1 class="title">ロゴ</h1>
        
            <b-field label="Email">
                <b-input type="email" maxlength="100" />
            </b-field>

            <b-field label="Password">
                <b-input type="password" maxlength="100" password-reveal />
            </b-field>

            <b-button native-type="submit">
                ログイン
            </b-button>

        </form>

    </section>
</template>

<script>
export default {
}
</script>

<style>

</style>