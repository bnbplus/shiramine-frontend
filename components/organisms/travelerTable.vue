<template> 
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
                            <b-table-column :field="columns[0].field" :label="columns[0].label">{{ p.row.place }}</b-table-column>
                            <b-table-column :field="columns[1].field" :label="columns[1].label">{{ p.row.time }}</b-table-column>
                        </template>

                        </b-table>
                    </div>
                </div>
            </div>
        </article>
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