<template>
  <div class="row">
    <div class="col-sm-12">
      <h3>Registrar solicitud</h3>
      <div class="card catalog-body">
        <div class="row">
          <div class="col-sm-4">
            Fecha de impresion
            <b-input class="date" type="date" @change="ValidarFecha" v-model="dateImpresion" ></b-input>
          </div>
          <div class="col-sm-4">
            Tipo de solicitud
            <v-select label="name" :options="OptionsDependencie" v-model="SelectDependencie" >
              <div slot="no-options">No se encontraron opciones</div>
            </v-select>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-4">
            No. de folio
            <b-input v-model="main_frame.id"></b-input>
          </div>
          <div class="col-sm-4">
            Tipo de solicitud
            <v-select label="name" :options="OptionsType" v-model="SelectType" >
              <div slot="no-options">No se encontraron opciones</div>
            </v-select>
          </div>
          <div class="col-sm-4">
            <i class="uil uil-accessible-icon-alt" style="color: dodgerblue"> Formato de accesibilidad</i>
            <v-select label="name" :options="OptionsDiscapacidad" v-model="SelectDiscapacidad" >
              <div slot="no-options">No se encontraron opciones</div>
            </v-select>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-4">
            Medio para recibir notificaciones
            <v-select label="name" :options="OptionsRespuestas" v-model="SelectRespuestas" >
              <div slot="no-options">No se encontraron opciones</div>
            </v-select>
          </div>
          <div class="col-sm-4">
            Correo
            <b-input v-model="main_frame.correo" />
          </div>
          <div class="col-sm-4">
            Evidencia
            <input type="file" id="file" ref="myFiles" class="form-control" multiple>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-6">
            Datos de la solicitud
            <b-textarea v-model="main_frame.Solicitud" class="ta-solicitud"></b-textarea>
          </div>
          <div class="col-sm-6">
            Datos adicionales
            <b-textarea v-model="main_frame.DatosAdicionales" ></b-textarea>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-4">
            Respuesta a su solicitud
            <b-input class="date" type="date" v-model="dateRespuesta"/>
          </div>
          <div class="col-sm-4">
            Fecha de aclaracion
            <b-input class="date" type="date" v-model="dateAclaracion"/>
          </div>
          <div class="col-sm-4">
            Fecha de prórroga
            <b-input class="date" type="date" v-model="dateProrroga"/>
          </div>
        </div>
        <div class="row" style="font-size: 14px">
          <div class="col-sm-8"></div>
          <div class="col-sm-4">
            <button class="form-control btn btn-success" @click="SaveData">Guardar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import select from 'vue-select'
import 'vue-select/dist/vue-select.css';
import { mapActions, mapMutations, mapState } from 'vuex';

export default {
  components: {
    'v-select': select
  },
  data(){
    const Date = ''
    const solicitud = {}

    const main_frame = {
      id: '',
      correo: '',
      Solicitud: '',
      DatosAdicionales: ''
    }

    const SelectType = { name: '-- Seleccióna un Tipo --', id: 0 }
    const OptionsType = [
      { name: '-- Seleccióna un Tipo --', id: 0 },
      { name: 'Información Pública', id: 1 },
      { name: 'Datos Personales', id: 2 }
    ]
    
    const SelectDiscapacidad = { name: '-- Seleccióna una accesibilidad --', id: 0 }
    const OptionsDiscapacidad = [
      { name: '-- Seleccióna una accesibilidad --', id: 0 },
      { name: 'Auditiva', id: 1 },
      { name: 'Visual', id: 2 }
    ]

    const SelectRespuestas = { name: '-- Seleccióna un medio --', id: 0 }
    const OptionsRespuestas = [
      { name: '-- Seleccióna un medio --', id: 0 },
      { name: 'Información disponible via PNT', id: 1 },
      { name: 'Correo electronico', id: 2 }
    ]
    
    const SelectDependencie = { name: '-- Seleccióna una Dependencia --', id: 0 }
    const OptionsDependencie = [
      { name: '-- Seleccióna una Dependencia --', id: 0 },
      { name: 'Dirección de la Unidad de Transparencia', id: 1 },
      { name: 'Dirección de ingresos', id: 2 },
      { name: 'Dirección de informatica', id: 3 },
      { name: 'Dirección de planiación', id: 4 }
    ]

    return {
      main_frame,
      OptionsType,
      SelectType,
      SelectDiscapacidad,
      OptionsDiscapacidad,
      SelectRespuestas,
      OptionsRespuestas,
      SelectDependencie,
      OptionsDependencie,
      solicitud,
      dateImpresion: '',
      dateRespuesta: '',
      dateAclaracion: '',
      dateProrroga: '',
      id: '',
      Description: '',
      Datos: []
    }
  },

  computed: {
    ...mapState('catalogs', ['Request'])
  },
  
  methods: {
    ...mapActions('catalogs', ['SaveRequest']),
    ...mapMutations('catalogs', ['addNewRequest']),


    async SaveData() {
      this.solicitud = {
        main_frame: this.main_frame,
        TypeId: this.SelectType.id,
        TypeName: this.SelectType.name,
        DependencieID: this.SelectDependencie.id,
        DependencieName: this.SelectDependencie.name,
        Discapacidad: this.SelectDiscapacidad.id,
        Medio: this.SelectRespuestas.id,
        Fecha_Impresion: this.dateImpresion,
        Fecha_Respuesta: this.dateRespuesta,
        Fecha_Aclaracion: this.dateAclaracion,
        Fecha_Prorroga: this.dateProrroga
      }

      //const ok = await this.SaveRequest(this.solicitud)
      try{
        this.addNewRequest(this.solicitud)
        Swal.fire(
          'Good job!',
          'You clicked the button!',
          'success'
        )
      } catch (error) {
        Swal.fire(
          'Alert!',
          'Somting is worang! ' + error,
          'warning'
        )
      }
    },

    ValidarFecha() {
      if(Date.parse(this.dateImpresion) > Date.parse(this.Date)) {
        Swal.fire(
          '¡Alerta!',
          '¡No puedes elegir una fecha posterior a la de hoy!',
          'warning'
        )
      }

      this.dateImpresion = this.Date
    }
  },

  mounted() {
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
    
    this.Date = `${ year }-${ month }-${ day }`
    this.dateImpresion = `${ year }-${ month }-${ day }`
    this.dateRespuesta = `${ year }-${ month }-${ day }`
    this.dateAclaracion = `${ year }-${ month }-${ day }`
    this.dateProrroga = `${ year }-${ month }-${ day }`
    
  }
}
</script>

<style>
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