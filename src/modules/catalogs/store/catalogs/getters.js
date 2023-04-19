export const getRequestByTerm = ( state ) => ( term = '' ) => {
    if ( term.length === 0 ) return state.requests
    return state.requests.filter( 
        reques => reques.Folio.toLowerCase().includes(term.toLocaleLowerCase()) 
        || reques.Descripcion.toLowerCase().includes(term.toLocaleLowerCase()) 
        || reques.NameDependencia.toLowerCase().includes(term.toLocaleLowerCase())
    )
}