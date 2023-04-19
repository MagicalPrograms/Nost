<template>
    <div>
        <h3 class="title">Solcitudes</h3>
        <div class="row mb-2">
            <div class="col-sm-6">
                Buscar
                <input type="text" class="form-control" v-model="term" placeholder="Eje. id, descripcion o dependencia">
            </div>
            <div class="col-sm-3">
                Desde
                <input type="date" class="form-control" v-model="filtros.Desde" placeholder="Eje. id, descripcion o dependencia">
            </div>
            <div class="col-sm-3">
                Hasta
                <input type="date" class="form-control" v-model="filtros.Hasta" placeholder="Eje. id, descripcion o dependencia">
            </div>
        </div>
        <div v-if="requests.length > 0">
            <div v-for="item in requestByTerm" class="nost-request-list nost-margins" >   
                <Request class="mb-2" 
                    :id="item.Folio" 
                    :Dependencie="item.NameDependencia" 
                    :Fecha_Impresion="item.Fecha_Impresion" 
                    :Description="item.Descripcion" 
                    :Type="item.NameTipoSolicitud" 
                />
            </div>
        </div>
        <div v-else>
            <h4>Sin Registros</h4>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';
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

        const filtros = {
            Desde: '',
            Hasta: '',
            Todos: true
        }

        return {
            term: '',
            Date: '',
            main: {
                Description: ''
            },
            resp,
            list: false,
            filtros
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

        ...mapActions('catalogs', ['getRequests']),
    },

    async mounted() {
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
        this.resp.Fecha_respuesta_depto = `${ year }-${ month }-${ day }`
        //this.filtros.desde = `${ year }-${ month }-${ day }`
        //this.filtros.hasta = `${ year }-${ month }-${ day }`
        this.filtros.Desde = `2023-01-01`
        this.filtros.Hasta = `${ year }-${ month }-${ day }`

        const { ok } = await this.getRequests(this.filtros)

        if(!ok) {
            Swal.fire(
                '¡Alerta!',
                'Error al intentar cargar las solicitudes. notifica al informatico..',
                'warning'
            )
        }
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