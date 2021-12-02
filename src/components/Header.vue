<template>
  <header class="header">
    <div class="header-wrap">
      <router-link to="/" class="logo">Zainar</router-link>
      <nav class="nav">
        <ul class="nav-list">
          <li v-for="link in routerLinks" :key="link.text">
            <router-link :to="link.to">{{link.text}}</router-link>
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
    ...mapState(['user'])
  },
  data () {
    return {
      routerLinks: [
        {
          to: '/',
          text: '失物招领'
        },
        {
          to: '/map',
          text: '地图查找'
        }
      ]
    }
  },
  methods: {
    onLogout () {
      this.$store.dispatch('logout').then(() => {
        if (this.$route.meta.requireAuth) {
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
  background: rgba($primaryColor, .1);
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

  .logo {
    margin-left: 10px;
    font-size: 22px;
    font-weight: bold;
    color: rgba($primaryColor, 1);
  }
}


.nav-list {
  display: flex;
  li {
    padding: 0 18px;
    line-height: 50px;
  }
  a {
    position: relative;
    line-height: 50px;
    display: inline-block;
    transition: all .3s;

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

    &.router-link-exact-active  {
      font-weight: bold;
      color: rgba($primaryColor, 1);
      &:after {
        opacity: 1;
      }
    }
  }
}

.user-login {
  font-size: 14px;
  color: #111;
  a {
    position: relative;
    padding: 0 .3em;
    color: currentColor;
    cursor: pointer;
  }
  .logout {

  }
}
</style>
