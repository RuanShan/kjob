<template>
  <div class="content">
    <div class="login-image">
      <img src="../../../resources/login/Login_first.jpg" style="width:750rpx;height: 550rpx;" alt="建筑用工小程序欢迎您" />
    </div>
    <div class="slogan-text">
      <text class="slogan" decode="true">为了您的用工需求服务!</text>
    </div>
    <div class="start-button">
      <!-- <button type="primary" open-type="getUserInfo" lang="zh_CN" bindgetuserinfo="onGotUserInfo" style="background-color: #2862f9;">立即体验</button> -->
      <button type="primary" style="background-color: #2862f9;" open-type="getUserInfo" @getuserinfo="onGotUserInfo">欢迎使用</button>
      <!-- <button open-type="getUserInfo" lang="zh_CN" @getuserinfo="onGotUserInfo">获取用户信息</button> -->
    </div>

    <!-- <button @click="toMyExperiense">我的经验</button> -->
    <!-- <button @click="toIDCard">身份认证</button>
    <button @click="toPhoneID">手机认证</button> -->

    <div class="company-text">
      <text class="company" decode="true">大连懿鑫建筑工程有限公司</text>
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
              console.log(this.userInfo)
              wx.setStorage({
                key: 'userInfo',
                data: this.userInfo
              })
            }
          })
        }
      })
      wx.switchTab({ url: '../getworks/main' })
    },
    onGotUserInfo: function (e) {
      console.log(e)
      // console.log('errMsg', e.mp.detail.errMsg)
      // console.log('userInfo ', e.mp.detail.userInfo)
      // console.log('rawData', e.mp.detail.rawData)
      // 判断点击是哪个按钮 如果点击授权,跳转页面;如果点击拒绝,弹窗提示
      if (e.mp.detail.userInfo !== undefined) {
        // 跳转getworks
        wx.switchTab({ url: '../getworks/main' })
      } else {
        wx.showModal({
          content: '程序需要授权才能运行',
          showCancel: false
        })
      }
    },
    // 经验点击处理函数-----跳转到我的经验页面
    toMyExperiense () {
      console.log('调到我的经验页面')
      wx.navigateTo({ url: '../myexperiense/main' }) // 跳转到我的经验页面
    },

    // *********************点击身份认证处理函数************************
    // ***跳转到身份证认证界面***
    // ***************************************************************
    toIDCard () {
      wx.navigateTo({ url: '../idcard/main' })
    },

    // *********************点击手机号码认证处理函数************************
    // ***跳转到手机认证界面***
    // ***************************************************************
    toPhoneID () {
      wx.navigateTo({ url: '../phoneid/main' })
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
