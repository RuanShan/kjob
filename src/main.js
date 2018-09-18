import Vue from 'vue'
import App from './App'
import store from './store/index'

import 'mpvue-weui/static/weui/weui.css'

Vue.config.productionTip = false
Vue.prototype.$store = store;

App.mpType = 'app'

// Vue.prototype.$store = store;

const app = new Vue(App)
app.$mount()
