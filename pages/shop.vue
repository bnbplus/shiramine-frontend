<template>
  <section class="section">
      <shop :data="data" :columns="columns"> </shop>
  </section>
</template>

<script>
import Shop from '~/components/organisms/Shop.vue'

var myData = [
    { 'name': '白峰太郎', 'age': "46"},
    { 'name': '金沢二郎', 'age': "21"},
    { 'name': '白峰太郎', 'age': "46"},
    { 'name': '金沢二郎', 'age': "21"}
]
var myColumns = [
    {
        field: 'name',
        label: '名前',
    },
    {
        field: 'age',
        label: '年齢',
    }
]


export default {
    components:{
        Shop
    },

    data() {
        return {
            data: myData,
            columns: myColumns
        }
    }
}
</script>

<style>

</style>