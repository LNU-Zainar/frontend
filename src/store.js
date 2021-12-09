import Vue from 'vue'
import Vuex from 'vuex'
import * as api from './common/api'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: {}
  },
  getters: {
    isLogin (state) {
      return Boolean(Object.keys(state.user).length)
    }
  },
  mutations: {
    setUser (state, data) {
      state.user = {
        id: data.uid,
        nickname: data.nickname,
        avatar: data.avatar,
        phone: data.phone,
        email: data.email,
        description: data.description
      }
    },
    clearUser (state) {
      state.user = {}
    }
  },
  actions: {
    register (context, data) {
      return new Promise((resolve, reject) => {
        api.register(data).then(data => {
          context.commit('setUser', data)
          resolve(data)
        }, reject)
      })
    },
    login (context, data) {
      return new Promise((resolve, reject) => {
        api.login(data, {
          notifyType: 'f'
        }).then(() => {
          context.dispatch('queryUser').then(resolve, reject)
        }, reject)
      })
    },
    logout ({ commit }) {
      return new Promise((resolve, reject) => {
        api.logout().then(data => {
          commit('clearUser')
          resolve(data)
        }, reject)
      })
    },
    queryUser (context) {
      return new Promise((resolve, reject) => {
        api.getUserInfo(null, {
          notifyType: ''
        }).then(data => {
          context.commit('setUser', data)
          resolve(data)
        }, reject)
      })
    },
    modifyUser (context, data) {
      return new Promise((resolve, reject) => {
        api.putUserInfo(data).then(() => {
          context.dispatch('queryUser').then(resolve, reject)
        }, reject)
      })
    }
  }
})

export default store
