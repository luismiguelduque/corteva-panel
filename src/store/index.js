import Vue from 'vue'
import Vuex from 'vuex'

import app from './app'
import appConfig from './app-config'
import verticalMenu from './vertical-menu'

// Modules
import appAuth from './modules/app-auth'
import appUsers from './modules/app-users'
import appRoles from './modules/app-roles'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    appConfig,
    verticalMenu,
    appAuth,
    appUsers,
    appRoles,
  },
  strict: process.env.DEV,
})
