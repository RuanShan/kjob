// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    apiUrl: {
    },
    appGlobalData: {
    },
    job: null,
    applicant: null
  },
  mutations: {
    setApplicantReset(state){
      state.applicant = null
    },
    setApplicant(state, payload){
      state.applicant = payload.applicant
    },
    setJob(state, payload){
      state.applicant = payload.job
    }
  },
  actions: {
    //increment ({ commit }) {
    //  commit('increment')
    //}
  }
})

export default store
