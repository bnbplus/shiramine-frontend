<template>
  <section class="section">


        <b-tabs>
            <b-tab-item label="来店者リスト">
                <b-table
                    :data="data"
                    :columns="columns"
                    :checked-rows.sync="checkedRows"
                    checkable
                    :checkbox-position="checkboxPosition">

                </b-table>
            </b-tab-item>
        </b-tabs>
  </section>
</template>

<script>
export default {
        data() {
            const data = [
                { 'id': 1, 'name': 'JesseSimmons', 'age': '14', 'gender': '男' },
                { 'id': 2, 'name': 'JohnJacobs', 'age': '20', 'gender': '男' },
                { 'id': 3, 'name': 'TinaGilbert', 'age': '18', 'gender': '女' },
                { 'id': 4, 'name': 'ClarenceFlores', 'age': '35', 'gender': '男' },
                { 'id': 5, 'name': 'AnneLee', 'age': '10', 'gender': '女' }
            ]

            return {
                data,
                checkboxPosition: 'right',
                checkedRows: [data[1], data[3]],
                columns: [
                    {
                        field: 'id',
                        label: 'ID',
                        width: '40',
                        numeric: true
                    },
                    {
                        field: 'name',
                        label: 'Name',
                    },
                    {
                        field: 'age',
                        label: 'Age',
                    },
                    {
                        field: 'gender',
                        label: 'Gender',
                    }
                ]
            }
        }
    }
</script>

<style>

</style>