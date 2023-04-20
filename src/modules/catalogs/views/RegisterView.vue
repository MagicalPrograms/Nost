<template>
  <div class="row">
    <div class="col-sm-12">
      <h3>Registrar solicitud</h3>
      <div class="card catalog-body">
        <div class="row">
          <div class="col-sm-4">
            Fecha de impresion
            <b-input class="date" type="date" @change="ValidarFecha" v-model="main_frame.Fechas.fecha_impresion" ></b-input>
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
            * No. de folio
            <b-input :class="{'vasio' : main_frame.Folio == ''}" v-model="main_frame.Folio"></b-input>
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
            <b-input v-model="main_frame.correo" />
          </div>
          <div class="col-sm-4">
            Evidencia
            <input type="file" id="file" ref="myFiles" class="form-control" >
          </div>
        </div>
        <div class="row">
          <div class="col-sm-6">
            * Datos de la solicitud
            <b-textarea :class="{'vasio' : main_frame.Descripcion == ''}" v-model="main_frame.Descripcion" class="ta-solicitud"></b-textarea>
          </div>
          <div class="col-sm-6">
            Datos adicionales
            <b-textarea v-model="main_frame.DescripcionAdicional" ></b-textarea>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-4">
            Respuesta a su solicitud
            <b-input class="date" type="date" v-model="main_frame.Fechas.fecha_respuesta"/>
          </div>
          <div class="col-sm-4">
            Fecha de aclaracion
            <b-input class="date" type="date" v-model="main_frame.Fechas.fecha_aclaracion"/>
          </div>
          <div class="col-sm-4">
            Fecha de prórroga
            <b-input class="date" type="date" v-model="main_frame.Fechas.fecha_prorroga"/>
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
    const main_frame = {
      id: 0,
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
      Estatus: 1
    }
    
    return {
      main_frame,
    }
  },

  computed: {
    ...mapState('catalogs', ['Request', 'OptionsType', 'OptionsDiscapacidad', 'OptionsRespuestas', 'OptionsDependencie']),
    ...mapState('auth', ['user'])
  },
  
  methods: {
    async SaveData() {
      
      const main = []
      const file = this.$refs.myFiles.files[0] 
  
      main.push(this.main_frame)
      main.push(file)

      if(this.main_frame.Folio == '' || this.main_frame.Descripcion == '') {
        console.log(this.main_frame.Folio);
        console.log(this.main_frame.Descripcion);
        Swal.fire(
          '¡ALERTA!',
          'Los Campos con * son obligatorios es necesario llenarlos',
          'warning'
        )

      } else {
        const { ok, Error } = await this.SaveRequest(main)

        if(ok) {
          Swal.fire(
            '¡Buen Trabajo!',
            '¡Se ha guardado la solicitud!',
            'success'
          )

          this.$router.push({ name: 'Request' })
        } else {
          Swal.fire(
            '¡ALERTA!',
            `Error: ${ Error }`,
            'warning'
          )
        }
      }
    },

    ValidarFecha() {
      if(Date.parse(this.main_frame.Fechas.fecha_impresion) > Date.parse(this.Date)) {
        Swal.fire(
          '¡Alerta!',
          '¡No puedes elegir una fecha posterior a la de hoy!',
          'warning'
        )
      }

      this.main_frame.Fechas.fecha_impresion = this.Date
    },

    ...mapActions('catalogs', ['SaveRequest', 'GetDependencias', 'GetRecepcion', 'GetAccesibilidad', 'GetType']),
  },

  async mounted() {
    await this.GetDependencias()
    await this.GetRecepcion()
    await this.GetAccesibilidad()
    await this.GetType()

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
    this.main_frame.Fechas.fecha_impresion = `${ year }-${ month }-${ day }`
    this.main_frame.Fechas.fecha_aclaracion = `${ year }-${ month }-${ day }`
    this.main_frame.Fechas.fecha_prorroga = `${ year }-${ month }-${ day }`
    this.main_frame.Fechas.fecha_respuesta = `${ year }-${ month }-${ day }`
 
    this.main_frame.Dependencia = this.OptionsDependencie[0]
    this.main_frame.Tipo = this.OptionsType[0]
    this.main_frame.Accesibilidad = this.OptionsDiscapacidad[0]
    this.main_frame.Recepcion = this.OptionsRespuestas[0]
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

  .vasio {
    border: 1px solid red
  }
</style>