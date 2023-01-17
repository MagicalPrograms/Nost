export const getRequestByTerm = ( state ) => ( term = '' ) => {
    if ( term.length === 0 ) return state.requests

    return state.requests.filter( reques => reques.id.toLowerCase().includes(term.toLocaleLowerCase()) || reques.Description.toLowerCase().includes(term.toLocaleLowerCase()) || reques.Dependencie.name.toLowerCase().includes(term.toLocaleLowerCase()))
}