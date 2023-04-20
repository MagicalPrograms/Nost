//Las mutiaciones o Mutations se utilizaran para 
//modificar el state de mi aplicacion
//ejemplo es como si fueran metodos internos 

export const addNewRequest = ( state, main ) => {
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
        }
        
    })
}

export const deleteRequest = ( state ) => {
    state.requests.pop()
}


export const setDependencias = ( state, dependencia ) => {
    state.OptionsDependencie = dependencia
}

export const setRecepcion = ( state, recepcion ) => {
    state.OptionsRespuestas = recepcion
}

export const setAccesibilidad = ( state, Accesibilidad ) => {
    state.OptionsDiscapacidad = Accesibilidad
}

export const setType = ( state, Type ) => {
    state.OptionsType = Type
}

export const setRequests = ( state, requests ) => {
    state.requests = requests
}

export const setOneRequest = ( state, request ) => {    
    state.OneRequest = request
}

export const setArchivo = ( state, Archivo ) => {    
    state.Archivo = Archivo
}

export const setResponse = ( state, Respuesta ) => {    
    state.Respuesta = Respuesta
}

export const setProrroga = ( state, Prorroga ) => {    
    state.Prorroga = Prorroga
}

export const setAclaracion = ( state, Aclaracion ) => {    
    state.Aclaracion = Aclaracion
}