export const checkAutentication = async({commit}) => {
    const username = localStorage.getItem('user_name')

    if(!username) {
        commit('logout')
        return { ok: false, message: 'Credenciales no validas' }
    } else {
        return { ok: true }
    }
}


export const SingIn = ({commit}, main) => {
    if(main.nameuser == 'Brian-admin' && main.password == '1234') {
        main = {
            nameuser: 'Brian-admin',
            role: 'Administrador',
            dependencia: 1
        }

        commit('loginUser', main)
        return { ok: true, message: '¡Bien!' }
    } else {
        return { ok: false, message: 'Contraseña icorrecta o usuario no registrado...' }
    }
}

export const Logout = ({commit}) => {
    commit('logout')
    return { ok: true, message: '¡Bien!' }
}