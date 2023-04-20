<template>
    <div>
        <h3>Editar Solicitud</h3>
        <div class="card catalog-body mb-2">
            <div class="row">
            <div class="col-sm-4">
                Fecha de impresion
                <b-input class="date" type="date" disabled v-model="main_frame.Fechas.fecha_impresion" ></b-input>
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
                <b-input v-model="main_frame.Folio" ></b-input>
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
                <div class="col-sm-4">
                    Correo
                    <input class="form-control" v-model="main_frame.correo" />
                </div>
                <div class="col-sm-4">
                    Evidencia
                    <input type="file" id="file" ref="myFiles" class="form-control" multiple>
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
                <b-input class="date" type="date" disabled v-model="main_frame.Fechas.fecha_respuesta" />
            </div>
            <div class="col-sm-4">
                Fecha de aclaracion
                <b-input class="date" type="date" disabled v-model="main_frame.Fechas.fecha_aclaracion" />
            </div>
            <div class="col-sm-4">
                Fecha de prórroga
                <b-input class="date" type="date" disabled v-model="main_frame.Fechas.fecha_prorroga"/>
            </div>
            </div>
            <div class="row" style="font-size: 14px">
                <div class="col-sm-8"></div>
                <div v-show="user_main.rol == 'Administrador'" class="col-sm-4">
                    <button class="form-control btn btn-success" @click="SaveData">Guardar</button>
                </div>
            </div>
        </div>

        <h3>Oficio de Solicitud</h3>
        <div class="card catalog-body mb-2">
            <div class="row" style="height: 500px;">
                <iframe  src="https://docs.google.com/document/d/12aPDIiN4UIKhbVurf__W9J1Y-DccBMKh/edit?usp=share_link&ouid=104466400130839559996&rtpof=true&sd=true"></iframe>
            </div>
        </div>

        <h3>Respuesta</h3>
        <div class="card catalog-body mb-2">
            <div class="row">
                <a style="color: #9f2241">{{ dato.Fecha }}</a>
            </div>
            <div class="row">
                <p>{{ dato.Observacion }}</p>
            </div>
            <div class="row" style="height: 500px;">
                <iframe src="https://docs.google.com/document/d/12aPDIiN4UIKhbVurf__W9J1Y-DccBMKh/edit?usp=share_link&ouid=104466400130839559996&rtpof=true&sd=true"></iframe>
            </div>
        </div>
    </div>
</template>

<script>
    import Swal from 'sweetalert2'
    import { mapState, mapMutations, mapActions } from 'vuex'
    import select from 'vue-select'
    import 'vue-select/dist/vue-select.css';

    export default {
        data() {
            const dato = []
            const user_main = {
                rol: ''
            }
            const base64 = ''
            const main_frame = {
                id: '',
                Folio: '',
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
                Estatus: 0
            }

            return {
                main_frame,
                user_main,
                dato
            }
        },
        computed: {
            ...mapState('catalogs', [
                'OneRequest', 
                'OptionsType', 
                'OptionsDiscapacidad', 
                'OptionsRespuestas', 
                'OptionsDependencie', 
                'Archivo', 
                'Respuesta',
                'Prorroga',
                'Aclaracion'
            ]),
            ...mapState('auth', ['user'])
        },
        methods: {
            ...mapMutations('catalogs', ['addNewRequest']),
            ...mapActions('catalogs', [
                'SaveRequest', 
                'getRequest', 
                'GetDependencias', 
                'GetRecepcion', 
                'GetAccesibilidad', 
                'GetType', 
                'GetFile', 
                'GetResponse',
                'GetProrroga',
                'GetAclaracion'
            ]),
            
            async SaveData() {
                //const ok = await this.SaveRequest(this.solicitud)
                const main = []
                const file = this.$refs.myFiles.files[0]
            
                main.push(this.main_frame)
                main.push(file)

                const { ok, Error } = await this.SaveRequest(main)
                if(ok) {
                    Swal.fire(
                    '¡Buen Trabajo!',
                    '¡Se ha guardado la solicitud!',
                    'success'
                    )
                } else {
                    Swal.fire(
                    '¡ALERTA!',
                    `Error: ${ Error }`,
                    'warning'
                    )
                }
            },

            /* cargarArchivo() {
                const divvista = document.getElementById("visor");
                const obj = document.createElement('object');
                obj.data = this.Archivo;
                obj.style.width = '100%';
                obj.style.height = '100%'

                divvista.appendChild(obj);
            } */
        },
        components: {
            'v-select': select
        },
        async mounted() {
            const { id } = this.$route.params
            const { ok, error } = await this.getRequest(id)
            await this.GetDependencias()
            await this.GetRecepcion()
            await this.GetAccesibilidad()
            await this.GetType()
            await this.GetFile(this.OneRequest.RutaEvidencia)

            switch(this.OneRequest.Estatus) {
                case 2: 
                    await this.GetResponse(id)
                    this.dato = this.Respuesta
                    break;
                case 3: 
                    await this.GetProrroga(id)
                    this.dato = this.Prorroga
                    break;
                case 6: 
                    await this.GetAclaracion(id)
                    this.dato = this.Aclaracion
                    break;
                default:
                    break;
            }
            
            //this.cargarArchivo()
            
            if(!ok) {
                Swal.fire(
                    '¡Alert!',
                    '¡Algo esta mal! ' + error,
                    'warning'
                )
            }

            this.main_frame.id = id

            this.main_frame.Folio = this.OneRequest.Folio
            this.main_frame.correo = this.OneRequest.Correo
            this.main_frame.Descripcion = this.OneRequest.Descripcion
            this.main_frame.DescripcionAdicional = this.OneRequest.DescripcionAdicional

            this.main_frame.Fechas.fecha_impresion = this.OneRequest.Fecha_Impresion
            this.main_frame.Fechas.fecha_aclaracion = this.OneRequest.Fecha_Aclaracion
            this.main_frame.Fechas.fecha_prorroga = this.OneRequest.Fecha_Prorroga
            this.main_frame.Fechas.fecha_respuesta = this.OneRequest.Fecha_Respuesta
            
            this.main_frame.Dependencia = this.OptionsDependencie.find(({ id }) => id === this.OneRequest.Dependencia)
            this.main_frame.Tipo = this.OptionsType.find(({ id }) => id === this.OneRequest.TipoSolicitud)
            this.main_frame.Accesibilidad = this.OptionsDiscapacidad.find(({ id }) => id === this.OneRequest.Accesibilidad)
            this.main_frame.Recepcion = this.OptionsRespuestas.find(({ id }) => id === this.OneRequest.MedioRecepcionNotificaciones)

            this.main_frame.Estatus = this.OneRequest.Estatus
            this.user_main.rol = this.user.role
        },   
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