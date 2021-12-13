<template>
  <div class="about">
    <el-image class="top-banner" src="/images/lost-and-found-full.jpg" fit="cover"></el-image>
    <h2>项目目的</h2>
    <p>
      在校园里，任何人都有可能遗失物品，可是没有一个很好的平台，让我们找回遗失的物品，或者说没有一个统一的线上平台供我们发布失物招领信息。这让我们有了做这个网站的动力。
    </p>
    
    <h2>项目背景</h2>
    <p>传统方式缺点：遗失物品找回难度大，效率低下，不能准确定位遗失地点。</p>
    <p>失物招领网站前景：校园遗失物品数量多，线上网站信息集中化，更有效率省时间地找回遗失物品。简化寻物流程。减少工作人员的工作量。</p>
    <p>网站必要性：校园内同类型项目数量少，业务需求量大。</p>

    <h2>团队成员</h2>
    <div class="members">
      <div class="member" v-for="member in members" :key="member.name">
        <el-avatar :src="member.avatar" :size="50"></el-avatar>
        <strong>{{ member.name }}</strong>
      </div>
    </div>

    <p class="slogan">
      我们是来自计智院2019级计科3班的一个小团队。<br>
      Talk is cheap. Show me the code.
    </p>

    <h2>联系我们</h2>
    <p>邮箱地址：<a href="mailto:chillyond@gmail.com">
      <el-button type="text" style="font-size: inherit;">
        chillyond@gmail.com
      </el-button>
    </a></p>
    <p>联系地址：湛江市岭南师范学院博雅苑210栋108室</p>

    <h2>赞助打赏</h2>
    <p>如果您觉得我们的项目给您提供了小小的帮助，您可以通过微信扫描以下打赏码，为我们赞助一杯咖啡钱：）</p>
    <div class="buy-me-a-coffee">
      <el-image src="/images/buy-me-a-coffee.png"></el-image>
      <el-image src="/images/qrcode.png" class="qrcode"></el-image>
    </div>
    <p>祝您有美好的一天，今后不再丢三落四❤️</p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      members: [
        {
          name: '林来疯',
          avatar: '/images/lcy.png'
        },
        {
          name: 'LaZyDog',
          avatar: '/images/pjh.png'
        },
        {
          name: 'Enigma',
          avatar: '/images/hwz.png'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.about {
  .top-banner {
    width: 100%;
    height: 350px;
    border-radius: 5px;
  }
  .members {
    display: flex;
    justify-content: center;
    .member {
      display: flex;
      align-items: center;
      margin: 0 20px;
      .el-avatar {
        margin-right: 5px;
      }
    }
  }
  .slogan {
    padding: 1em;
    text-align: center;
    line-height: 1;

    &:before, &:after {
      vertical-align: middle;
      font-size: 28px;
      color: #909399;
    }
    &:before {
      content: "“";
      
    }
    &:after {
      content: "”";
    }
  }
  .buy-me-a-coffee {
    display: flex;
    .qrcode {
      margin-left: 20px;
      width: 150px;
    }
  }
}
</style>