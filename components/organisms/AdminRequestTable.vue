<template>
    <div class="table-container">
        <b-table
            :data="data"
            :debounce-search="1000"
        >
            <template slot-scope="p">
                <b-table-column :field="columns[0].field" :label="columns[0].label">{{ p.row.id }}</b-table-column>
                <b-table-column :field="columns[1].field" :label="columns[1].label">{{ p.row.userId }}</b-table-column>
                <b-table-column :field="columns[2].field" :label="columns[2].label">{{ p.row.information }}</b-table-column>
                <b-button style="margin-left:10px;" tag="router-link" :to="`/admin/requestedit/${p.row.id}`" type="is-link"> 変更 </b-button>
                <b-button style="margin-left:10px;" tag="router-link" to="" type="is-link" v-on:click.native="requestDelete(p.row.id)"> 削除 </b-button>
            </template>
        </b-table>
    </div>
</template>

<script>
export default {
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