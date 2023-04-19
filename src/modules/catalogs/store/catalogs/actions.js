//Las acciones son metodos que se utilizaran solo para 
//solicitudes de HTTP 
//Ejmplo solo metodos asycronos
import nostApi from '@/api/nostApi'
import axios from 'axios'

export const SaveRequest = async (_, main) => {
    console.log(main[0].Fechas);
    const main_api = {
        id: 0,
        Fecha_Impresion: main[0].Fechas.fecha_impresion,
        Dependencia: main[0].Dependencia.id,
        Folio: main[0].id,
        TipoSolicitud: main[0].Tipo.id,
        Accesibilidad: main[0].Accesibilidad.id,
        MedioRecepcionNotificaciones: main[0].Recepcion.id,
        Correo: main[0].correo,
        RutaEvidencia: 'C:/',
        Descripcion: main[0].Descripcion,
        DescripcionAdicional: main[0].DescripcionAdicional,
        Fecha_Respuesta: main[0].Fechas.fecha_respuesta,
        Fecha_Aclaracion: main[0].Fechas.fecha_aclaracion,
        Fecha_Prorroga: main[0].Fechas.fecha_prorroga,
        Estatus: main[0].Estatus
    }
    const formData = new FormData()

    if(main[1] != undefined) {
        formData.append("files", main[1])
    } else {
        formData.append("files", null)
    }

    const sol = JSON.stringify(main_api)
    formData.append('solicitud', sol)

    const { data } = await axios.post('http://intranetahome.gob.mx/NOSTAPI/Solicitud/GuardaSolicitud/', formData)

    if( data.Status != 'ok' ) {
        return { ok: false, Error: data.Error }
    }

    return { ok: true, Error: '' }
}

export const GetDependencias = async({ commit }) => {
    const { data } = await axios.get('http://192.168.9.51/NOSTAPI/Catalogos/CargaDependencias/')

    if( data.Status != 'ok' ) {
        return { ok: false }
    }

    commit('setDependencias', data.Dato)

    return { ok: true }
}

export const GetRecepcion = async({ commit }) => {
    const { data } = await axios.get('http://192.168.9.51/NOSTAPI/Catalogos/CargaMediosRecepcionNotificaciones/')

    if( data.Status != 'ok' ) {
        return { ok: false }
    }

    commit('setRecepcion', data.Dato)

    return { ok: true }
}

export const GetAccesibilidad = async({ commit }) => {
    const { data } = await axios.get('http://192.168.9.51/NOSTAPI/Catalogos/CargaTiposAccesibilidad/')

    if( data.Status != 'ok' ) {
        return { ok: false }
    }

    commit('setAccesibilidad', data.Dato)

    return { ok: true }
}

export const GetType = async({ commit }) => {
    const { data } = await axios.get('http://192.168.9.51/NOSTAPI/Catalogos/CargaTiposSolicitud/')

    if( data.Status != 'ok' ) {
        return { ok: false }
    }

    commit('setType', data.Dato)

    return { ok: true }
}


export const getRequests = async({ commit }, main) => {
    let desde = main.Desde.replace('-', '')
    let hasta = main.Hasta.replace('-', '')

    while (desde.includes('-')) {
        desde = desde.replace('-', '')    
    }

    while (hasta.includes('-')) {
        hasta = hasta.replace('-', '')    
    }
    
    const { data } = await axios.get(`http://192.168.9.51/NOSTAPI/Solicitud/CargaListaSolicitudes/?Desde=${ desde }&Hasta=${ hasta }&Todos=${ main.Todos }`)
    console.log(data);

    if(data.Status != 'ok') {
        return { ok: false }
    }

    commit('setRequests', data.Dato)

    return { ok: true }
}


