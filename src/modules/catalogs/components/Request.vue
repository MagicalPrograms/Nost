<template>
    <div class="card nost-list nost-padding" style="overflow: hidden;">
        <div :class="`Color_${ Estatus }`" :style="Estilos"></div>
        <div class="row" style="margin-left: 0.5rem">
            <div class="col-sm-10 nost-column">
                <span class="id" title="folio">{{ Folio }}</span>
                <span class="desciption" title="descripción" >{{ Description }}</span>
                <span class="Type" title="Tipo de solicitud">{{ Type }} - {{ Dependencie }} - {{ Fecha_Impresion }} </span>
            </div>
            <div class="col-sm-2 butosn-container">
                <button class="form-control btn btn-primary nost-list-buttons" v-show="user_main.rol == 'Administrador'" v-b-modal.modal-xl @click="Edit" >
                    <i class="uil uil-pen"></i>
                </button>
                <button class="form-control btn btn-primary nost-list-buttons" v-show="user_main.rol != 'Administrador'" v-b-modal.modal-xl @click="Edit" >
                    <i class="uil uil-eye"></i>
                </button>
                <button class="form-control btn btn-success nost-list-buttons" v-if="condition()" v-b-modal.Respuesta @click="Follow">
                    <i class="uil uil-code-branch"></i>
                </button>
                <button class="form-control btn btn-danger nost-list-buttons" v-show="user_main.rol == 'Administrador'" title="Eliminar" @click="EliminarSolicitud">
                    <i class="uil uil-trash-alt"></i>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapMutations, mapState } from 'vuex'
    import Swal from 'sweetalert2'
    export default {
        props: {
            id: '',
            Folio: '',
            Dependencie: '',
            Fecha_Impresion: '',
            Description: '',
            Type: '',
            Estatus: 0
        },
        data() {
            const user_main = {
                rol: ''
            }

            const Estilos = {
                position: 'absolute',
                border: '9px solid rgb(159, 34, 65)',
                left: '-9px',
                top: '-6px',
                bottom: '-15px',
                height: '500px'
            }

            return {
                user_main,
                Estilos
            }
        },
        computed: { 
            ...mapState('auth', ['user'])
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
                this.$router.push({name: 'Edit-Request', params: { id: this.id } })
            },
            Follow() {
                this.$router.push({ name: 'Seguimiento', params: { id: this.id + '-' +this.Folio } })
            },
            condition() {
                if(this.Estatus == 2 || this.Estatus == 3) {
                    return false
                } else {
                    return true
                }
            }
        },

        mounted() {
            this.user_main.rol = this.user.role
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
    column-gap: 1.2rem;
}

.Color_1 {
    border: 1rem solid #9f2241 !important;
}
.Color_2 {
    border: 1rem solid rgb(4, 198, 161) !important;
}
.Color_3 {
    border: 1rem solid rgb(217, 72, 56) !important;
}
</style>