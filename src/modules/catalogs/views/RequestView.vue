<template>
    <div>
        <h3 class="title">Solcitudes</h3>
        <div class="row mb-2">
            <div class="col-sm-5">
                Buscar
                <input type="text" class="form-control" v-model="term" placeholder="Eje. id, descripcion o dependencia">
            </div>
        </div>
        <div v-if="requestByTerm.length > 0" v-for="item in requestByTerm" class="nost-request-list nost-margins" >   
            <Request class="mb-2" :id="item.id" :Dependencie="item.Dependencia.name" :Fecha_Impresion="item.Fechas.fecha_impresion" :Description="item.Descripcion" :Type="item.Tipo.name" />
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
import Request from '@/modules/catalogs/components/Request.vue'
import Swal from 'sweetalert2'

export default {
    data() {
        const resp = {
            Num_Oficio: '',
            Fecha_respuesta_depto: '',
            Observación: '',
            Estatus: 0,
        }

        return {
            term: '',
            Date: '',
            main: {
                Description: ''
            },
            resp,
            list: false
        }
    },

    components: {
        Request
    },

    methods: {
        Editar() {
            this.requests[0].Description = this.main.Description
            Swal.fire(
                '¡Buen Trabajo!',
                'Se ha editado correctamente la solicitud',
                'success'
            )
        },
    },

    mounted() {
        //this.main.Description = this.requests[0].Description
        if(this.requests.length != 0) {
            this.list = true
        }
        const fecha = new Date()
        var day = fecha.getDate();
        if(day < 10) {
            day = `0${day}`
        }
        var month = fecha.getMonth() + 1;
        if(month <= 10) {
            month = `0${month}`;
        }
        const year = fecha.getFullYear();
        
        this.resp.Fecha_respuesta_depto = `${ year }-${ month }-${ day }`
    },

    computed: {
        ...mapState('catalogs', ['requests']),
        ...mapGetters('catalogs', ['getRequestByTerm']),
        requestByTerm() {
            return this.getRequestByTerm( this.term )
        },
        
    },
}
</script>

<style scoped>
    .id{
        font-size: 20px;
        font-weight: 600;
    }

    .desciption {
        font-size: 15px;
    }

    .nost-request-list {
        display: flex;
        flex-direction: column;
    }
    .nost-request-list .nost-list .Type {
        color: #9b9b9b
    }

    .nost-list {
        font-size: 14px;
        background-color: var(--bg-color-cards);
        color: var(--tx-color);
        cursor: pointer;
    }

    .nost-list .Type {
        font-size: 12px;
    }
    .nost-padding {
        padding: 1rem;
    }
    .nost-margins{
        display: flex;
        row-gap: .5rem;
    }
    .nost-column{
        display: flex;
        flex-direction: column;
    }
    .nost-list-buttons{
        height: 100%;
        width: 100%;
        font-size: 2.5rem !important;
    }
    .nost-list-buttons .ico-item{
        transition: all ease .10s;
    }
    .nost-list-buttons:hover .ico-item{
        transform: rotate(12deg);
        transition: all ease .10s;
    }

    .butosn-container {
        display: flex;
        column-gap: 1.2rem;
    }
</style>