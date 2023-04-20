//Las acciones son metodos que se utilizaran solo para 
//solicitudes de HTTP 
//Ejmplo solo metodos asycronos
import nostApi from '@/api/nostApi'
import axios from 'axios'

const urlbase = 'http://intranetahome.gob.mx/NOSTAPI'

export const SaveRequest = async (_, main) => {
    const main_api = {
        id: main[0].id,
        Fecha_Impresion: main[0].Fechas.fecha_impresion,
        Dependencia: main[0].Dependencia.id,
        Folio: main[0].Folio,
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

    const { data } = await axios.post(`${ urlbase }/Solicitud/GuardaSolicitud/`, formData)

    if( data.Status != 'ok' ) {
        return { ok: false, Error: data.Error }
    }

    return { ok: true, Error: '' }
}

export const GetDependencias = async({ commit }) => {
    const { data } = await axios.get(`${ urlbase }/Catalogos/CargaDependencias/`)

    if( data.Status != 'ok' ) {
        return { ok: false }
    }

    commit('setDependencias', data.Dato)

    return { ok: true }
}

export const GetRecepcion = async({ commit }) => {
    const { data } = await axios.get(`${ urlbase }/Catalogos/CargaMediosRecepcionNotificaciones/`)

    if( data.Status != 'ok' ) {
        return { ok: false }
    }

    commit('setRecepcion', data.Dato)

    return { ok: true }
}

export const GetAccesibilidad = async({ commit }) => {
    const { data } = await axios.get(`${ urlbase }/Catalogos/CargaTiposAccesibilidad/`)

    if( data.Status != 'ok' ) {
        return { ok: false }
    }

    commit('setAccesibilidad', data.Dato)

    return { ok: true }
}

export const GetType = async({ commit }) => {
    const { data } = await axios.get(`${ urlbase }/Catalogos/CargaTiposSolicitud/`)

    if( data.Status != 'ok' ) {
        return { ok: false }
    }

    commit('setType', data.Dato)

    return { ok: true }
}

export const GetFile = async({ commit }, ruta) => {
    const { data } = await axios.get(`${ urlbase }/Solicitud/CargaArchivo/?nombrearchivo=${ ruta }`)
    
    commit('setArchivo', data)

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
    
    const { data } = await axios.get(`${ urlbase }/Solicitud/CargaListaSolicitudes/?Desde=${ desde }&Hasta=${ hasta }&Todos=${ main.Todos }`)

    if(data.Status != 'ok') {
        return { ok: false }
    }

    commit('setRequests', data.Dato)

    return { ok: true }
}


export const getRequest = async({commit}, id) => {
    const { data } = await axios.get(`${ urlbase }/Solicitud/CargaSolicitud/?Id=${ id }`)

    if(data.Status != 'ok') {
        return { ok: false, error: data.Error }
    } 

    commit('setOneRequest', data.Dato)

    return { ok: true, error: '' }
}

export const setResponse = async(_, main) => {

    const formData = new FormData()

    for(let x = 0; x < main[1].length; x++) {
        formData.append("files", main[1][x])
    }

    const respuesta = JSON.stringify(main[0])
    formData.append('respuesta', respuesta)

    const { data } = await axios.post(`${ urlbase }/Solicitud/GuardaRespuesta/`, formData)

    if(data.Status != 'ok'){
        return { ok: false, error: data.Error }
    } 

    return { ok: true, error: '' }
}

export const setProrroga = async(_, main) => {

    const formData = new FormData()

    for(let x = 0; x < main[1].length; x++) {
        formData.append("files", main[1][x])
    }

    const prorroga = JSON.stringify(main[0])
    formData.append('prorroga', prorroga)

    const { data } = await axios.post(`${ urlbase }/Solicitud/GuardaProrroga/`, formData)


    if(data.Status != 'ok'){
        return { ok: false, error: data.Error }
    } 

    return { ok: true, error: '' }
}

export const setAclaracion = async(_, main) => {

    const formData = new FormData()

    for(let x = 0; x < main[1].length; x++) {
        formData.append("files", main[1][x])
    }

    const aclaracion = JSON.stringify(main[0])
    formData.append('aclaracion', aclaracion)

    const { data } = await axios.post(`${ urlbase }/Solicitud/GuardaAclaracion/`, formData)


    if(data.Status != 'ok'){
        return { ok: false, error: data.Error }
    } 

    return { ok: true, error: '' }
}

export const GetResponse = async({commit}, id) => {
    const { data } = await axios.get(`${ urlbase }/Solicitud/CargaRespuesta/?idsolicitud=${ id }`)

    if(data.Status != 'ok') {
        return { ok: false, error: data.Error }
    } 

    commit('setResponse', data.Dato)

    return { ok: true, error: '' }
}

export const GetProrroga = async({commit}, id) => {
    const { data } = await axios.get(`${ urlbase }/Solicitud/CargaProrroga/?idsolicitud=${ id }`)

    if(data.Status != 'ok') {
        return { ok: false, error: data.Error }
    } 

    commit('setProrroga', data.Dato)

    return { ok: true, error: '' }
}

export const GetAclaracion = async({commit}, id) => {
    const { data } = await axios.get(`${ urlbase }/Solicitud/CargaAclaracion/?idsolicitud=${ id }`)

    if(data.Status != 'ok') {
        return { ok: false, error: data.Error }
    } 

    commit('setAclaracion', data.Dato)

    return { ok: true, error: '' }
}