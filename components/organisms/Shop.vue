<template> 
    <div class="container column is-10">
        <div class="box">
            <article class="media">
                <div class="media-content">
                    <div class="content">
                        <div class="table-container">
                            <b-table
                                :data="data"
                                :debounce-search="1000"
                                
                            >
                            <template slot-scope="p">
                                <b-table-column :field="columns[0].field" :label="columns[0].label">{{ p.row.userId }}</b-table-column>
                                <b-table-column :field="columns[1].field" :label="columns[1].label">{{ p.row.information }}</b-table-column>
                                <b-button tag="router-link" to="/" type="is-link"> 退出 </b-button>
                            </template>

                            </b-table>
                        </div>
                    </div>
                </div>
            </article>
        </div>
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
    mounted() {
        console.log(this.columns);
    }
}
</script>