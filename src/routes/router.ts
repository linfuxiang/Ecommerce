import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/views/index/index.vue'
Vue.use(VueRouter)

const routes = [{
  path: '/',
  name: 'index',
  component: () =>
    import( /* webpackChunkName: "index" */ '@/views/index/index.vue'),
  children: [{
    path: '',
    name: 'main',
    component: () =>
      import( /* webpackChunkName: "main" */ '@/views/main/main.vue'),
  }, {
    path: 'list',
    name: 'list',
    component: () =>
      import( /* webpackChunkName: "list" */ '@/views/list/list.vue'),
  }, {
    path: 'user',
    name: 'user',
    component: () =>
      import( /* webpackChunkName: "user" */ '@/views/user/user.vue'),
  }]
}, {
  path: '/sub',
  name: 'sub',
  component: () =>
    import( /* webpackChunkName: "index" */ '@/views/sub/index.vue'),
}]

export default new VueRouter({
  // mode: 'history',
  routes,
})