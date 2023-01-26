<template>
    <div>
        <h3>Segimiento de solicitud</h3>
        <div class="row mb-2">
            <div class="col-sm-3">
                Folio de solicitud
                <b-input type="text" class="form-control" disabled v-model="main_frame.id" />
            </div>
        </div>

        <div class="row mb-2">
            <div class="col-sm-4">
                Fecha limite de Respuesta
                <input type="date" class="form-control" disabled v-model="main_frame.Fechas.fecha_respuesta">
            </div>
            <div class="col-sm-4">
                Fecha limite de Aclaración
                <input type="date" class="form-control" disabled v-model="main_frame.Fechas.fecha_aclaracion">
            </div>
            <div class="col-sm-4">
                Fecha limite de Prorroga
                <input type="date" class="form-control" disabled v-model="main_frame.Fechas.fecha_prorroga">
            </div>
        </div>

        <div class="row mb-2">
            <div class="col">
                Descripción
                <textarea class="form-control" disabled v-model="main_frame.Descripcion"></textarea>
            </div>
        </div>
        
        <div class="row">
            <div class="col-sm-3">
                Lista de Archivos
                <div class="files-list"> 
                </div>
            </div>
            <div class="col">
                Vista previa de archivos
                <iframe id="viewer" class="viewer" frameborder="0" width="100%" height="500"></iframe>
            </div>
        </div>

        
    </div>
</template>

<script>
    import { mapState } from 'vuex'
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
                File: {}
            }

            return {
                main_frame
            }
        },
        mounted() {
            const { id } = this.$route.params
            const index = this.requests.findIndex(x => x.id.toLowerCase().includes(id.toLocaleLowerCase()))
            this.main_frame.id = this.requests[index].id
            this.main_frame.Descripcion = this.requests[index].Descripcion
            this.main_frame.Fechas.fecha_aclaracion = this.requests[index].Fechas.fecha_aclaracion
            this.main_frame.Fechas.fecha_prorroga = this.requests[index].Fechas.fecha_prorroga
            this.main_frame.Fechas.fecha_respuesta = this.requests[index].Fechas.fecha_respuesta
            this.main_frame.File = this.requests[index].File

            const output = document.getElementById("viewer")
            output.src = URL.createObjectURL(this.main_frame.File)
            output.onload = function() {
                URL.revokeObjectURL(output.src)
            }
        },
        methods: {
            onFileChanged(e) {
                const file = e.target.files || e.dataTransfer.files
                if(!file.length) {
                    return
                } else {
                    const output = document.getElementById("viewer")
                    output.src = URL.createObjectURL(file[0])
                    output.onload = function() {
                        URL.revokeObjectURL(output.src)
                    }
                }
            }
        },
        computed: {
            ...mapState('catalogs', ['requests']),
        }
    }
</script>

<style scoped>
    .viewer {
        width: 100%;
    }
    .files-list{
        background-color: #525659 !important;
        width: 100%;
        height: 500px;
    }
</style>