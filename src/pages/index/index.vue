<template>
  <div class="content">
    <div class="login-image">
      <img src="../../../resources/login/Login_first.png" style="width:750rpx;height: 550rpx;" alt="建筑用工小程序欢迎您" />
    </div>
    <div class="slogan-text">
      <text class="slogan" decode="true">为了您的用工需求服务!</text>
    </div>
    <div class="start-button">
      <!-- <button type="primary" open-type="getUserInfo" lang="zh_CN" bindgetuserinfo="onGotUserInfo" style="background-color: #2862f9;">立即体验</button> -->
      <button type="primary" style="background-color: #2862f9;" @click="getUserInfo()">立即体验</button>
      <!-- <button type="primary" style="background-color: #2862f9;" @click="log()">log</button> -->
    </div>
    <div class="company-text">
      <text class="company" decode="true">公司名称有限公司</text>
    </div>
  </div>
</template>

<script>
import card from '@/components/card'

export default {
  data () {
    return {
      userInfo: {}
    }
  },
  components: {
    card
  },
  methods: {
    getUserInfo () {
      // 调用登录接口
      wx.login({
        success: () => {
          wx.getUserInfo({
            success: (res) => {
              this.userInfo = res.userInfo
            }
          })
        }
      })
      console.log('url le ')
      wx.switchTab({ url: '../getworks/main' })
    },
    printText () {
      console.log('打印了额!!!')
    },
    log () {
      wx.switchTab({ url: '../logs/main' })
    }
  },
  created () {
    wx.hideTabBar({ animation: true })
  }
}
</script>

<style scoped>
.content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.login-image {
  width: 100%;
  height: 45%;
}

.slogan-text {
  margin-top: 40rpx;
}

.slogan {
  font-size: 50rpx;
}

.start-button {
  width: 80%;
  margin-top: 160rpx;
}

.company-text {
  position: absolute;
  bottom: 10rpx;
}

.company {
  font-size: 25rpx;
  color: #c0c0c0;
}
</style>
