<template>
  <div class="content">
    <!-- 第一大行 ===> START -->
    <div class="first-line" v-if="parttimeDisplay">
      <div class="one---row">
        <div class="one-row-left">
          {{item.city}}&nbsp;招&nbsp;{{item.job_taxon_name}}
        </div>
        <div class="one-row-right">
          <div class="worksClass">
            &nbsp;{{item.job_taxon_parent_name}}&nbsp;
          </div>
        </div>
      </div>
      <div class="two---row">
        <div class="two-row-left">
          工资标准:&nbsp;&nbsp;&nbsp;&nbsp;
          <div class="price">
            &nbsp;&nbsp;{{item.pay}}&nbsp;&nbsp;人/天
          </div>
        </div>
        <div class="two-row-right">
          招工人数:
          <div class="worksAmount">
            &nbsp;&nbsp;{{item.quantity}}&nbsp;&nbsp;人
          </div>
        </div>
      </div>
      <div class="three---row">
        <img style="width: 40rpx; height: 40rpx;" src="../../../resources/icon/location.png"> {{item.state}}&nbsp;&nbsp;-&nbsp;&nbsp;{{item.city}}
      </div>
    </div>
    <!-- 第一大行 ===> END -->

    <!-- 第一大行 ===> START -->
    <div class="first-line" v-if="contractDisplay">
      <div class="one---row">
        <div class="one-row-left">
          {{item.city}}&nbsp;招&nbsp;{{item.job_taxon_name}}
        </div>
        <div class="one-row-right">
          <div class="worksClass">
            &nbsp;{{item.job_taxon_parent_name}}&nbsp;
          </div>
        </div>
      </div>
      <div class="two---row">
        <div class="two-row-left">
          单价:&nbsp;&nbsp;&nbsp;&nbsp;
          <div class="price">
            &nbsp;&nbsp;{{item.pay_desc}}&nbsp;&nbsp;元
          </div>
        </div>
        <div class="two-row-right">
          工程量:
          <div class="worksAmount">
            &nbsp;&nbsp;{{item.quantity_desc}}
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
        {{item.job_taxon_parent_name}}&nbsp;-&nbsp;{{item.job_taxon_name}}
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
          &nbsp;&nbsp; 联系人 &nbsp;-&nbsp;{{item.customer_realname}}
        </div>
      </div>
    </div>
    <!-- 第四大行 ===> END -->

    <!-- 第五大行 ===> START -->
    <div class="third-line">
      <div class="one---row">
        <div class="one-row-left">
          <img style="width: 40rpx; height: 40rpx;" src="../../../resources/icon/skill.png">
        </div>
        <div class="one-row-right">
          &nbsp;&nbsp; 工程照片
        </div>
      </div>
      <div class="two---row">
        <div class="image-upload">
          <div class="pre-div-image">
            <block v-for="(item, index) in files" :key="index">
              <div class="uploader-pre-image" @click="predivImage" :id="item">
                <image class="uploader__img" :src="item" mode="aspectFill" />
              </div>
            </block>
          </div>
        </div>
      </div>
    </div>
    <!-- 第五大行 ===> END -->

    <!-- 第六大行 ===> START -->
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
    <!-- 第六大行 ===> END -->

    <!-- 第七大行 ===> START -->
    <div class="sixth-line">
      <button class="calling" type="primary" @click="calling">点击拨打电话</button>
    </div>
    <!-- 第七大行 ===> END -->
  </div>
</template>

<script>

export default {
  data () {
    return {
      userInfoForAPI: null,
      files: [],
      phoneNumber: '', // 电话号码 来自API
      item: null, // 接收到的招工列表的JoSon数据
      item2: null, // 接收到的招工列表的JoSon数据
      windowHeight: null, // 当前手机可用窗口的高度,单位rpx
      parttimeDisplay: null, // 点工显示开关
      contractDisplay: null, // 包工显示开关
      warning: '建筑用工郑重声明：招聘过程中禁止提前支付费费用，必须在附近验证身份后再带入工地现场，以免被骗！若双方发生经济纠纷本平台概不负责！举报客服电话：13042482444'
    }
  },
  //动态分享
  // onShareAppMessage (res) {
  //   return {
  //     title: '全国建筑工地招工找活信息平台',
  //     path: 'pages/workinfo/main',
  //     success: function (res) {
  //       // 转发成功
  //     },
  //     fail: function (res) {
  //       // 转发失败
  //     }
  //   }
  // },
  onLoad (option) {
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

    wx.getSystemInfo({
      success: (res) => {
        console.log(res.windowHeight) // 获取可使用窗口高度
        this.windowHeight = (res.windowHeight * (750 / res.windowWidth)) // 将高度乘以换算后的该设备的rpx与px的比例
        console.log(this.windowHeight) // 最后获得转化后得rpx单位的窗口高度
      }
    })
  },

  onReady () {
    wx.getStorage({
      key: 'userInfoForAPI',
      success: (res) => {
        this.userInfoForAPI = res.data;
      }
    })
    // wx.getStorage({
    //   key: 'worksItem',
    //   success: (res) => {
    //     console.log(res.data)
    //     this.item = res.data
    //     // 判断是点工还是包工
    //     if (this.item.worker_type === 'parttime') {
    //       this.parttimeDisplay = true
    //       this.contractDisplay = false
    //     }
    //     if (this.item.worker_type === 'contract') {
    //       this.parttimeDisplay = false
    //       this.contractDisplay = true
    //     }
    //     this.files = (this.item.job_images.map((element) => { return element.original_url }))
    //     this.phoneNumber = this.item.customer_mobile
    //   }
    // }),
    this.item = this.$store.state.workDetailStore
    // 判断是点工还是包工
    if (this.item.worker_type === 'parttime') {
      this.parttimeDisplay = true
      this.contractDisplay = false
    }
    if (this.item.worker_type === 'contract') {
      this.parttimeDisplay = false
      this.contractDisplay = true
    }
    this.files = (this.item.job_images.map((element) => { return element.original_url }))
    this.phoneNumber = this.item.customer_mobile
  },

  methods: {
    // 拨打电话按钮,时间处理函数
    calling: function () {
      console.log("this.userInfoForAPI=", this.userInfoForAPI)

      // 根据当前用户信息判读是否进行了身份证认证和电话认证 id_num_identified_at mobile_identified_at
      if (this.userInfoForAPI.mobile_identified_at) {

        wx.makePhoneCall({
          phoneNumber: this.phoneNumber, // 来自API
          success: function () {
            console.log('拨打电话OK！')
          },
          fail: function () {
            console.log('拨打电话失败！')
            wx.showModal({
              content: '电话拨打失败,请检查手机设置或权限!',
              showCancel: false,
              success: function (res) {
              }
            })
          }
        })
      } else {
        wx.showModal({
          content: '请先进行手机认证,之后才能拨打电话!',
          showCancel: false
        })
      }
    },
    // *********************预览图片处理函数************************
    // ***调用wx.previewImage***
    // ***************************************************************
    predivImage (e) {
      console.log(e)
      wx.previewImage({
        current: e.currentTarget.id, // 当前显示图片的http链接
        urls: this.files // 需要预览的图片http链接列表
      })
    },
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
          font-size: 40rpx;
          font-weight: bold;
        }
        .one-row-right {
          padding-right: 25rpx;
          .worksClass {
            word-break: keep-all;
            margin-top: 15rpx;
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
        .image-upload {
          height: 228rpx;
          background-color: #ffffff;
          .uploader-input-box {
            float: left;
            position: relative;
            margin-right: 9px;
            margin-bottom: 9px;
            width: 77px;
            height: 77px;
            // border: 1px solid #d9d9d9;
            .add-image {
              margin: 25rpx;
              height: 200rpx;
              width: 200rpx;
              background-color: #ffffff;
              border: solid 1rpx #0080ff;
              display: flex;
              justify-content: center;
              align-items: center;
            }
          }
          .pre-div-image {
            .uploader__img {
              display: block;
              width: 180rpx;
              height: 180rpx;
            }
            .uploader-pre-image {
              float: left;
              margin: 25rpx;
              .delet-button {
                height: 40rpx;
                display: flex;
                align-items: center;
                font-size: 40rpx;
                justify-content: center;
              }
            }
          }
        }
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
