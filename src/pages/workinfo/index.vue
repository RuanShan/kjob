<template>
  <div class="content">
    <!-- 第一大行 ===> START -->
    <div class="first-line">
      <div class="one---row">
        <div class="one-row-left">
          {{item.city}}&nbsp;&nbsp;招&nbsp;-&nbsp;{{item.typeOfWork}}
        </div>
        <div class="one-row-right">
          <div class="worksClass">
            &nbsp;{{item.worksClass}}&nbsp;
          </div>
        </div>
      </div>
      <div class="two---row">
        <div class="two-row-left">
          价格:&nbsp;&nbsp;&nbsp;&nbsp;
          <div class="price">
            &nbsp;&nbsp;{{item.price}}
          </div>
        </div>
        <div class="two-row-right">
          工程量:
          <div class="worksAmount">
            &nbsp;&nbsp;{{item.worksAmount}}
          </div>
        </div>
      </div>
      <div class="three---row">
        <img style="width: 40rpx; height: 40rpx;" src="../../../resources/icon/location.png"> {{item.state}}&nbsp;&nbsp;-&nbsp;&nbsp;{{item.city}}
      </div>
    </div>
    <!-- 第一大行 ===> END -->

    <!-- 第二大行 ===> START -->
    <div class="second-line">
      <div class="one---row">
        <div class="one-row-left">
          <img style="width: 40rpx; height: 40rpx;" src="../../../resources/icon/discription.png">
        </div>
        <div class="one-row-right">
          &nbsp;&nbsp;招工描述
        </div>
      </div>
      <div class="two---row">
        {{item.description}}
      </div>
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
      <div class="one---row">
        <div class="one-row-left">
          <img style="width: 40rpx; height: 40rpx;" src="../../../resources/icon/phone.png">
        </div>
        <div class="one-row-right">
          &nbsp;&nbsp; 联系人 &nbsp;-&nbsp;{{item.publishName}}
        </div>
      </div>
    </div>
    <!-- 第四大行 ===> END -->

    <!-- 第五大行 ===> START -->
    <div class="fifth-line">
      <div class="one---row">
        <div class="one-row-left">
          <img style="width: 40rpx; height: 40rpx;" src="../../../resources/icon/warning.png">
        </div>
        <div class="one-row-right">
          &nbsp;&nbsp; {{warning}}
        </div>
      </div>
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
      title: '招工详情'
    })
    wx.setBackgroundColor({
      backgroundColor: '#F0F0F0' // 窗口的背景色为灰色
    })
    this.item = JSON.parse(option.dataObj) // 解析得到对象
    wx.getSystemInfo({
      success: (res) => {
        console.log(res.windowHeight) // 获取可使用窗口高度
        this.windowHeight = (res.windowHeight * (750 / res.windowWidth)) // 将高度乘以换算后的该设备的rpx与px的比例
        console.log(this.windowHeight) // 最后获得转化后得rpx单位的窗口高度
      }
    })
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
      height: 23%;
      background-color: #ffffff;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      .one---row {
        // margin-top: 25rpx;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        .one-row-left {
          padding-left: 25rpx;
          font-size: 50rpx;
          font-weight: bold;
        }
        .one-row-right {
          padding-right: 25rpx;
          .worksClass {
            font-size: 25rpx;
            border-radius: 30rpx;
            background-color: #97cbff;
            border: 1px solid #808080;
          }
        }
      }
      .two---row {
        // margin-top: 25rpx;
        padding-left: 25rpx;
        padding-right: 25rpx;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        .two-row-left {
          display: flex;
          .price {
            color: #fc0a77;
          }
        }
        .two-row-right {
          display: flex;
          .worksAmount {
            color: #fc0a77;
          }
        }
      }
      .three---row {
        padding-left: 25rpx;
        padding-right: 25rpx;
        padding-top: 20rpx;
        border-top: solid 1rpx #b8b8b8;
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
