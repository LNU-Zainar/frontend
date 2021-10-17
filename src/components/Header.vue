<template>
  <header class="header">
    <div class="header-wrap">
      <a href="" class="logo">Zainar</a>
      <nav class="nav">
        <ul class="nav-list">
          <li v-for="link in routerLinks" :key="link.text">
            <router-link :to="link.to">{{link.text}}</router-link>
          </li>
        </ul>
      </nav>
      <div class="user-login">
        <i class="iconfont icon-user"></i>
        <router-link to="/login">登录</router-link>
        <router-link to="/login">注册</router-link>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
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
  }
}
</script>

<style lang="scss" scoped>
.header {
  background: #0066FF;
  color: #fff;
  &-wrap {
    display: flex;
    justify-content: space-between;
    max-width: $wrapWidth;
    height: 50px;
    margin: 0 auto;
    align-items: center;
  }

  a {
    color: rgba(255,255,255, .8);
    transition: color .3s;
    &:hover {
      color: rgba(255,255,255, 1);
    }
  }

  .logo {
    margin-left: 10px;
    font-size: 22px;
    font-weight: bold;
    color: rgba(255,255,255, 1);
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
        bottom: 0;
        width: 0;
        height: 0;
        border: solid transparent;
        border-bottom-color: #fff;
        border-width: 0px 8px 8px 8px;
        opacity: 0;
      }

    &.router-link-exact-active  {
      font-weight: bold;
      color: rgba(255,255,255, 1);
      &:after {
        opacity: 1;
      }
    }
  }
}

.user-login {
  a {
    position: relative;
    padding: 0 .5em;

    &:first-of-type:after {
      content: '';
      position: absolute;
      right: 0;
      top: 50%;
      width: 1px;
      height: 15px;
      background: rgba(255,255,255, .85);
      transform: translateY(-50%);
    }
  }
}
</style>
