//import Vuex from 'vuex'
//import axios from 'axios' 
export const strict = false
export const state = () => ({
    authUser: false,
    backendUrl : "http://localhost:3333/"
})
// common getters
export const getters ={
  isLoggedIn (state) {
    return !!state.authUser
  },
  getAuthUser (state) {
    return state.authUser
  },
}
//mutations for changing data from action 
export const mutations = {
  setAuthUser(state, data) {
    state.authUser = data
  }, 
}

// actionns for commiting mutations
export const actions = {
  async nuxtServerInit({ commit }, { $axios }) {
      try {
        let { data } = await $axios.get(`auth/myuser`)
        // console.log(data)
        commit('setAuthUser', data)
     } catch (e) {
        // console.log('nuxt server error ', e.response)
    }
  },
 
}
