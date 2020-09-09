<template>
    <div class="table-container">
        <b-select v-model="checkboxPosition">
            <option value="yukidaruma">雪だるまカフェ</option>
            <option value="shinsa">志んさ</option>
        </b-select>
        <b-table
            :data="data"
            :debounce-search="1000"
        >
            <template slot-scope="p">
                <b-table-column :field="columns[0].field" :label="columns[0].label">{{ p.row.id }}</b-table-column>
                <b-table-column :field="columns[1].field" :label="columns[1].label">{{ p.row.name }}</b-table-column>
                <b-table-column :field="columns[2].field" :label="columns[2].label">{{ p.row.role }}</b-table-column>
            </template>

        </b-table>
    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>