<template>
    <div>
        <h3 class="title">Solcitudes</h3>
        <div class="row mb-2">
            <div class="col-sm-5">
                Buscar
                <input type="text" class="form-control" v-model="term" placeholder="Eje. id, descripcion o dependencia">
            </div>
        </div>
        <div class="nost-request-list nost-margins" >   
            <div v-for="item in requestByTerm" class="card nost-list nost-padding" v-b-tooltip.hover :title="item.Dependencie.name">
                <div class="row">
                    <div class="col-sm-8 nost-column">
                        <span class="Type" title="Fecha">{{ item.Fechas.Fecha_Impresion }}</span>
                        <span class="id" title="folio">{{ item.id }}</span>
                        <span class="desciption" title="descripción" >{{ item.Description }}</span>
                        <span class="Type" title="Tipo de solicitud">{{ item.Type.name }} - {{ item.Dependencie.name }} </span>
                    </div>
                    <div class="col-sm-4 butosn-container">
                        <button class="form-control btn btn-primary nost-list-buttons" v-b-tooltip.hover v-b-modal.modal-xl title="Editar" >
                            <i class="uil uil-pen"></i>
                        </button>
                        <button class="form-control btn btn-success nost-list-buttons" v-b-tooltip.hover v-b-modal.Respuesta title="Seguimiento">
                            <i class="uil uil-code-branch"></i>
                        </button>
                        <button class="form-control btn btn-danger nost-list-buttons" v-b-tooltip.hover title="Eliminar"  @click="EliminarSolicitud">
                            <i class="uil uil-trash-alt"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <b-modal id="modal-xl" class="modal-cont" size="xl" title="Respuesta">
            <div class="row mb-2">
                <div class="col-sm-3">
                    Num. de Solicitud
                    <b-input type="text" class="form-control" disabled v-model="requests[0].id"></b-input>
                </div>
            </div>
            <div class="row mb-2">
                <div class="col-sm-12">
                    Descripción
                    <textarea class="form-control"  v-model="main.Description"></textarea>
                </div>
            </div>
            <div class="row mb-2">
                <div class="col-sm-4">
                    Fecha de Respuesta
                    <b-input class="date" type="date" disabled v-model="requests[0].Fechas.Fecha_Respuesta" />
                </div>
                <div class="col-sm-4">
                    Fecha de Aclaración
                    <b-input class="date" type="date" disabled v-model="requests[0].Fechas.Fecha_Aclaracion"/>
                </div>
                <div class="col-sm-4">
                    Fecha de Prorroga
                    <b-input class="date" type="date" disabled v-model="requests[0].Fechas.Fecha_Prorroga"/>
                </div>
            </div>
            <div class="row mb-2">
                <div class="col-sm-3">
                    Tipo de solicitud
                    <b-input type="text" class="form-control" disabled v-model="requests[0].Type.name"/>
                </div>
                <div class="col-sm-9">
                    Dependencia
                    <b-input type="text" class="form-control" disabled v-model="requests[0].Dependencie.name"/>
                </div>
            </div>

            <template #modal-footer>
                <div class="row">
                    <div class="col-sm-6">
                        <button class="form-contro btn btn-success" @click="Editar">Guardar</button>
                    </div>
                </div>
            </template>
        </b-modal>

        <b-modal id="Respuesta" class="modal-cont" size="xl" title="Datos de la Solicitud">
            <div class="row mb-2">
                <div class="col-sm-3">
                    Num. de oficio
                    <b-input type="text" class="form-control" v-model="resp.Num_Oficio"></b-input>
                </div>
            </div>
            
            <div class="row mb-2">
                <div class="col-sm-4">
                    Fecha
                    <b-input class="date" type="date" disabled v-model="resp.Fecha_respuesta_depto"></b-input>
                </div>
                <div class="col-sm-8">
                    Respuesta
                    <input type="file" id="file" ref="myFiles" class="form-control" multiple>
                </div>
            </div>

            <div class="row mb-2">
                <div class="col-sm-12">
                    Observacion
                    <textarea class="form-control"  v-model="resp.Observación"></textarea>
                </div>
            </div>

            <template #modal-footer>
                <div class="row">
                    <div class="col-sm-6">
                        <button class="form-contro btn btn-success" @click="Responder">Guardar</button>
                    </div>
                </div>
            </template>
        </b-modal>
    </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
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
            resp
        }
    },

    methods: {
        ...mapMutations('catalogs', ['deleteRequest']),

        EliminarSolicitud() {
            Swal.fire({
                title: '¿Estas seguro de eliminar la solicitud?',
                text: "Recuerda que una vez ejecutada esta acción no se podra recuperar",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, Eliminar',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.deleteRequest()
                    Swal.fire(
                        '¡Buen Trabajo!',
                        'Se ha Eliminado correctamente la solicitud',
                        'success'
                    )
                } 
            })
            
        },

        Editar() {
            this.requests[0].Description = this.main.Description
            Swal.fire(
                '¡Buen Trabajo!',
                'Se ha editado correctamente la solicitud',
                'success'
            )
        },

        Responder() {
            Swal.fire({
                title: '¿Estas seguro de la respuesta?',
                text: "Recuerda que esta respuesta sera enviada mediante la PNT la cual una vez entregada no ahi regreso",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, Responder',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire(
                        '¡Buen Trabajo!',
                        'Se ha respondido correctamente la solicitud',
                        'success'
                    )
                }
            })
        }
    },

    mounted() {
        this.main.Description = this.requests[0].Description
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
        ...mapState('catalogs', ['name', 'count', 'requests']),
        ...mapGetters('catalogs', ['getRequestByTerm']),
        requestByTerm() {
            return this.getRequestByTerm( this.term )
        }
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