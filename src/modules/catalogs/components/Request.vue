<template>
    <div class="card nost-list nost-padding">
        <div class="row">
            <div class="col-sm-8 nost-column">
                <span class="id" title="folio">{{ id }}</span>
                <span class="desciption" title="descripción" >{{ Description }}</span>
                <span class="Type" title="Tipo de solicitud">{{ Type }} - {{ Dependencie }} - {{ Fecha_Impresion }} </span>
            </div>
            <div class="col-sm-4 butosn-container">
                <button class="form-control btn btn-primary nost-list-buttons" v-b-modal.modal-xl @click="Edit" >
                    <i class="uil uil-pen"></i>
                </button>
                <button class="form-control btn btn-success nost-list-buttons" v-b-modal.Respuesta @click="Follow">
                    <i class="uil uil-file-check-alt"></i>
                </button>
                <button class="form-control btn btn-danger nost-list-buttons" title="Eliminar" @click="EliminarSolicitud">
                    <i class="uil uil-trash-alt"></i>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapMutations } from 'vuex'
    import Swal from 'sweetalert2'
    export default {
        props: {
            id: '',
            Dependencie: '',
            Fecha_Impresion: '',
            Description: '',
            Type: '',
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
            Edit() {
                console.log(this.id);
                this.$router.push({name: 'Edit-Request', params: { id: this.id } })
            },
            Follow() {
                this.$router.push({name: 'Seguimiento', params: { id: this.id } })
            }
        }
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
        height: 60%;
        width: 100%;
        font-size: 1.2rem !important;
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
        align-items: center;
        column-gap: 1rem;
        padding-left: 10rem;
    }
</style>