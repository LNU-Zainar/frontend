import Vue from 'vue'
import VueRouter from 'vue-router'
import List from './pages/List.vue'
import Map from './pages/Map.vue'
import User from './pages/User.vue'
import Login from './pages/Login.vue'
import NotFound from './pages/NotFound.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: List,
    children: [
      {
        name: 'post',
        path: 'post/:id'
      }
    ]
  },
  {
    path: '/map',
    component: Map
  },
  {
    path: '/login',
    component: Login,
    meta: {
      hideHeader: true
    }
  },
  {
    path: '/user',
    component: User
  },
  {
    path: '*',
    component: NotFound
  }
]

const router = new VueRouter({
  routes
})

export default router