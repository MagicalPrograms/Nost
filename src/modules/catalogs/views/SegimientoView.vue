<template>
    <div>
        <h3>Segimiento de solicitud</h3>
        <div class="card catalog-body mb-2 p-2">
            <div class="row">
                <div class="col-sm-3">
                    <button class="form-control" id="Responder" @click="selectOption($event)">
                        Responder
                    </button>
                </div>
                <div class="col-sm-3">
                    <button class="form-control" id="Prorroga" @click="selectOption($event)">
                        Prorroga
                    </button>
                </div>
                <div class="col-sm-3">
                    <button class="form-control" id="Aclaracion" @click="selectOption($event)">
                        Aclaración
                    </button>
                </div>
            </div>
        </div>

        <h3 v-show="Target != ''">{{ Target }}</h3>
        <h5>Folio Solicitud: {{ Folio }}</h5>
        <div v-show="Target != ''" class="card catalog-body mb-2" style="padding: 1.5rem;">
            <div v-show="Target == 'Responder'">
                <div class="row">
                    <div class="col-sm-12">
                        Observación
                        <textarea class="form-control mb-1" id="" cols="30" rows="5" v-model="Respuesta.Observacion"></textarea>
                    </div>
                </div>
                <div class="row mb-2">
                    <div class="col-sm-12">
                        Evidencia
                        <input type="file" id="file" ref="myFiles" class="form-control" multiple/>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-8"></div>
                    <div class="col-sm-4">
                        <button class="form-control btn btn-success" @click="Responde">Responder</button>
                    </div>
                </div>
            </div>
            <div v-show="Target == 'Prorroga'">
                <div class="row">
                    <div class="col-sm-12">
                        Observación
                        <textarea class="form-control mb-1" id="" cols="30" rows="5" v-model="Prorroga.Observacion"></textarea>
                    </div>
                </div>
                <div class="row mb-2">
                    <div class="col-sm-12">
                        Evidencia
                        <input type="file" id="file" ref="myFilesProrroga" class="form-control" />
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-8"></div>
                    <div class="col-sm-4">
                        <button class="form-control btn btn-success" @click="prorro">Prorroga</button>
                    </div>
                </div>
            </div>
            <div v-show="Target == 'Aclaracion'">
                <div class="row">
                    <div class="col-sm-12">
                        Observación
                        <textarea class="form-control mb-1" id="" cols="30" rows="5" v-model="Aclaracion.Observacion"></textarea>
                    </div>
                </div>
                <div class="row mb-2">
                    <div class="col-sm-12">
                        Evidencia
                        <input type="file" id="file" ref="myFilesAclaracion" class="form-control" />
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-8"></div>
                    <div class="col-sm-4">
                        <button class="form-control btn btn-success" @click="aclara">Aclaración</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapActions, } from 'vuex';
    import Swal from 'sweetalert2'

    export default {
        data() {
            const Folio = ''

            const Respuesta = {
                IDSolicitud: 0,
                IDRespuesta: 0,
                Observacion: '',
                Fecha: null
            }
            
            const Prorroga = {
                IDSolicitud: 0,
                IDProrroga: 0,
                Observacion: '',
                Archivo: null,
                Estatus: null,
                Fecha: null
            }
            
            const Aclaracion = {
                IDSolicitud: 0,
                IDAclaracion: 0,
                Observacion: '',
                ContentType: null,	
                Archivo: null,
                Fecha: null
            }

            return {
                Target: '',
                Folio,
                Respuesta,
                Prorroga,
                Aclaracion
            }
        },

        methods: {
            ...mapActions('catalogs', ['setResponse', 'setProrroga', 'setAclaracion']),

            selectOption: function(event) {
                this.Target = event.currentTarget.id;
            },

            Responde() {
                Swal.fire({
                    title: '¿Estas seguro de dar respuesta a la solicitud?',
                    text: "Es recomendable revisar la informacion que enviaras para que tu respuesta no sea rechazada",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si, responder',
                    cancelButtonText: 'Cancelar'
                }).then((result) => {
                    if (result.isConfirmed) {
                        this.Responder()
                    } 
                })
            },

            prorro() {
                Swal.fire({
                    title: '¿Estas seguro de solictar una prorroga?',
                    text: "Toma en cunata los dias y analiza si es la mejor opción",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si, prorrogar',
                    cancelButtonText: 'Cancelar'
                }).then((result) => {
                    if (result.isConfirmed) {
                        this.Prorrogar()
                    } 
                })
            },
            
            aclara() {
                Swal.fire({
                    title: '¿Estas seguro de solictar una aclaracion?',
                    text: "Toma en cunata los dias y analiza si es la mejor opción",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si, aclarar',
                    cancelButtonText: 'Cancelar'
                }).then((result) => {
                    if (result.isConfirmed) {
                        this.Aclarar()
                    } 
                })
            },


            async Responder() {
                const id = this.$route.params.id.split("-")
                console.log(id[0]);

                this.Respuesta.IDSolicitud = parseInt(id[0])

                const files = this.$refs.myFiles.files

                const main = []
                main.push(this.Respuesta)
                main.push(files)

                const { ok, error } = await this.setResponse(main)

                if(ok) {
                    Swal.fire(
                        '¡Buen Trabajo!',
                        'Se ha respondido correctamente',
                        'success'
                    ) 

                    this.$router.push({ name: 'Request' })
                } else {
                    Swal.fire(
                        '¡Alerta!',
                        `Error: ${ error }`,
                        'warning'
                    )
                }
            },

            async Prorrogar() {
                const id = this.$route.params.id.split("-")
                console.log(id[0]);

                this.Prorroga.IDSolicitud = parseInt(id[0])

                const files = this.$refs.myFilesProrroga.files
                console.log(files);

                const main = []
                main.push(this.Prorroga)
                main.push(files)

                const { ok, error } = await this.setProrroga(main)

                if(ok) {
                    Swal.fire(
                        '¡Buen Trabajo!',
                        'Se ha solicitado la prorroga correctamente',
                        'success'
                    ) 

                    this.$router.push({ name: 'Request' })
                } else {
                    Swal.fire(
                        '¡Alerta!',
                        `Error: ${ error }`,
                        'warning'
                    )
                }
            },
            
            async Aclarar() {
                const id = this.$route.params.id.split("-")
                console.log(id[0]);

                this.Aclaracion.IDSolicitud = parseInt(id[0])

                const files = this.$refs.myFilesAclaracion.files
                console.log(files);

                const main = []
                main.push(this.Aclaracion)
                main.push(files)

                const { ok, error } = await this.setAclaracion(main)

                if(ok) {
                    Swal.fire(
                        '¡Buen Trabajo!',
                        'Se ha solicitado la aclaración correctamente',
                        'success'
                    ) 

                    this.$router.push({ name: 'Request' })
                } else {
                    Swal.fire(
                        '¡Alerta!',
                        `Error: ${ error }`,
                        'warning'
                    )
                }
            }
        },

        mounted() {
            const id = this.$route.params.id.split("-")
            this.Folio = id[1]
        }
    }
</script>

<style scoped>

</style>