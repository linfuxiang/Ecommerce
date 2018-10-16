import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const moduleA = {
    namespaced: true,
    state: {
        // name: {
        	name: 'A',
        // },
        count: 0,
    },
    mutations: {
        increment(state) {
            state.name += 'A'
        }
    },
    getters: {

    },
    actions: {
        increment({ state, commit, rootState, rootGetters }) {
            commit('increment')
            setTimeout(() => { commit('increment') }, 2000)
            // commit('moduleB/increment', null, { root: true })
        }
    }
}

const moduleB = {
    namespaced: true,
    state: {
        name: 'B',
        count: 0,
    },
    getters: {
        nnn() {
            return 'BBB'
        },
    },
    mutations: {
        increment(state) {
            state.name += 'B'
        }
    },
    actions: {

    }
}

const store = new Vuex.Store({
    modules: {
        moduleA,
        moduleB
    }
})

// store.subscribe((mutation) => {
//     console.log(mutation)
// })
// store.subscribeAction((mutation) => {
//     console.log(mutation)
// })
store.watch(
    (state) => state.moduleA.name,
    (val1, val2) => {console.log(val1, val2)}
)
// console.log(subs)
// setTimeout(()=>{
// 	subs()
// }, 5000)

export default store