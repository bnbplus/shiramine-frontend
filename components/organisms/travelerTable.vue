<template>
    <div class="table-container">
        <b-table
            :data="data"
            :debounce-search="1000"
            
        >
        <template slot-scope="p">
            <b-table-column :field="columns[0].field" :label="columns[0].label">{{ p.row.id }}</b-table-column>
            <b-table-column :field="columns[1].field" :label="columns[1].label">{{ p.row.first_name }}</b-table-column>
            <b-table-column :field="columns[2].field" :label="columns[2].label">{{ p.row.last_name }}</b-table-column>
            <b-table-column :field="columns[3].field" :label="columns[3].label">{{ p.row.date }}</b-table-column>
            <b-table-column :field="columns[4].field" :label="columns[4].label">{{ p.row.gender }}</b-table-column>
        </template>

        </b-table>
        <h1>{{ columns[0].label }}</h1>
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