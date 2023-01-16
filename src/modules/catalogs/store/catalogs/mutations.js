//Las mutiaciones o Mutations se utilizaran para 
//modificar el state de mi aplicacion
//ejemplo es como si fueran metodos internos 

export const addNewRequest = ( state, main ) => {
    state.requests.push({
        id: main.main_frame.id,
        Description: main.main_frame.Solicitud,
        Type: {
            id: main.TypeId,
            name: main.TypeName
        },
        Dependencie: {
            id: main.DependencieID,
            name: main.DependencieName
        },
        Fechas: {
            Fecha_Impresion: main.Fecha_Impresion,
            Fecha_Respuesta: main.Fecha_Respuesta,
            Fecha_Aclaracion: main.Fecha_Aclaracion,
            Fecha_Prorroga: main.Fecha_Prorroga
        }
        
    })
}

export const deleteRequest = ( state ) => {
    state.requests.pop()
}