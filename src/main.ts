import Vue from 'vue'
import App from './App.vue'
import router from './routes/router'
import store from './stores/store'
import './registerServiceWorker'

import axios from 'axios'
import bus from '@/utils/bus'
import flexible from '@/utils/flexible'

Vue.config.productionTip = false

flexible.fixScreen({})

Vue.prototype.axios = axios
Vue.prototype.bus = bus

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
