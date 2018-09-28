import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [{
    path: '/',
    component: () =>
    import( /* webpackChunkName: "index" */ '@/views/index/index/index.vue'),
    children: [{
        path: '',
        name: 'main',
        component: () =>
      import( /* webpackChunkName: "main" */ '@/views/index/main/index.vue'),
    }, {
        path: 'list',
        name: 'list',
        component: () =>
      import( /* webpackChunkName: "list" */ '@/views/index/list/index.vue'),
    }, {
        path: 'user',
        name: 'user',
        component: () =>
      import( /* webpackChunkName: "user" */ '@/views/index/user/index.vue'),
    }]
}, {
    path: '/sub',
    name: 'sub',
    component: () =>
    import( /* webpackChunkName: "index" */ '@/views/sub/index/index.vue'),
}, {
    path: '*',
    redirect: '/',
}]

export default new VueRouter({
    // mode: 'history',
    routes,
})