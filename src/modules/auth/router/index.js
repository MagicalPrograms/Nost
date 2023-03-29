export default {
    component: () => import(/* webpackChunkName: "AuthLayout" */ '@/modules/auth/layout/AuthLayout.vue'),
    children: [
        {
            path: 'login',
            name: 'login',
            component: () => import(/* webpackChunkName: "Login" */ '@/modules/auth/views/Login.vue'),
            meta: { login: true }
        }
    ]
}