import Vue from 'vue'
import VueRouter from 'vue-router'
//import HomeView from '../views/HomeView.vue'
import HomeRouter from '@/modules/router'
import Auth from '@/modules/auth/router'
import isAuthenticatedGuard from '@/modules/auth/router/auth-guard'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    ...HomeRouter
  },
  {
    path: '/auth',
    ...Auth
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async(to, from, next) => {
  await isAuthenticatedGuard(to, from, next)
})

export default router
