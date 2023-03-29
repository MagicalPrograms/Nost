import Vue from 'vue'
import Vuex from 'vuex'

import auth from '@/modules/auth/store/auth'
import analytics from '@/modules/analytics/store/analytics'
import catalogs from '@/modules/catalogs/store/catalogs'
import request from '@/modules/requests/store/requests'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    analytics,
    catalogs,
    request
  }
})
