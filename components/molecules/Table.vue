<template>
    <div>
        <b-table 
            :data="data"
            :columns="columns"
            :debounce-search="1000"
        >
    
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
    }
}
</script>