import Vue from 'vue'
import VueRouter from 'vue-router'
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
    component: Map,
    meta: {
      title: '地图查找'
    }
  },
  {
    path: '/add',
    component: Add,
    meta: {
      title: '发布',
      hideAddButton: true
    }
  },
  {
    path: '/login',
    component: Login,
    meta: {
      title: '登录注册',
      hideHeader: true,
      hideAddButton: true
    }
  },
  {
    path: '/user',
    component: User,
    meta: {
      title: '用户中心'
    }
  },
  {
    path: '*',
    component: NotFound,
    meta: {
      title: '404'
    }
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next()
})

export default router