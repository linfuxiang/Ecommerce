import Vue from 'vue'
import App from './App.vue'
import router from './routes/router'
import store from './stores/store'
import './registerServiceWorker'
import axios from 'axios'
import './mocks/base'

const isProduction = process.env.NODE_ENV === 'production'

let api = function (
	args = {
		method: 'get',
    url: '',
    data: {}
	}
) {
	if(isProduction) {
		args.url = 'http://74.82.198.21:8888' + args.url
	}
	return axios(args)
}

import bus from '@/utils/bus'
import flexible from '@/utils/flexible'

Vue.config.productionTip = false

flexible.fixScreen({})

Vue.prototype.$api = api
Vue.prototype.bus = bus

// console.log(process.env.NODE_ENV)

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
