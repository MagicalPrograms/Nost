//Las mutiaciones o Mutations se utilizaran para 
//modificar el state de mi aplicacion
//ejemplo es como si fueran metodos internos 

export const addNewRequest = ( state, main ) => {
    console.log(main);
    state.requests.push({
        id: main.id,
        Descripcion: main.Descripcion,
        DescripcionAdicional: main.DescripcionAdicional,
        correo: main.correo,
        Dependencia: {
            id: main.Dependencia.id,
            name: main.Dependencia.name
        },
        Tipo: {
            id: main.Tipo.id,
            name: main.Tipo.name
        },
        Accesibilidad: {
            id: main.Accesibilidad.id,
            name: main.Accesibilidad.name
        },
        Recepcion: {
            id: main.Recepcion.id,
            name: main.Recepcion.name
        },
        Fechas: {
            fecha_impresion: main.Fechas.fecha_impresion,
            fecha_aclaracion: main.Fechas.fecha_aclaracion,
            fecha_prorroga: main.Fechas.fecha_prorroga,
            fecha_respuesta: main.Fechas.fecha_respuesta
        },
        File: main.File
    })
}

export const updateRequest = ( state, main ) => {
    const request = state.requests.findIndex(x => x.id.toLowerCase().includes(main.id.toLocaleLowerCase()))
    state.requests[request].Descripcion = main.Descripcion
    state.requests[request].DescripcionAdicional = main.DescripcionAdicional
    state.requests[request].correo = main.correo
    state.requests[request].Dependencia = main.Dependencia
    state.requests[request].Tipo = main.Tipo
    state.requests[request].Accesibilidad = main.Accesibilidad
    state.requests[request].Recepcion = main.Recepcion
    state.requests[request].Fechas = main.Fechas
    //state.requests[request].File = main.File

    //console.log(state.requests);
}

export const deleteRequest = ( state ) => {
    state.requests.pop()
}