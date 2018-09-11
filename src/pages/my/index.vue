<template>
  <div>
    <!-- 列表单元 第一行 START -->
    <div class="first-section">
      <img class="background-img" src="/resources/images/bkg.jpg">
      <div class="one-colum">
        <!-- <img style="width: 160rpx; height: 160rpx;" src="/resources/headImage/姜亿万.png"> -->
        <img style="width: 160rpx; height: 160rpx;" :src="userInfoForAPI.headimgurl">
      </div>
      <div class="two-colum">
        <div class="name">
          {{userInfoForAPI.nickname}}
        </div>
      </div>
    </div>
    <!-- 列表单元 第一行 END -->

    <!-- 列表单元 第二行 START -->
    <div class="second-row">
      <div class="one-colum" @click="toIDCard">
        <img style="width: 120rpx; height: 120rpx;" src="/resources/icon/peopleID.png">
        <div>身份认证</div>
      </div>
      <div class="two-colum" @click="toPhoneID">
        <img style="width: 120rpx; height: 120rpx;" src="../../../resources/icon/phoneID.png">
        <div>手机认证</div>
      </div>
      <div class="three-colum">
        <img style="width: 120rpx; height: 120rpx;" src="../../../resources/icon/share.png">
        <div>分享</div>
      </div>
    </div>
    <!-- 列表单元 第二行 END -->

    <!-- 列表单元 第三行 START -->
    <div class="three-row">
      <img style="width: 300rpx; height: 300rpx;" src="../../../resources/images/two-code.jpg">
    </div>
    <!-- 列表单元 第三行 END -->
  </div>
</template>

<script>

export default {
  data () {
    return {
      // userInfo: [] // 当前微信用户信息
      // ************当前用户信息需要的数据************
      userInfoForAPI: null,
    }
  },

  async onLoad () {
    wx.showTabBar({ animation: true })
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#4b55b6'
    })
    wx.setNavigationBarTitle({
      title: '我的'
    })
    wx.getStorage({
      key: 'userInfoForAPI',
      success: (res) => {
        console.log('res', res)
        console.log('res.data', res.data)
        this.userInfoForAPI = res.data
      }
    })
  },

  methods: {
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
  }
}
</script>

<style lang='scss'>
page {
  height: 100%;
  background-color: #e7e7e7;
  .first-section {
    width: 750rpx;
    height: 500rpx;
    display: flex;
    background-color: aquamarine;
    .background-img {
      z-index: 1;
      width: 750rpx;
      height: 500rpx;
      position: absolute;
      left: 0;
      top: 0;
    }
    .one-colum {
      width: 40%;
      height: 500rpx;
      z-index: 2;
      display: flex;
      justify-content: center;
      align-items: center;
      // background-color: #0080c0;
    }
    .two-colum {
      width: 60%;
      height: 500rpx;
      z-index: 3;
      font-size: 80rpx;
      color: #ffffff;
      display: flex;
      justify-content: space-around;
      align-items: center;
      // background-color: #ff80ff;
    }
  }
  .second-row {
    margin-top: 25rpx;
    width: 750prx;
    height: 220rpx;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: #ffffff;
    .one-colum {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .two-colum {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .three-colum {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
  .three-row {
    margin-top: 25rpx;
    width: 750prx;
    height: 350rpx;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: #ffffff;
  }
}
</style>
