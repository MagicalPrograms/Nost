<template>
    <div>
        <h3>Lista de Formatos</h3>
        <div class="conetentList">
            <formats />
        </div>
    </div>
</template>

<script>
import formats from '@/modules/formatos/components/formats.vue'
export default {
    data() {
        return {
            
        }
    },

    components: {
        formats
    }
}
</script>

<style scoped>
    .conetentList {
        display: grid;
        column-gap: 1rem;
        row-gap: 1rem;
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    }
</style>