<template>
  <div class="content">

    <div class="top">
      <div class="top-image">
        <img style="width: 350rpx; height: 350rpx;" src="../../../resources/images/worker.png">
      </div>
      <div class="top-text">
        我是工人,让老板来找我
      </div>
      <div class="top-button">
        <button class="releaseWorkerInfo" type="primary" @click="releaseWorkerInfo">免费发布找活</button>
      </div>
    </div>

    <div class="bottom">
      <div class="bottom-image">
        <img style="width: 350rpx; height: 350rpx;" src="../../../resources/images/boss.png">
      </div>
      <div class="bottom-text">
        我是老板,让工人来找我
      </div>
      <div class="bottom-button">
        <button class="releaseWorkerInfo" type="primary" @click="releaseJobInfo">免费发布招工</button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getWxFollower
} from '../../http/api.js'

export default {
  data () {
    return {
      // ************当前用户信息需要的数据************
      userInfoForAPI: null,
    }
  },

  onLoad () {
    console.log('onLoad ..................开始');
    wx.showTabBar({ animation: true })
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#4b55b6'
    })
    wx.setNavigationBarTitle({
      title: '免费发布'
    })
    console.log('onLoad ..................结束');
  },

  onShow () {
    console.log('onShow ..................开始');
    wx.getStorage({
      key: 'userInfoForAPI',
      success: (res) => {
        console.log('getStorage userInfoForAPI 获取成功了!!!')
        let id = res.data.id
        getWxFollower(id).then((res) => {
          // console.log(res);
          // 得到当前用户微信数保和KJob用户信息保持到userInfoForAPI中
          this.userInfoForAPI = res;
          // 把当前用户微信数保和KJob用户信息保存到全局变量userInfoForAPI中
          wx.setStorage({
            key: 'userInfoForAPI',
            data: this.userInfoForAPI,
            success: (res) => {
              // console.log('setStorage data 后得 res = ', res);
              console.log('setStorage userInfoForAPI 存储成功了!!!')
            },
            fail: () => {
              console.log('setStorage userInfoForAPI 存储失败了*******')
            }
          })
        }).catch((err) => {
          console.log("API - getWxFollower 错误 = ", err);
        });
      }
    })

    console.log('onShow ..................结束');
  },

  methods: {
    releaseWorkerInfo () {
      console.log('免费发布找活信息****')
      // wx.navigateTo({ url: '../releasemy/main' }) // 跳转到我的找活页面

      // 根据当前用户信息判读是否进行了身份证认证和电话认证 id_num_identified_at mobile_identified_at
      if ((this.userInfoForAPI.id_num_identified_at !== null) || (this.userInfoForAPI.mobile_identified_at !== null)) {
        wx.navigateTo({ url: '../releasemy/main' }) // 跳转到我的找活页面
      } else {
        wx.showModal({
          content: '请先进行身份证认证和电话认证,之后才能发布信息!',
          showCancel: false
        })
      }
    },
    releaseJobInfo () {
      console.log('免费发布招工信息%%%')
      // wx.navigateTo({ url: '../releasejob/main' }) // 跳转到发布招工页面

      // 根据当前用户信息判读是否进行了身份证认证和电话认证
      // if (this.userInfoForAPI.hasOwnProperty('id_num_identified_at') || this.userInfoForAPI.hasOwnProperty('mobile_identified_at')) {
      if ((this.userInfoForAPI.id_num_identified_at !== null) || (this.userInfoForAPI.mobile_identified_at !== null)) {
        wx.navigateTo({ url: '../releasejob/main' }) // 跳转到发布招工页面
      } else {
        wx.showModal({
          content: '请先进行身份证认证和电话认证,之后才能发布信息!',
          showCancel: false
        })
      }
    }
  }
}
</script>

<style  lang='scss'>
page {
  height: 100%;
  background-color: #f0f0f0;
  .content {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .top {
      height: 49%;
      background-color: #ffffff;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      // .top-image {
      // }
      .top-text {
        font-size: 35rpx;
        color: #b8b8b8;
      }
      .top-button {
        width: 80%;
        .releaseWorkerInfo {
          background-color: #2862f9;
        }
      }
    }
    .bottom {
      height: 49%;
      background-color: #ffffff;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      // .bottom-image {
      // }
      .bottom-text {
        font-size: 35rpx;
        color: #b8b8b8;
      }
      .bottom-button {
        width: 80%;
        .releaseWorkerInfo {
          background-color: #ff8040;
        }
      }
    }
  }
}
</style>
