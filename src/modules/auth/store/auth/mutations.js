export const loginUser = (state, { nameuser, role, dependencia }) => {
    localStorage.setItem('user_name', nameuser)
    localStorage.setItem('role', role)

    state.status = true,
    state.user = {
        nameuser,
        role
    }
    state.dependencia = dependencia
}

export const logout = (state) => {
    state.user = {}
    state.status = null
    state.dependencia = 0

    localStorage.removeItem('user_name')
    localStorage.removeItem('role')
}
