<template>
    <b-table :data="data" :columns="searchColumns"></b-table>
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
        this.searchColumns = this.columns;
        for(const num in  this.searchColumns){
            this.searchColumns[num].searchable = true;
        }
    },
    data(){
        return {
            searchColumns: []
        }
    }
}
</script>