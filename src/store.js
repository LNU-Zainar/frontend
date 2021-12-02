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
    setUser (state, user) {
      state.user = user
    }
  },
  actions: {
    register ({ commit }, data) {
      return new Promise((resolve, reject) => {
        api.register(data, {
          // notifyType: 'f'
        }).then(data => {
          commit('setUser', {
            id: data.uid,
            nickname: data.nickname
          })
          resolve()
        }, reject)
      })
    },
    login ({ commit }, data) {
      return new Promise((resolve, reject) => {
        api.login(data, {
          notifyType: 'f'
        }).then(data => {
          commit('setUser', {
            id: data.uid,
            nickname: data.nickname
          })
          resolve()
        }, reject)
      })
    },
    logout ({ commit }) {
      return new Promise((resolve, reject) => {
        api.logout(null, {
          notifyType: 'fs'
        }).then(() => {
          commit('setUser', {})
          resolve()
        }, reject)
      })
    },
    queryUser ({ commit }) {
      return new Promise((resolve, reject) => {
        api.getUserInfo(null, {
          notifyType: ''
        }).then(data => {
          commit('setUser', {
            id: data.uid,
            nickname: data.nickname,
            avatar: data.avatar
          })
          resolve()
        }, reject)
      })
    },
  }
})

export default store
