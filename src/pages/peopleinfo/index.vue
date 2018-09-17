<template>
  <div class="content">
    <!-- 第一大行 ===> START -->
    <div class="first-line">
      <img class="background-img" src="../../../resources/images/timg.jpg">
      <div class="one---row">
        <img style="width: 120rpx; height: 120rpx;" :src='item.headimgurl'>
      </div>
      <div class="two---row">
        {{item.realname}}
      </div>
    </div>
    <!-- 第一大行 ===> END -->

    <!-- 第二大行 ===> START -->
    <div class="second-line">
      <div class="one---row">
        <div class="one-row-left">
          <img style="width: 40rpx; height: 40rpx;" src="../../../resources/icon/baseinfo.png">
        </div>
        <div class="one-row-right">
          &nbsp;&nbsp; 基本信息
        </div>
      </div>
      <div class="two---row">
        <div>
          年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;龄&nbsp;&nbsp;:&nbsp;&nbsp;{{item.age}}&nbsp;&nbsp;岁
        </div>
        <div>
          民&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;族&nbsp;&nbsp;:&nbsp;&nbsp;{{item.nation}}
        </div>
        <div>
          个人或班组&nbsp;&nbsp;:&nbsp;&nbsp;10至20人
        </div>
        <div>
          找&nbsp;活&nbsp;区&nbsp;域&nbsp;&nbsp;:&nbsp;&nbsp;{{item.district1_fullname}}
        </div>
      </div>
    </div>
    <!-- 第二大行 ===> START -->

    <!-- 第三大行 ===> START -->
    <div class="third-line">
      <div class="one---row">
        <div class="one-row-left">
          <img style="width: 40rpx; height: 40rpx;" src="../../../resources/icon/tpyeOfWork.png">
        </div>
        <div class="one-row-right">
          &nbsp;&nbsp; 我的工种
        </div>
      </div>
      <div class="two---row">
        <div class="work-class">
          <div class="work-class-item" v-show="item.job_taxon1_name">
            {{item.job_taxon1_name}}
          </div>
          <div class="work-class-item" v-show="item.job_taxon2_name">
            {{item.job_taxon2_name}}
          </div>
          <div class="work-class-item" v-show="item.job_taxon3_name">
            {{item.job_taxon3_name}}
          </div>
        </div>
      </div>
    </div>
    <!-- 第三大行 ===> END -->

    <!-- 第四大行 ===> START -->
    <div class="fourth-line">
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
    <!-- 第四大行 ===> END -->

    <!-- 第五大行 ===> START -->
    <div class="fifth-line">
      <div class="one---row">
        <div class="one-row-left">
          <img style="width: 40rpx; height: 40rpx;" src="../../../resources/icon/work_line.png">
        </div>
        <div class="one-row-right">
          &nbsp;&nbsp; 工作经历
        </div>
      </div>
      <div class="two---row" v-for="(work, i ) in computedCustomerWorks" :key="work.id">
        <div>
          {{work.start_at}} ~ {{work.end_at}} {{work.district_fullname}}
        </div>
        <div>
          {{work.desription}}
        </div>
        <!-- <div class="work-image">
          <img style="width: 150rpx; height: 150rpx;" src="../../../resources/headImage/姜亿万.png">
          <img style="width: 150rpx; height: 150rpx;" src="../../../resources/headImage/姜亿万.png">
          <img style="width: 150rpx; height: 150rpx;" src="../../../resources/headImage/姜亿万.png">
        </div> -->
        <div class="image-upload">
          <div class="pre-div-image">
            <block v-for="(item, j) in work.work_images" :key="item.created_at" >
              <div class="uploader-pre-image" @click="predivImage" :id="item">
                <image class="uploader__img" :src="item.original_url" mode="aspectFill" />
              </div>
            </block>
          </div>
        </div>
      </div>

      <div  class="two---row" v-show="computedCustomerWorks.length==0"> 暂无经验 </div>
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
      files: [
        '../../../resources/images/bkg.jpg',
        '../../../resources/images/timg.jpg',
        '../../../resources/images/boss.png'
      ],
      item: {}, // 接收到的招工列表的JoSon数据
      windowHeight: null, // 当前手机可用窗口的高度,单位rpx
      warning: '工友请你在找活起见，请不要缴纳任何费用，已防止受骗。你在拨打电话时，若无人接听，可能对方正在忙。或者人不在。举报电话0411-12345678910'
    }
  },

  async onLoad (option) {
    console.log("peopleinfo onload is called..")
    console.log( "this.store.applicant", this.$store.state.applicant )
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
    this.item = {} //JSON.parse(option.dataObj) // 解析得到对象
  },
  computed:{
    computedCustomerWorks(){
      let works = this.item.customer_works || []
      return works
    }
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
      height: 20%;
      // background-color: #10b4bc;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .background-img {
        z-index: -1;
        width: 750rpx;
        // height: 500rpx;
        position: absolute;
        left: 0;
        top: 0;
      }
      .two---row {
        color: #ffffff;
        font-weight: bold;
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
        font-size: 30rpx;
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
        // font-size: 25rpx;
        .work-class {
          display: flex;
          font-size: 30rpx;
          .work-class-item {
            margin: 25rpx 15rpx;
            text-align: center;
            border-radius: 30rpx;
            border: solid 1rpx #c0c0c0;
            background-color: #e6e6e6;
            width: 218rpx;
            padding: 0rpx 1rpx;
            height: 40rpx;
          }
        }
        .tpye-of-work {
          font-size: 30rpx;
          display: flex;
          .job-item {
            margin: 25rpx;
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
        border-bottom: solid 1rpx #b8b8b8;
      }
      .two---row {
        padding: 25rpx;
        font-size: 25rpx;
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
        padding-left: 25rpx;
        padding-top: 25rpx;
        padding-bottom: 25rpx;
        border-bottom: solid 1rpx #b8b8b8;
      }
      .two---row {
        padding: 25rpx;
        .image-upload {
          height: 300rpx;
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
                height: 50rpx;
                display: flex;
                align-items: center;
                font-size: 40rpx;
                justify-content: center;
              }
            }
          }
        }
        .work-image {
          display: flex;
          justify-content: space-around;
        }
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
