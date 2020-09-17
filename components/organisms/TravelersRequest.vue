<template>
    <div class="box">
        <article class="media">
            <div class="media-content">
                <div class="content">
                    <b-table
                        :data="data"
                        :debounce-search="1000"
                        :mobile-cards="false"
                    >
                        <template slot-scope="p">
                            <b-table-column :field="columns[0].field" :label="columns[0].label" width="60%" style="white-space:pre-wrap;word-wrap:break-word;">{{ insertBr(p.row.information) }}</b-table-column>
                            <b-table-column :field="columns[1].field" :label="columns[1].label" width="35%">{{ !p.row.solutioner ? 'なし' : p.row.solutioner }}</b-table-column>
                            <b-dropdown aria-role="list" class="is-pulled-right" position="is-bottom-left">
                                <b-icon icon="dots-vertical" slot="trigger"></b-icon>
                                <b-dropdown-item aria-role="listitem" @click="$router.push(`/travelers/requestdone/${p.row.id}`)">完了</b-dropdown-item>
                                <b-dropdown-item aria-role="listitem" @click="$router.push(`/travelers/requestedit/${p.row.id}`)">編集</b-dropdown-item>
                                <b-dropdown-item aria-role="listitem" v-on:click.native="requestDelete(p.row.id)">削除</b-dropdown-item>
                            </b-dropdown>
                        </template>
                    </b-table>
                    <div class="has-text-centered buttons" style="margin-top:20px">
                        <b-button type="is-primary" tag="router-link" :to="`/travelers/requestadd`" expanded>
                            追加
                        </b-button>
                    </div>
                </div>
            </div>
        </article>
    </div>
</template>

<script>
export default {
    name: 'TravelersRequest',
    props:{
        data:{
            type: Array,
            requiered: true
        },
        columns:{
            type: Array,
            requiered: true
        }
    },
    methods:{
        async requestDelete(deleteId) {
            try {
                console.log(deleteId);
                
                const back = await this.$axios.get(`/request/delete/${deleteId}`, {
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8',
                        Authorization: this.$store.state.user.loginToken
                    }
                })
            } catch (err) {
                console.log(err);
            }
        },
        insertBr(text) {
            try {
                const out = text.match(/.{20}/g).join('\n')
                return out
            } catch ( err ) {
                return ''
            }
        }
    }
}
</script>

<style>

</style>