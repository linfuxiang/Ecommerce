import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

/* webpackChunkName: "index" */
// const routes = [{
//     path: '/',
//     component: () =>
//         import('@/views/index/index/index.vue'),
//     children: [{
//         path: '',
//         name: 'main',
//         component: () =>
//             import('@/views/index/main/index.vue'),
//     }, {
//         path: 'list',
//         name: 'list',
//         component: () =>
//             import('@/views/index/list/index.vue'),
//     }, {
//         path: 'user',
//         name: 'user',
//         component: () =>
//             import('@/views/index/user/index.vue'),
//     }]
// }, {
//     path: '/sub',
//     name: 'sub',
//     component: () =>
//         import('@/views/sub/index/index.vue'),
// }, {
//     path: '*',
//     redirect: '/',
// }]

const routes = [{
    path: '/index',
    name: 'index',
    component: () =>
        import('@/views/index.vue'),
    children: [{
        path: 'sub',
        name: 'sub',
        component: () =>
            import('@/views/sub.vue'),
        beforeEnter: (to, from, next) => {
            console.log('路由独享守卫：', 'beforeEnter');
            next();
        }
    }, {
        path: 'sub2',
        name: 'sub2',
        component: () =>
            import('@/views/sub2.vue'),
    }, ]
}, {
    path: '/index2',
    name: 'index2',
    component: () =>
        import('@/views/index2.vue'),
}, {
    path: '*',
    redirect: '/index',
}]

const router = new VueRouter({
    mode: 'history',
    routes,
    // scrollBehavior(to, from, savedPosition) {
    // console.log(to, from, savedPosition)
    // return { x: 0, y: 100 }
    // return new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //         resolve({ x: 0, y: 100 })
    //     }, 1000)
    // })
    // return 期望滚动到哪个的位置
    // }
})

router.beforeEach((to, from, next) => {
    console.log(to)
    console.log('全局守卫：', 'beforeEach')
    // setTimeout(next, 1000)
    next()
})

router.beforeResolve((to, from, next) => {
    console.log('全局守卫：', 'beforeResolve')
    next()
})

router.afterEach((to, from) => {
    console.log('全局守卫：', 'afterEach')
})

export default router