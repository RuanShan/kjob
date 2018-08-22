<template>
  <div class="content">
    <!-- 第一大行 ===> START -->
    <div class="first-line">
      <div class="one---row">
        <img style="width: 120rpx; height: 120rpx;" src="../../../resources/headImage/姜亿万.png">
      </div>
      <div class="two---row">
        {{item.realname}}
      </div>
    </div>
    <!-- 第一大行 ===> END -->
          <img style="width: 40rpx; height: 40rpx;" src="../../../resources/icon/baseinfo.png">

    <!-- 第二大行 ===> START -->
    <div class="second-line">

    </div>
    <!-- 第二大行 ===> START -->

    <!-- 第三大行 ===> START -->
    <div class="third-line">
      <div class="one---row">
        <div class="one-row-left">
          <img style="width: 40rpx; height: 40rpx;" src="../../../resources/icon/skill.png">
        </div>
        <div class="one-row-right">
          &nbsp;&nbsp; 职业技能
        </div>
      </div>
      <div class="two---row">
        {{item.worksClass}}&nbsp;-&nbsp;{{item.typeOfWork}}
      </div>
    </div>
    <!-- 第三大行 ===> END -->

    <!-- 第四大行 ===> START -->
    <div class="fourth-line">

    </div>
    <!-- 第四大行 ===> END -->

    <!-- 第五大行 ===> START -->
    <div class="fifth-line">

    </div>
    <!-- 第五大行 ===> END -->

    <!-- 第六大行 ===> START -->
    <div class="sixth-line">
      <button class="calling" type="primary" @click="calling">点击拨打电话</button>
    </div>
    <!-- 第六大行 ===> END -->
  </div>
</template>

<script>

export default {
  data () {
    return {
      item: null, // 接收到的招工列表的JoSon数据
      windowHeight: null, // 当前手机可用窗口的高度,单位rpx
      warning: '工友请你在找活起见，请不要缴纳任何费用，已防止受骗。你在拨打电话时，若无人接听，可能对方正在忙。或者人不在。举报电话0411-12345678910'
    }
  },

  async onLoad (option) {
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#4b55b6'
    })
    wx.setNavigationBarTitle({
      title: '找活详情'
    })
    wx.setBackgroundColor({
      backgroundColor: '#F0F0F0' // 窗口的背景色为灰色
    })
    this.item = JSON.parse(option.dataObj) // 解析得到对象
  },

  methods: {
    getData () {
      console.log('开始接收数据了')
      wx.getStorage({
        key: 'abc',
        success: (res) => {
          console.log(res.data)
          this.Data = res.data
        }
      })
    },
    calling: function () {
      wx.makePhoneCall({
        phoneNumber: '12345678900', // 此号码并非真实电话号码，仅用于测试
        success: function () {
          console.log('拨打电话OK！')
        },
        fail: function () {
          console.log('拨打电话失败！')
          wx.showModal({
            content: '电话拨打失败,请检查手机设置或权限!',
            showCancel: false,
            success: function (res) {
              // if (res.confirm) {
              //   console.log('用户点击确定')
              // }
            }
          })
        }
      })
    }
  }
}
</script>

<style lang='scss'>
page {
  height: 100%;
  background-color: #f0f0f0;
  .content {
    height: 100%;
    .first-line {
      height: 20%;
      background-color: #10b4bc;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .two---row {
        color: #ffffff;
        font-weight:bold;
      }
    }
    .second-line {
      margin-top: 25rpx;
      // height: 23%;
      background-color: #ffffff;
      flex-direction: column;
      justify-content: space-around;
      .one---row {
        display: flex;
        padding-left: 25rpx;
        padding-top: 25rpx;
        padding-bottom: 25rpx;
        border-bottom: solid 1rpx #b8b8b8;
      }
      .two---row {
        padding: 25rpx;
        font-size: 25rpx;
      }
    }
    .third-line {
      margin-top: 25rpx;
      // height: 23%;
      background-color: #ffffff;
      flex-direction: column;
      justify-content: space-around;
      .one---row {
        display: flex;
        padding-left: 25rpx;
        padding-top: 25rpx;
        padding-bottom: 25rpx;
        border-bottom: solid 1rpx #b8b8b8;
      }
      .two---row {
        padding: 25rpx;
        font-size: 25rpx;
      }
    }
    .fourth-line {
      margin-top: 25rpx;
      // height: 23%;
      background-color: #ffffff;
      flex-direction: column;
      justify-content: space-around;
      .one---row {
        display: flex;
        padding-left: 25rpx;
        padding-top: 25rpx;
        padding-bottom: 25rpx;
        // border-bottom: solid 1rpx #b8b8b8;
      }
    }
    .fifth-line {
      margin-top: 25rpx;
      // height: 23%;
      background-color: #ffffff;
      flex-direction: column;
      justify-content: space-around;
      .one---row {
        display: flex;
        padding: 25rpx;
        font-size: 25rpx;
        color: #ff82ff;
        // border-bottom: solid 1rpx #b8b8b8;
      }
    }
    .sixth-line {
      margin-top: 25rpx;
      padding: 25rpx;
      // height: 10%;
      background-color: #ffffff;
      .calling {
        background-color: #2862f9;
      }
    }
  }
}
</style>
