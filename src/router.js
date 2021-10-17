import VueRouter from 'vue-router'
import List from './pages/List.vue'
import Map from './pages/Map.vue'
import Login from './pages/Login.vue'

const routes = [
  {
    path: '/',
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
  }
]

const router = new VueRouter({
  routes
})

export default router