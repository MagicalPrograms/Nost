<template>
    <div>
        <h3>Analytics</h3>
        <div class="row">
            <div class="col-sm-12">
                <Chart :Datas="dataMes" :Categos="CategoriesMes" name="Mensual" title="Solicitudes Mensuales" ChartType="area" />
            </div>
        </div>
        <div class="row">
            <div class="col-sm-4">
                <Chart :Datas="dataType" :Categos="CategoriesType" name="Tipo" title="Tipo de Solicitudes" ChartType="bar"/>
            </div>
        </div>
    </div>
</template>

<script>
    //import { mapState } from 'vuex'
    
    import { mapState } from 'vuex';
    import Chart from '../components/ChartLine.vue'
    
    export default {
        components: {
            Chart
        },

        computed: {
            ...mapState('analytics', ['dataMes', 'CategoriesMes', 'dataType', 'CategoriesType'])
        },

        mounted() {
            console.log(this.data);
        },
    }
</script>

<style lang="scss" scoped>

</style>