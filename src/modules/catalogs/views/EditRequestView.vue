<template>
    <div>
        <h3>Editar Solicitud</h3>
        <div class="card catalog-body">
            <div class="row">
            <div class="col-sm-4">
                Fecha de impresion
                <b-input class="date" type="date" v-model="main_frame.Fechas.fecha_impresion" ></b-input>
            </div>
            <div class="col-sm-4">
                Dependencia responsable
                <v-select label="name" :options="OptionsDependencie" v-model="main_frame.Dependencia" >
                    <div slot="no-options">No se encontraron opciones</div>
                </v-select>
            </div>
            </div>
            <div class="row">
            <div class="col-sm-4">
                No. de folio
                <b-input v-model="main_frame.id" ></b-input>
            </div>
            <div class="col-sm-4">
                Tipo de solicitud
                <v-select label="name" :options="OptionsType" v-model="main_frame.Tipo" >
                    <div slot="no-options">No se encontraron opciones</div>
                </v-select>
            </div>
            <div class="col-sm-4">
                <i class="uil uil-accessible-icon-alt" style="color: dodgerblue"> Formato de accesibilidad</i>
                <v-select label="name" :options="OptionsDiscapacidad" v-model="main_frame.Accesibilidad" >
                    <div slot="no-options">No se encontraron opciones</div>
                </v-select>
            </div>
            </div>
            <div class="row">
            <div class="col-sm-4">
                Medio para recibir notificaciones
                <v-select label="name" :options="OptionsRespuestas" v-model="main_frame.Recepcion" >
                    <div slot="no-options">No se encontraron opciones</div>
                </v-select>
            </div>
            <div class="col-sm-8">
                Correo
                <input class="form-control" v-model="main_frame.correo" />
            </div>
            </div>
            <div class="row">
            <div class="col-sm-6">
                Datos de la solicitud
                <b-textarea class="form-control ta-solicitud" v-model="main_frame.Descripcion" />
            </div>
            <div class="col-sm-6">
                Datos adicionales
                <b-textarea class="form-control ta-solicitud" v-model="main_frame.DescripcionAdicional"></b-textarea>
            </div>
            </div>
            <div class="row">
            <div class="col-sm-4">
                Respuesta a su solicitud
                <b-input class="date" type="date" v-model="main_frame.Fechas.fecha_respuesta" />
            </div>
            <div class="col-sm-4">
                Fecha de aclaracion
                <b-input class="date" type="date" v-model="main_frame.Fechas.fecha_aclaracion" />
            </div>
            <div class="col-sm-4">
                Fecha de prórroga
                <b-input class="date" type="date" v-model="main_frame.Fechas.fecha_prorroga"/>
            </div>
            </div>
            <div class="row" style="font-size: 14px">
            <div class="col-sm-8"></div>
            <div class="col-sm-2">
                <button class="form-control btn btn-danger" @click="regresar">Regresar</button>
            </div>
            <div class="col-sm-2">
                <button class="form-control btn btn-success" @click="Guardar">Guardar</button>
            </div>
            </div>
        </div>

    </div>
</template>

<script>
    import Swal from 'sweetalert2'
    import { mapState, mapMutations } from 'vuex'
    import select from 'vue-select'
    import 'vue-select/dist/vue-select.css';

    export default {
        data() {
            const main_frame = {
                id: '',
                Descripcion: '',
                DescripcionAdicional: '',
                correo: '',
                Dependencia: {
                    id: 0,
                    name: ''
                },
                Tipo: {
                    id: 0,
                    name: ''
                },
                Accesibilidad: {
                    id: 0,
                    name: ''
                },
                Recepcion: {
                    id: 0,
                    name: ''
                },
                Fechas: {
                    fecha_impresion: '',
                    fecha_aclaracion: '',
                    fecha_prorroga: '',
                    fecha_respuesta: ''
                },
                File: []
            }

            return {
                main_frame
            }
        },
        methods: {
            ...mapMutations('catalogs', ['updateRequest']),
            Guardar() {
                try{
                    Swal.fire({
                        title: '¿Estas seguro de querer editar esta solicitud?',
                        text: "Recuerda que una vez ejecutada esta acción no se podra recuperar la información anterior",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Si, Eliminar',
                        cancelButtonText: 'Cancelar'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            this.updateRequest(this.main_frame)
                            Swal.fire(
                                '¡Buen Trabajo!',
                                'Se ha Editado correctamente la solicitud',
                                'success'
                            )
                            this.$router.push('/Request')
                        } 
                    })

                } catch (error) {
                    Swal.fire(
                        '¡Alerta!',
                        '¡Problema detectado! ' + error,
                        'warning'
                    )
                }
            },
            regresar() {
                this.$router.push('/Request')
            }
        },
        components: {
            'v-select': select
        },
        mounted() {
            const { id } = this.$route.params

            const request = this.requests.filter(x => x.id.toLowerCase().includes(id.toLocaleLowerCase()))
            console.log(request);
            if(request.length == 1){
                this.main_frame.id = request[0].id
                this.main_frame.Descripcion = request[0].Descripcion
                this.main_frame.DescripcionAdicional = request[0].DescripcionAdicional
                this.main_frame.correo = request[0].correo
                this.main_frame.Dependencia = request[0].Dependencia
                this.main_frame.Accesibilidad = request[0].Accesibilidad
                this.main_frame.Tipo = request[0].Tipo
                this.main_frame.Recepcion = request[0].Recepcion
                this.main_frame.Fechas.fecha_impresion = request[0].Fechas.fecha_impresion
                this.main_frame.Fechas.fecha_aclaracion = request[0].Fechas.fecha_aclaracion
                this.main_frame.Fechas.fecha_prorroga = request[0].Fechas.fecha_prorroga
                this.main_frame.Fechas.fecha_respuesta = request[0].Fechas.fecha_respuesta
                this.main_frame.File = request[0].File
                console.log(this.main_frame.File);
            }else {
                Swal.fire({
                    title: '¡Alerta!',
                    text: "¡Se encontraron 2 o más solicitudes con el mismo identificador, solicite ayuda al enlace tecnologico!",
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: '¡Ok!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        //redirect
                        this.$router.push('/Request')
                    }
                })
            }
            
            

            //this.main_frame.Dependencia = this.OptionsDependencie[0]
            //this.main_frame.Tipo = this.OptionsType[0]
            //this.main_frame.Accesibilidad = this.OptionsDiscapacidad[0],
            //this.main_frame.Recepcion = this.OptionsRespuestas[0]
        },
        computed: {
            ...mapState('catalogs', ['requests', 'OptionsType', 'OptionsDiscapacidad', 'OptionsRespuestas', 'OptionsDependencie']),
        }
    }
</script>

<style scoped>
    .row{
        margin-bottom: 1rem;
    }
    .catalog-body {
        padding: 1rem;
        display: grid;
        row-gap: .5rem;
        font-size: 13.5px;
        background-color: var(--bg-color-cards);
        color: var(--tx-color);
    }
    input, select, button, textarea {
        font-size: 13.5px !important;
    }

    textarea {
        height: 6rem !important;
        max-height: 6rem !important;
    }
</style>