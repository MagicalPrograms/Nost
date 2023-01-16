//Las mutiaciones o Mutations se utilizaran para 
//modificar el state de mi aplicacion
//ejemplo es como si fueran metodos internos 

export const addNewRequest = ( state, main ) => {
    state.requests.push({
        id: main.main_frame.id,
        Description: main.main_frame.Solicitud,
        Type: {
            id: main.TypeID,
            name: main.TypeName
        },
        Dependencie: {
            id: main.DependencieID,
            name: main.DependencieName
        },
        Date: main.Fecha_Impresion
    })
}