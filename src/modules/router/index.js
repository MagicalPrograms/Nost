export default {
    component: () => import(/* webpackChunkName: "HomeLayout" */ '@/modules/shared/view/HomeLayout.vue'),
    children: [ 
        {
            path: '/',
            name: 'analytics',
            component: () => import(/* webpackChunkName: "Analytics" */ '@/modules/analytics/views/AnalyticsView.vue'),
        },
        {
            path: '/Register',
            name: 'Register',
            component: () => import(/* webpackChunkName: "Register" */ '@/modules/catalogs/views/RegisterView.vue'),
        },
        {
            path: '/Request',
            name: 'Request',
            component: () => import(/* webpackChunkName: "Request" */ '@/modules/catalogs/views/RequestView.vue'),
        },
        {
            path: '/Edit-Request/:id',
            name: 'Edit-Request',
            component: () => import(/* webpackChunkName: "Edit-Request" */ '@/modules/catalogs/views/EditRequestView.vue'),
        },
        {
            path: '/Seguimiento',
            name: 'Seguimiento',
            component: () => import(/* webpackChunkName: "Seguimiento" */ '@/modules/catalogs/views/SegimientoView.vue'),
        },
        {
            path: '/formats',
            name: 'formats',
            component: () => import(/* webpackChunkName: "formats" */ '@/modules/formatos/views/FormstList.vue'),
        },
        {
            path: '/Settings',
            name: 'Settings',
            component: () => import(/* webpackChunkName: "Settings" */ '@/modules/configuration/views/SettingsView.vue'),
        },
        {
            path: '*',
            name: 'not-found',
            component: () => import(/* webpackChunkName: "HomeLayout" */ '@/modules/error/ErrorLayOut.vue'),
        }
    ],
    meta: { requiresAuth: true },
}