<template>
    <section>
        <div>
            <h1 class="title" style="margin: 20px 5vw">みんなのお願い</h1>
        </div>
        <div class="box" style="margin:0 5vw" v-for="(onegai, idx) in onegais.filter(x => x.solutioner==null)" :key="idx">
            <article class="media">
                <div class="media-content">
                    <div class="content">
                        <p>
                        <strong> {{ users.find( x => x.id === onegai.userId ).name }}さんのおねがい </strong>
                        <br>
                            <p style="font-size:2em"> {{ onegai.information }} </p>
                            <label> {{ new Date(onegai.createdAt).toLocaleString() }} </label>
                        </p>
                    </div>
                </div>
            </article>
        </div>
    </section>
</template>

<script>
export default {
    layout:'travelers',
    async asyncData({ app, store }) {
        const back = await app.$axios.$get(`/requests`, {
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                Authorization: store.state.user.loginToken
            }
        })
        const back2 = await app.$axios.$get(`/users`, {
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                Authorization: store.state.user.loginToken
            }
        })
        return {
            onegais: back.records,
            users: back2.records
        }
    },
}
</script>

<style>

</style>