<template>
  <div class="content">
    <div class="item-link">
      <div class="link-left">
        公司名称:
      </div>
      <div class="link-right">
        {{item.state}}{{item.city}}-招 {{item.job_taxon_name}}
      </div>
    </div>

    <div class="item-link">
      <div class="link-left">
        项目地址:
      </div>
      <div class="link-right">
        {{item.state}}{{item.city}}{{district}}
      </div>
    </div>

    <div class="item-link">
      <div class="link-left">
        联系人:
      </div>
      <div class="link-right">
        <div class="callPhone">
          <div>{{linkman}}</div>
          <div>
            <button
              class="calling"
              type="primary"
              size="mini"
              @click="calling"
            >拨打</button>
          </div>
        </div>
      </div>
    </div>

    <div
      class="item-link"
      v-if="parttimeDisplay"
    >
      <div class="link-left">
        招工人数:
      </div>
      <div class="link-right">
        {{item.quantity}} 人
      </div>
    </div>

    <div
      class="item-link"
      v-if="parttimeDisplay"
    >
      <div class="link-left">
        工资标准:
      </div>
      <div class="link-right">
        {{item.pay_desc}}
      </div>
    </div>

    <!-- <div class="item-link" v-if="contractDisplay">
      <div class="link-left">
        工程量:
      </div>
      <div class="link-right">
        {{item.quantity_desc}}
      </div>
    </div> -->

    <div
      class="item-link"
      v-if="contractDisplay"
    >
      <div class="link-left">
        单价:
      </div>
      <div class="link-right">
        {{item.pay_desc}}
      </div>
    </div>

    <div class="item-link">
      <div class="link-left">
        要求/备注:
      </div>
      <div class="link-right">
        {{item.description}}
      </div>
    </div>

    <div class="item-link">
      <div class="link-left">
        发布时间:
      </div>
      <div class="link-right">
        {{item.releaseTime}}
      </div>
    </div>

    <div class="item-link">
      <div class="two---row">
        <div class="image-upload">
          <div class="pre-div-image">
            <block
              v-for="(item, index) in files"
              :key="index"
            >
              <div
                class="uploader-pre-image"
                @click="predivImage"
                :id="item"
              >
                <image
                  class="uploader__img"
                  :src="item"
                  mode="aspectFill"
                />
              </div>
            </block>
          </div>
        </div>
      </div>
    </div>

    <div class="item-link">
      <div class="fifth-line">
        <div class="one---row">
          <div class="one-row-left">
            <img
              style="width: 60rpx; height: 60rpx;"
              src="../../../resources/icon/warning.png"
            >
          </div>
          <div class="one-row-right">
            &nbsp;&nbsp;&nbsp;&nbsp; {{warning}}
          </div>
        </div>
      </div>
    </div>

    <!-- 第一大行 ===> START -->
    <!-- <div class="first-line" v-if="parttimeDisplay">
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
    </div> -->
    <!-- 第一大行 ===> END -->

    <!-- 第一大行 ===> START -->
    <!-- <div class="first-line" v-if="contractDisplay">
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
    </div> -->
    <!-- 第一大行 ===> END -->

    <!-- 第二大行 ===> START -->
    <!-- <div class="second-line">
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
    </div> -->
    <!-- 第二大行 ===> START -->

    <!-- 第三大行 ===> START -->
    <!-- <div class="third-line">
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
    </div> -->
    <!-- 第三大行 ===> END -->

    <!-- 第四大行 ===> START -->
    <!-- <div class="fourth-line">
      <div class="one---row">
        <div class="one-row-left">
          <img style="width: 40rpx; height: 40rpx;" src="../../../resources/icon/phone.png">
        </div>
        <div class="one-row-right">
          &nbsp;&nbsp; 联系人 &nbsp;-&nbsp;{{item.customer_realname}}
        </div>
      </div>
    </div> -->
    <!-- 第四大行 ===> END -->

    <!-- 第五大行 ===> START -->
    <!-- <div class="third-line">
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
    </div> -->
    <!-- 第五大行 ===> END -->

    <!-- 第六大行 ===> START -->
    <!-- <div class="fifth-line">
      <div class="one---row">
        <div class="one-row-left">
          <img style="width: 40rpx; height: 40rpx;" src="../../../resources/icon/warning.png">
        </div>
        <div class="one-row-right">
          &nbsp;&nbsp; {{warning}}
        </div>
      </div>
    </div> -->
    <!-- 第六大行 ===> END -->

    <!-- 第七大行 ===> START -->
    <!-- <div class="sixth-line">
      <button class="calling" type="primary" @click="calling">点击拨打电话</button>
    </div> -->
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
      district: null, // 区
      linkman: null, // 联系人
      item2: null, // 接收到的招工列表的JoSon数据
      windowHeight: null, // 当前手机可用窗口的高度,单位rpx
      parttimeDisplay: null, // 点工显示开关
      contractDisplay: null, // 包工显示开关
      warning: '建筑用工郑重声明：招聘过程中禁止提前支付费费用，必须在附近验证身份后再带入工地现场，以免被骗！若双方发生经济纠纷本平台概不负责！举报客服电话：13042482444'
    }
  },
  //动态分享
  onShareAppMessage (res) {
    return {
      title: '全国建筑工地招工找活信息平台',
      path: 'pages/getworks/main',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
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
    // wx.getStorage({
    //   key: 'userInfoForAPI',
    //   success: (res) => {
    //     this.userInfoForAPI = res.data;
    //   }
    // })
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


    this.userInfoForAPI = this.$store.state.userInfoForAPI; // 去VUEX 中的userInfoForAPI数据
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
    // 截取字符串 获得区
    let strIndexOf = this.find(this.item.district_fullname, '-', 1)
    this.district = this.item.district_fullname.substring(strIndexOf + 1)
    // this.linkman = this.item.customer_realname + this.item.customer_mobile

    // console.log('this.userInfoForAPI.id_num_identified_at = ', this.userInfoForAPI.hasOwnProperty('id_num_identified_at'));
    // console.log('this.userInfoForAPI.mobile_identified_at = ', this.userInfoForAPI.hasOwnProperty('mobile_identified_at'));

    // 判断是否身份和手机注册,若注册显示全部,若没有显示****,
    if (this.userInfoForAPI.hasOwnProperty('id_num_identified_at') && this.userInfoForAPI.hasOwnProperty('mobile_identified_at')) {
      console.log("真");
      this.linkman = this.item.customer_realname + this.item.customer_mobile
    } else {
      console.log("假");
      let tempMobile = this.item.customer_mobile;
      console.log("tempMobile = ", tempMobile);
      let tempLength = this.item.customer_mobile.length;
      console.log("tempLength = ", tempLength);
      let tempFourNum = tempMobile.substring(tempLength - 4);
      console.log("tempFourNum = ", tempFourNum);
      tempMobile = tempMobile.replace(tempFourNum, '****');
      console.log("tempMobile = ", tempMobile);
      this.linkman = this.item.customer_realname + tempMobile;
    }
  },

  methods: {
    // 拨打电话按钮,时间处理函数
    calling: function () {
      console.log("this.userInfoForAPI=", this.userInfoForAPI)

      // 根据当前用户信息判读是否进行了身份证认证和电话认证 id_num_identified_at mobile_identified_at
      if (this.userInfoForAPI.mobile_identified_at && this.userInfoForAPI.id_num_identified_at) {

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
          content: '请先进行手机认证和身份证认证,之后才能拨打电话!',
          showCancel: false,
           success: function(res) {
            if (res.confirm) {
              console.log('点击了确定按钮!!!');
              wx.switchTab({ url: '../my/main' }) // 跳转到免费注册页面
            }
          }
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
    find (str, cha, num) {
      var x = str.indexOf(cha);
      for (var i = 0; i < num; i++) {
        x = str.indexOf(cha, x + 1);
      }
      return x;
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
    .item-link {
      // border-top: 1px solid #bbbbbb;
      border-bottom: 1px solid #bbbbbb;
      background-color: #ffffff;
      padding: 20rpx;
      display: flex;
      font-size: 38rpx;
      letter-spacing: 4rpx;
      .link-left {
        font-weight: bold;
        width: 30%;
        // background-color: #80ff80;
      }
      .link-right {
        font-weight: normal;
        width: 70%;
        text-align: right;
        color: #2291ff;
        // background-color: #0080ff;

        .callPhone {
          display: flex;
          justify-content: space-between;
          .calling {
            font-size: 25rpx;
            margin: 0;
            padding: 3rpx;
            padding-left: 10rpx;
            padding-right: 10rpx;
            background-color: #2862f9;
          }
        }
      }
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
      .fifth-line {
        // height: 23%;
        background-color: #ffffff;
        flex-direction: column;
        justify-content: space-around;
        .one---row {
          padding: 0;
          display: flex;
          font-size: 36rpx;
          color: #ff82ff;
          // border-bottom: solid 1rpx #b8b8b8;
        }
      }
    }

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
