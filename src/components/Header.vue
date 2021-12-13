<template>
  <header class="header">
    <div class="header-wrap">
      <div class="logo">
        <router-link to="/" class="logo-link">
        </router-link>
      </div>
      <nav class="nav">
        <ul class="nav-list">
          <li v-for="link in routerLinks" :key="link.text">
            <router-link :to="link.to" :class="{'is-active': checkIsActive(link.to)}">
              <i :class="link.icon"></i>
              {{link.text}}
            </router-link>
          </li>
        </ul>
      </nav>
      <div class="user-login">
        <i class="iconfont icon-user"></i>
        <template v-if="isLogin">
          <router-link to="/user">{{ user.nickname }}</router-link>
          <a @click="onLogout" class="logout">退出</a>
        </template>
        <template v-else>
          <router-link :to="{
            name: 'login',
            query: {
              from: $route.fullPath
            }
          }">
            登录
          </router-link>
          <span class="sep">/</span>
          <router-link :to="{
            name: 'login',
            query: {
              type: 'signup',
              from: $route.fullPath
            }
          }">
            注册
          </router-link>
        </template>
      </div>
    </div>
  </header>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'Header',
  computed: {
    ...mapGetters(['isLogin']),
    ...mapState(['user', 'isUserLoading'])
  },
  data () {
    return {
      routerLinks: [
        {
          to: { name: 'index' },
          text: '失物招领',
          icon: 'iconfont icon-item'
        },
        {
          to: { name: 'map' },
          text: '地图查找',
          icon: 'iconfont icon-location'
        },
        {
          to: { name: 'about' },
          text: '关于我们',
          icon: 'iconfont icon-happy'
        }
      ]
    }
  },
  methods: {
    checkIsActive (item) {
      return this.$route.matched.some(route => {
        return item.name === route.name
      })
    },
    onLogout () {
      this.$store.dispatch('logout').then(() => {
        const requireAuth = this.$route.matched.some(route => {
          return route.meta.requireAuth
        })
        if (requireAuth) {
          this.$router.push({
            name: 'login',
            query: {
              from: this.$route.fullPath
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  background: rgba($primaryColor, 0.1);
  height: 50px;
  &-wrap {
    display: flex;
    justify-content: space-between;
    max-width: $wrapWidth;
    height: 50px;
    margin: 0 auto;
    align-items: center;
  }

  a {
    color: rgba($primaryColor, .9);
    transition: color .3s;
    &:hover {
      color: rgba($primaryColor, 1);
    }
  }
}

.logo {
  flex-basis: 25%;

  &-link {
    display: block;
    width: 100px;
    height: 22px;
    font-size: 22px;
    font-weight: bold;
    color: rgba($primaryColor, 1);
    background: url('../assets/logo.png') no-repeat left / contain;
  }
}

.nav {
  flex-basis: 50%;
  &-list {
    display: flex;
    justify-content: center;
    li {
      padding: 0 16px;
      line-height: 50px;
    }
    a {
      position: relative;
      line-height: 50px;
      display: inline-block;
      transition: all .3s;
      color: #333;
      font-weight: bold;

      &:after {
          content: '';
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          bottom: 8px;
          width: 4px;
          height: 4px;
          border-radius: 4px;
          background: $primaryColor;
          opacity: 0;
        }

      &.is-active  {
        color: rgba($primaryColor, 1);
        &:after {
          opacity: 1;
        }
      }
    }
  }
}

.user-login {
  flex-basis: 25%;
  font-size: 14px;
  color: #111;
  text-align: right;
  a {
    position: relative;
    padding: 0 .3em;
    color: currentColor;
    cursor: pointer;
  }
}
</style>
