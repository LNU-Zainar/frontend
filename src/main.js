import Vue from 'vue'
import ElementUI from 'element-ui'
import VueProgressBar from 'vue-progressbar'
import './styles/index.scss'
import App from './App.vue'
import router from './router'
import store from './store'

const options = {
  color: '#0066FF',
  failedColor: 'red',
  thickness: '2px',
  transition: {
    speed: '.2s',
    opacity: '.6s',
    termination: 300
  },
  autoRevert: true,
  location: 'top',
  inverse: false
}

Vue.use(VueProgressBar, options)
Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
