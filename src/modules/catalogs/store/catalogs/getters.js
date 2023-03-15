export const getRequestByTerm = ( state ) => ( term = '' ) => {
    if ( term.length === 0 ) return state.requests
    return state.requests.filter( reques => reques.id.toLowerCase().includes(term.toLocaleLowerCase()) || reques.Descripcion.toLowerCase().includes(term.toLocaleLowerCase()) || reques.Dependencia.name.toLowerCase().includes(term.toLocaleLowerCase()))
}