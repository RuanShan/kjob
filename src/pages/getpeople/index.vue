<template>
  <div>
    <!-- 筛选 ===> START -->
    <div class="sizer">
      <div class="position-select">
        <button @click="showPickerForRegion">地区筛选</button>
        <mpvue-picker ref="mpvuePickerForRegion" :mode="modeForRegion" :deepLength="deepLengthForRegion" :pickerValueDefault="pickerRegionDefault" @onConfirm="onConfirmForRegion" @onCancel="onCancelForRegion" :pickerValueArray="pickerRegionArray"></mpvue-picker>
      </div>
      <div class="work-select">
        <button @click="showPickerForJob">工种筛选</button>
        <mpvue-picker ref="mpvuePickerForJob" :mode="modeForJob" :deepLength="deepLengthForJob" :pickerValueDefault="pickerJobDefault" @onConfirm="onConfirmForJob" @onCancel="onCancelForJob" :pickerValueArray="pickerJobArray"></mpvue-picker>
      </div>
    </div>
    <!-- 筛选 ===> END -->

    <!-- 列表概览 ===> START -->
    <div class="list">
      <div class="circular" v-for="item in peopleList" :key="item" @click="detail(item)">
        <div class="div-left">
          <div class="left-top">
            <div class="left-top-one">
              <img style="width: 80rpx; height: 80rpx;" :src='item.headimgurl'>
            </div>
            <div class="left-top-two">
              <div class="left-top-two-top">
                <div class="left-top-two-top-one">
                  {{item.realname}}
                </div>
                <div class="left-top-two-top-two">
                  <div class="certification">实名认证</div>
                </div>
              </div>
              <div class="left-top-two-bottom">
                {{item.nation}}&nbsp;&nbsp;&nbsp;&nbsp;{{item.age}}岁&nbsp;&nbsp;&nbsp;&nbsp;队伍:10至20人
              </div>
            </div>
          </div>
          <div class="left-bottom">
            <div class="job-item">
              {{item.job1_name}}
            </div>
            <div class="job-item" v-show="item.job2_name">
              {{item.job2_name}}
            </div>
            <div class="job-item" v-show="item.job3_name">
              {{item.job3_name}}
            </div>
          </div>
        </div>
        <div class="div-right">
          <div class="right-top">
            <div v-show="item.district1_fullname">
              {{item.district2_fullname}}
            </div>
            <div>
              {{item.district1_fullname}}
            </div>
            <div v-show="item.district1_fullname">
              {{item.district3_fullname}}
            </div>
          </div>
          <div class="right-bottom">
            发布时间:
            <div>
              {{item.created_at}}
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 列表概览 ===> END -->

  </div>
</template>

<script>
import mpvuePicker from 'mpvue-picker'
import { getJobTaxonTree, getRegionTree, searchApplicants } from '../../http/api.js'
export default {
  components: {
    mpvuePicker
  },
  data () {
    return {
      // ************地区筛选数据************
      modeForRegion: 'multiLinkageSelector',
      pickerRegionArray: [],
      pickerRegionDefault: [1],
      deepLengthForRegion: 3,

      // ************工种筛选数据**************
      resultTypeOfWork: { // 返回选择的工种类和工种
        team: '', // 工种类
        item: '' // 工种
      },
      modeForJob: 'multiLinkageSelector',
      pickerJobArray: [],
      pickerJobDefault: [1],
      deepLengthForJob: 2,

      // ************招工数量和浏览人数************
      onLineworkersNum: '1234', // 招工数量
      browsedTimes: '5678', // 浏览人数

      // ************找活列表************
      peopleList: [
        // {
        //   'id': 2,
        //   'realname': '李大阳', // 姓名
        //   'headimgurl': 'http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKQ6uAkRKEXBicIqEdKe4tkicM3Nr47VJq1HO5n2TkgGDg0AXXnfWtd3XQFQd3HyAOeYl15chtK6dRA/132',
        //   'age': '29', // 年龄
        //   'nation': '汉族', // 民族
        //   'members': 1, // 队伍 ****
        //   'description': 'this is desription', // 描述
        //   'state': 'pending', //
        //   'created_at': '2018-08-22', // 发布时间 *****
        //   'customer_realname': '',
        //   'district1_fullname': '北京市-东城区', // 地址
        //   'job_taxon1_name': '主体土建类', // 工种类 ****
        //   'job1_name': '木工', // 工种 ****
        //   'job2_name': '强弱电安装工', // 工种 ****
        //   'job3_name': '防水保温工' // 工种 ****
        // }
      ]
    }
  },

  async onLoad () {
    wx.showTabBar({ animation: true })
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#4b55b6'
    })
    wx.setNavigationBarTitle({
      title: '找活列表'
    })
    /* *************get kjob server 得到全国地区数据*************** */
    getRegionTree().then(res => {
      console.log('地区', res)
      this.pickerRegionArray = res;
    })
    /* *************get kjob server 得到工种数据*************** */
    getJobTaxonTree().then(res => {
      console.log('用工分类', res);
      this.pickerJobArray = res
    })
    /* *************get kjob server 得到工种数据*************** */
    searchApplicants().then((res) => {
      // let tempString = '';
      console.log(res);
      res.jobs.forEach((value) => {
        value.created_at = value.created_at.substring(0, 10)
      });
      this.peopleList = res.jobs;
    }).catch((err) => {
      console.log(err);
    })
  },

  methods: {
    // onConfirm (e) {
    //   // console.log (e)
    //   let tempArray = e
    //   this.mulLinkageTwoPicker.forEach((elem) => {
    //     if (tempArray[0] === elem.value) {
    //       this.resultTypeOfWork.team = elem.label
    //       elem.children.forEach((ele) => {
    //         if (tempArray[1] === ele.value) {
    //           this.resultTypeOfWork.item = ele.label
    //         }
    //       })
    //     }
    //   })
    //   console.log(this.resultTypeOfWork)
    // },

    // 点击展开详情,打开详情页面
    detail (item) {
      console.log(' 找活详情页面 !!!')
      console.log('item = ', item)
      wx.navigateTo({ url: '../peopleinfo/main?dataObj=' + JSON.stringify(item) }) // 当前点击的item,数据传递给招工详情页面
    },

    // ***************地区筛选方法***************
    showPickerForRegion () {
      this.$refs.mpvuePickerForRegion.show();
    },
    /* ********地区筛选mpvuePicker点击确定事件处理函数
    // 因为console.log(e)返回的是数组下标,故需要自己判断处理
    ******************** */
    onConfirmForRegion (e) {
      console.log(e);
    },
    onCancelForRegion (e) {
      console.log(e);
    },

    // ***************工种筛选方法***************
    showPickerForJob () {
      this.$refs.mpvuePickerForJob.show();
    },
    /* ********工种筛选mpvuePicker点击确定事件处理函数
    // 因为console.log(e)返回的是数组下标,故需要自己判断处理
    ******************** */
    onConfirmForJob (e) {
      console.log(e);
    },
    onCancelForJob (e) {
      console.log(e);
    },
  }
}
</script>

<style lang='scss'>
page {
  height: 100%;
  background-color: #f0f0f0;
}
.sizer {
  // position:absolute;
  width: 100%;
  height: 92rpx;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  .position-select {
    // float: left;
    width: 50%;
    position: fixed;
    left: 0rpx;
    top: 0rpx;
  }
  .work-select {
    // float: right;
    // position:fixed;
    width: 50%;
    position: fixed;
    left: 375rpx;
    top: 0rpx;
  }
}

.list {
  // margin-top: 40rpx;
  .circular {
    margin: 25rpx auto;
    background: #ffffff;
    width: 700rpx;
    height: 300rpx;
    border: 2px solid #d6d6d6;
    border-radius: 30rpx;
    // line-height: 200px;
    display: flex;
    flex-direction: row;
    .div-left {
      width: 500rpx;
      // background-color: #ff0080;
      .left-top {
        height: 60%;
        display: flex;
        .left-top-one {
          width: 100rpx;
          display: flex;
          justify-content: center;
          align-items: center;
          // background-color: #80ffff;
        }
        .left-top-two {
          width: 400rpx;
          display: flex;
          flex-direction: column;
          .left-top-two-top {
            height: 50%;
            width: 400rpx;
            // background-color: #ffff00;
            display: flex;
            .left-top-two-top-one {
              width: 60%;
              font-size: 50rpx;
              display: flex;
              justify-content: center;
              align-items: center;
            }
            .left-top-two-top-two {
              width: 40%;
              // background-color: dodgerblue;
              display: flex;
              justify-content: center;
              align-items: center;
              .certification {
                padding: 5rpx 20rpx;
                font-size: 28rpx;
                font-weight: bold;
                border-radius: 30rpx;
                border: solid 5rpx #fe0a9c;
                color: #f80404;
              }
            }
          }
          .left-top-two-bottom {
            color: #afafaf;
            width: 400rpx;
            height: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 29rpx;
            // background-color: #c0c0c0;
          }
        }
      }
      .left-bottom {
        height: 40%;
        width: 500rpx;
        // background-color: #ffffff;
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap-reverse;
        align-items: center;
        font-size: 30rpx;
        .job-item {
          text-align: center;
          border-radius: 30rpx;
          border: solid 1rpx #c0c0c0;
          background-color: #e6e6e6;
          width: 180rpx;
          padding: 0rpx 18rpx;
          height: 40rpx;
        }
        // .left-bottom-top {
        //   background-color: #ffff80;
        //   height: 50%;
        //   display: flex;
        //   justify-content: space-around;
        //   align-items: center;
        //   font-size: 25rpx;
        //   .job-item {
        //     border-radius: 30rpx;
        //     border: solid 1rpx #c0c0c0;
        //     background-color: #e6e6e6;
        //     padding: 5rpx 18rpx;
        //   }
        // }
        .left-bottom-bottom {
          // background-color: #ff8040;
          height: 50%;
        }
      }
    }
    .div-right {
      width: 200rpx;
      // background-color: #8080ff;
      display: flex;
      flex-direction: column;
      .right-top {
        height: 66%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        font-size: 25rpx;
        // background-color: darkorange;
      }
      .right-bottom {
        font-size: 25rpx;
        color: #b4b4b4;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 34%;
      }
    }
  }
}
</style>
