import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store'
import List from './pages/List.vue'
import Map from './pages/Map.vue'
import Add from './pages/Add.vue'
import User from './pages/User.vue'
import Login from './pages/Login.vue'
import NotFound from './pages/NotFound.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: List,
    meta: {
      title: '首页'
    },
    children: [
      {
        name: 'post',
        path: 'post/:id',
        meta: {
          title: '详情'
        }
      }
    ]
  },
  {
    path: '/map',
    name: 'map',
    component: Map,
    meta: {
      title: '地图查找'
    }
  },
  {
    path: '/add',
    name: 'add',
    component: Add,
    meta: {
      title: '发布',
      hideAddButton: true,
      requireAuth: true
    }
  },
  {
    path: '/edit/:id',
    name: 'edit',
    component: Add,
    meta: {
      title: '编辑',
      hideAddButton: true,
      requireAuth: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      title: '登录注册',
      hideHeader: true,
      hideAddButton: true
    }
  },
  {
    path: '/user',
    name: 'user',
    component: User,
    meta: {
      title: '用户中心',
      requireAuth: true
    },
    children: [
      {
        name: 'user-post',
        path: 'posts/:id',
        meta: {
          title: '详情'
        }
      }
    ]
  },
  {
    path: '*',
    name: '404',
    component: NotFound,
    meta: {
      title: '404'
    }
  }
]

const router = new VueRouter({
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (to.hash) {
        return {
          selector: to.hash
        }
      }
    }
  }
})

router.onError(() => {
  router.app.$Progress.finish()
})

router.beforeEach((to, from, next) => {
  document.title = process.env.VUE_APP_TITLE + '-' + to.meta.title
  if (store.getters.isLogin && to.name === 'login') {
    next(false)
  } else {
    router.app.$Progress.start()
    next()
  }
})

router.afterEach(() => {
  router.app.$Progress.finish()
})

router.beforeEach((to, from, next) => {
  if (store.getters.isLogin) {
    next()
  } else {
    const requireAuth = to.matched.some(route => {
      return route.meta.requireAuth
    })
    store.dispatch('queryUser').then(() => {
      next()
    }, () => {
      // 未登录
      if (requireAuth) {
        next({
          name: 'login',
          query: {
            from: to.fullPath
          }
        })
      }
    })
    if (!requireAuth) {
      next()
    }
  }
})

export default router
