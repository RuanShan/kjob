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
    applicant: null,
    workDetailStore:{} // VUEX 工作详情
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
    },
    setworkDetailStore(state,payload){
      state.workDetailStore = payload
    }
  },
  actions: {
    //increment ({ commit }) {
    //  commit('increment')
    //}
  }
})

export default store
