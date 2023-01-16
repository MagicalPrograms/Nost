import Vue from 'vue'
import Vuex from 'vuex'

import analytics from '@/modules/analytics/store/analytics'
import catalogs from '@/modules/catalogs/store/catalogs'
import request from '@/modules/requests/store/requests'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    analytics,
    catalogs,
    request
  }
})
