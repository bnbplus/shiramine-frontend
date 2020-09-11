<template>
    <div class="box">
        <article class="media">
            <div class="media-content">
                <div class="content">
                    <div class="table-container">
                        <b-table
                            :data="data"
                            :debounce-search="1000"
                            :mobile-cards="false"
                        >
                            <template slot-scope="p">
                                <b-table-column :field="columns[0].field" :label="columns[0].label">{{ p.row.information }}</b-table-column>
                                <b-dropdown aria-role="list" class="is-pulled-right" position="is-bottom-left">
                                    <b-icon icon="dots-vertical" slot="trigger"></b-icon>
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
            </div>
        </article>
    </div>
</template>

<script>
// <b-button style="margin-left:10px;" tag="router-link" :to="`/travelers/requestedit/${p.row.id}`" type="is-link"> 変更 </b-button>
// <b-button style="margin-left:10px;" tag="router-link" to="" type="is-link" v-on:click.native="requestDelete(p.row.id)"> 削除 </b-button>
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
    }
}
</script>

<style>

</style>