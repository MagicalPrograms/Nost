import store from "@/store";

const isAuthenticatedGuard = async(to, from, next) => {
    console.log(to);
    console.log(from);
    console.log(next);
    if(to.matched.some(record => record.meta.requiresAuth)) {
        const { ok } = await store.dispatch('auth/checkAutentication')

        if(ok) next()
        else next({ name: 'login' })

    } else if(to.matched.some(record => record.meta.login)) {

        const { ok } = await store.dispatch('auth/checkAutentication')

        if(ok && to.path === '/auth/login') {
            next({ name: 'analytics' })
        } else {
            next()
        }
    }

    next()
}

export default isAuthenticatedGuard