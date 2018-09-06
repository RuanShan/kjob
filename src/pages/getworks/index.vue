<template>
  <div>
    <!-- 筛选 ===> START -->
    <div class="sizer">
      <div class="position-select">
        <button @click="showPickerForRegion">地区筛选</button>
        <mpvue-picker ref="mpvuePickerForRegion" :mode="modeForRegion" :deepLength="2" :pickerValueDefault="pickerRegionDefault" @onChange="onChangeForRegion" @onConfirm="onConfirmForRegion" @onCancel="onCancelForRegion" :pickerValueArray="pickerRegionArray"></mpvue-picker>
      </div>
      <div class="work-select">
        <!-- <button @click="showPicker">工种筛选</button>
        <mpvue-picker ref="mpvuePicker" :mode="mode" :deepLength="deepLength" :pickerValueArray="mulLinkageTwoPicker" :pickerValueDefault='pickerValueDefault' @onConfirm="onConfirm"></mpvue-picker> -->
        <button @click="showPickerForJob">工种筛选</button>
        <mpvue-picker ref="mpvuePickerForJob" :mode="modeForJob" :deepLength="deepLengthForJob" :pickerValueDefault="pickerJobDefault" @onChange="onChangeForJob" @onConfirm="onConfirmForJob" @onCancel="onCancelForJob" :pickerValueArray="pickerJobArray"></mpvue-picker>
      </div>
    </div>
    <!-- 筛选 ===> END -->

    <!-- 统计 ===> START -->
    <div class="statistics">
      <div class="works-num">
        今日在线招工数:
        <div class="works-num-color">{{onLineworkersNum}}</div>
      </div>
      <div class="people-num">
        今日浏览人次:
        <div class="people-num-color">{{browsedTimes}}</div>
        <div></div>
      </div>
    </div>
    <!-- 统计 ===> END -->

    <!-- 列表概览 ===> START -->
    <div id="job-list-wrap" class="list">

      <scroll-view class="job-list" :style="computedHeightStyle" :scroll-y="true" @scrolltolower="scrolltolower" @scroll="scroll">

        <div class="circular" v-for="item in jobList" :key="item" @click="detail(item)">
          <div class="top-----half">
            <div class="one---row">
              <div class="one-row-one">
                {{item.city}}&nbsp;&nbsp;招&nbsp;-&nbsp;{{item.typeOfWork}}
              </div>
              <div class="one-row-two">
                <div class="typeOfWork">
                  &nbsp;{{item.typeOfWork}}&nbsp;
                </div>
              </div>
            </div>
            <div class="two---row">
              <div class="two-row-one">
                价格:&nbsp;&nbsp;&nbsp;&nbsp;
                <div class="price">
                  &nbsp;&nbsp;{{item.price}}
                </div>
              </div>
              <div class="two-row-two">
                工程量:
                <div class="worksAmount">
                  &nbsp;&nbsp;{{item.worksAmount}}
                </div>
              </div>
            </div>
          </div>
          <div class="bottom-----half">
            <div class="three---row">
              <div class="three-row-one">
                <img style="width: 40rpx; height: 40rpx;" src="../../../resources/icon/location.png"> {{item.state}}&nbsp;&nbsp;-&nbsp;&nbsp;{{item.city}}
              </div>
              <div class="three-row-two">
                <img style="width: 40rpx; height: 40rpx;" src="../../../resources/icon/dateTime.png"> {{item.releaseTime}}
              </div>
            </div>
            <div class="four---row">
              <div class="four-row-one">
                <div class="image">
                  <img style="width: 60rpx; height: 60rpx;" src="../../../resources/headImage/姜亿万.png">
                </div>
                <div class="publishName">
                  &nbsp;&nbsp;联系人&nbsp;&nbsp;-&nbsp;&nbsp;{{item.publishName}}
                </div>
              </div>
              <div class="four-row-two">
                查看详情 >
              </div>
            </div>
          </div>
        </div>
      </scroll-view>
    </div>
    <!-- 列表概览 ===> END -->

  </div>
</template>

<script>
import mpvuePicker from 'mpvue-picker'
import Fly from 'flyio/dist/npm/wx'
import {
  getJobTaxonTree,
  getRegionTree,
  searchJobs
} from '../../http/api.js'

import { regions } from '../../store/regions'

export default {
  components: {
    mpvuePicker
  },
  data () {
    return {
      scrollViewHeight: 0,

      state: {
        q: {
          page: 0,
          perPage: 6
        },
        loading: true,
        loadEnd: false,
        noData: false
      },
      // ************当前用户信息需要的数据************
      // userInfo: [],
      // ************网络请求需要的数据************
      // wx_follower: {}, // 登录时sever需要的数据,根据userInfo修改得到

      // ************地区筛选数据************
      modeForRegion: 'multiLinkageSelector',
      pickerRegionArray: [],
      pickerRegionDefault: [],
      deepLengthForRegion: 3,

      // ************工种筛选数据**************
      resultTypeOfWork: { // 返回选择的工种类和工种
        // 工种类
        team: '',
        // 工种
        item: ''
      },
      modeForJob: 'multiLinkageSelector',
      pickerJobArray: [],
      pickerJobDefault: [1],
      deepLengthForJob: 2,

      // ************招工数量和浏览人数************
      onLineworkersNum: '1234', // 招工数量
      browsedTimes: '5678', // 浏览人数

      // ************招工列表************
      jobList: [{
        city: '广西河池', // 城市
        typeOfWork: '抹灰工', // 工种
        price: '6.5', // 价格
        worksAmount: '7万平方米', // 工程量
        state: '广西壮族自治区', // 省
        releaseTime: '2018-06-06 10:55', // 时间
        headImage: '', // 头像
        publishName: '姜亿万', // 联系人姓名
        worksClass: '主体装修安装类', // 工作类
        description: '广西河池市找工,6.5云,7万平方米,注意安全,大家好!广西河池市找工,6.5云,7万平方米,注意安全,大家好!广西河池市找工,6.5云,7万平方米,注意安全,大家好!广西河池市找工,6.5云,7万平方米,注意安全,大家好!广西河池市找工,6.5云,7万平方米,注意安全,大家好!广西河池市找工,6.5云,7万平方米,注意安全,大家好!'
      },
      {
        city: '广西河池', // 城市
        typeOfWork: '抹灰工', // 工种
        price: '6.5', // 价格
        worksAmount: '7万平方米', // 工程量
        state: '广西壮族自治区', // 省
        releaseTime: '2018-06-06 10:55', // 时间
        headImage: '', // 头像
        publishName: '姜亿万', // 联系人姓名
        worksClass: '主体装修安装类', // 工作类
        description: '广西河池市找工,6.5云,7万平方米,注意安全,大家好!广西河池市找工,6.5云,7万平方米,注意安全,大家好!广西河池市找工,6.5云,7万平方米,注意安全,大家好!广西河池市找工,6.5云,7万平方米,注意安全,大家好!广西河池市找工,6.5云,7万平方米,注意安全,大家好!广西河池市找工,6.5云,7万平方米,注意安全,大家好!'
      },
      {
        city: '广西河池', // 城市
        typeOfWork: '抹灰工', // 工种
        price: '6.5', // 价格
        worksAmount: '7万平方米', // 工程量
        state: '广西壮族自治区', // 省
        releaseTime: '2018-06-06 10:55', // 时间
        headImage: '', // 头像
        publishName: '姜亿万', // 联系人姓名
        worksClass: '主体装修安装类', // 工作类
        description: '广西河池市找工,6.5云,7万平方米,注意安全,大家好!广西河池市找工,6.5云,7万平方米,注意安全,大家好!广西河池市找工,6.5云,7万平方米,注意安全,大家好!广西河池市找工,6.5云,7万平方米,注意安全,大家好!广西河池市找工,6.5云,7万平方米,注意安全,大家好!广西河池市找工,6.5云,7万平方米,注意安全,大家好!'
      },
      {
        city: '广西河池', // 城市
        typeOfWork: '抹灰工', // 工种
        price: '6.5', // 价格
        worksAmount: '7万平方米', // 工程量
        state: '广西壮族自治区', // 省
        releaseTime: '2018-06-06 10:55', // 时间
        headImage: '', // 头像
        publishName: '姜亿万', // 联系人姓名
        worksClass: '主体装修安装类', // 工作类
        description: '广西河池市找工,6.5云,7万平方米,注意安全,大家好!广西河池市找工,6.5云,7万平方米,注意安全,大家好!广西河池市找工,6.5云,7万平方米,注意安全,大家好!广西河池市找工,6.5云,7万平方米,注意安全,大家好!广西河池市找工,6.5云,7万平方米,注意安全,大家好!广西河池市找工,6.5云,7万平方米,注意安全,大家好!'
      },
      {
        city: '广西河池', // 城市
        typeOfWork: '抹灰工', // 工种
        price: '6.5', // 价格
        worksAmount: '7万平方米', // 工程量
        state: '广西壮族自治区', // 省
        releaseTime: '2018-06-06 10:55', // 时间
        headImage: '', // 头像
        publishName: '姜亿万', // 联系人姓名
        worksClass: '主体装修安装类', // 工作类
        description: '广西河池市找工,6.5云,7万平方米,注意安全,大家好!广西河池市找工,6.5云,7万平方米,注意安全,大家好!广西河池市找工,6.5云,7万平方米,注意安全,大家好!广西河池市找工,6.5云,7万平方米,注意安全,大家好!广西河池市找工,6.5云,7万平方米,注意安全,大家好!广西河池市找工,6.5云,7万平方米,注意安全,大家好!'
      }
      ],
      // ************API数据************
      regionPickerData: [], //地区
      jobTaxonPickerData: [], //招工分类
      jobs: [],
      end: null
    }
  },
  computed: {
    computedHeightStyle () {
      //return `height:${this.scrollViewHeight}px`
      return `height:500px`
    }
  },
  async onLoad () {
    let follower = {} // 登录时sever需要的数据,根据userInfo修改得到
    wx.showTabBar({
      animation: true
    })
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#4b55b6'
    })
    wx.setNavigationBarTitle({
      title: '招工列表'
    })
    wx.getUserInfo({
      // 请求微信server,得到userInfo
      success: function (res) {
        let userInfo = res.userInfo
        console.log('getUserInfo后得到的是 userInfo = ', userInfo)
        // 整理数据,变成kjob server需要的数据
        follower.nickname = userInfo.nickName
        follower.headimgurl = userInfo.avatarUrl
        follower.sex = userInfo.gender
        follower.city = userInfo.city
        follower.country = userInfo.country
        follower.language = userInfo.language
        follower.province = userInfo.province
        follower.nickname = userInfo.nickName
        console.log('let follower =  ', follower)
        // 检查Session
        wx.checkSession({
          success: function () {
            // session_key 未过期，并且在本生命周期一直有效
            wx.getStorage({
              key: 'userInfo',
              success: (res) => {
                console.log('getStorage得到的数据是 = ', res.data)
                console.log(res.data)
                // this.userInfo = res.data
              }
            })
          },
          fail: function () {
            // session_key 已经失效，需要重新执行登录流程
            // 重新登录
            //  获取临时登录凭证（code）
            wx.login({
              // 访问微信 server 成功获取code后 微信返回的数据res
              success: function (res) {
                console.log('login success res = ', res)
                let fly = new Fly()
                // 访问kjob-server给从微信server得到的code和userInfo数据
                fly.post('https://kjob-api.firecart.cn/api/v1/wechat_app/login/', {
                  code: res.code,
                  wx_follower: follower
                })
                  .then(function (response) {
                    console.log('访问kjob 给code和整理后得userInfo后,得到的数据 = ', response)
                    follower.id = response.data.id
                    console.log('添加Id后的follower数据是 = ', follower)
                    wx.setStorage({
                      key: 'userInfo',
                      data: follower,
                      success: () => {
                        console.log('userInfo 存储成功了!!!')
                      },
                      fail: () => {
                        console.log('userInfo 存储失败了*******')
                      }
                    })
                  })
                  .catch(function (error) {
                    console.log('Fly 错误: = ', error)
                  })
              }
            })
          }
        })
      }
    })
    // 获取系统信息
    wx.getSystemInfo({
      success: (res) => {
        console.log(res);
        // 可使用窗口宽度、高度
        console.log('height=' + res.windowHeight);
        console.log('width=' + res.windowWidth);
        // 计算主体部分高度,单位为px
        //that.setData({
        // second部分高度 = 利用窗口可使用高度 - first部分高度（这里的高度单位为px，所有利用比例将300rpx转换为px）
        //  second_height: res.windowHeight - res.windowWidth / 750 * (92+36 + 98)
        //})

        this.scrollViewHeight = res.windowHeight - res.statusBarHeight - res.windowWidth / 750 * (92 + 32 + 98)

      }
    })
    console.log("on loaded...")
    this.loadMoreJob()

    getRegionTree().then(res => {
    //  console.log('地区1', res)
      console.log('地区2', this.pickerRegionArray)
    }).catch(function(error){
      console.log('error', error)
    })
    getJobTaxonTree().then(res => {
      console.log('用工分类', res);
      this.pickerJobArray = res
    }).catch(function(error){
      console.log('error', error)
    })
    this.pickerRegionArray= regions

  },

  methods: {
    async loadMoreJob () {
      this.state.q.page += 1
      let params = { page: this.state.q.page, per_page: this.state.q.perPage }
      let data = await searchJobs(params)

      console.log(data)
      if (data.jobs.length === 0) {
        this.state.loading = false
        this.state.q.page -= 1
        if (this.state.q.page === 0) {
          this.state.noData = true
        } else {
          this.state.loadEnd = true
        }
        return
      } else if (data.length < this.state.q.perPage) {
        this.state.loading = false
        this.state.loadEnd = true
      }
      this.jobs = this.jobs.concat(data.jobs)
      console.log("this.jobs.length=" + this.jobs.length)
    },
    // ***************地区筛选方法***************
    showPickerForRegion () {
      this.$refs.mpvuePickerForRegion.show();
    },
    /* ********地区筛选mpvuePicker点击确定事件处理函数
    // 因为console.log(e)返回的是数组下标,故需要自己判断处理
    ******************** */
    onConfirmForRegion (e) {
      console.log( "yes, calling onConfirmForRegion")
      console.log(e);
    },
    // CityChange (e) {
    //   console.log('选中的城市为：' + e.mp.detail.value)
    // },
    // ***************工种筛选方法***************
    showPickerForJob () {
      this.$refs.mpvuePickerForJob.show();
    },
    /* ********工种筛选mpvuePicker点击确定事件处理函数
    // 因为console.log(e)返回的是数组下标,故需要自己判断处理
    ******************** */
    onConfirmForJob (e) {
      console.log(e)
    },

    onCancelForRegion(e){
      console.log(e)

    },
    onChangeForRegion(e){
      console.log(e)

    },
    // showPicker () {
    //   this.$refs.mpvuePicker.show()
    // },
    /* ********mpvuePicker点击确定事件处理函数
    // 因为console.log(e)返回的是数组下标,故需要自己判断处理
    ******************** */
    onConfirm (e) {
      console.log(e)
      // let tempArray = e
      // this.mulLinkageTwoPicker.forEach((elem) => {
      //   if (tempArray[0] === elem.value) {
      //     this.resultTypeOfWork.team = elem.label
      //     elem.children.forEach((ele) => {
      //       if (tempArray[1] === ele.value) {
      //         this.resultTypeOfWork.item = ele.label
      //       }
      //     })
      //   }
      // })
      // console.log(this.resultTypeOfWork)
    },
    // 点击展开详情,打开详情页面
    detail (item) {
      console.log('工作详情页面 !!!')
      console.log('item = ', item)
      wx.navigateTo({
        url: '../workinfo/main?dataObj=' + JSON.stringify(item)
      }) // 当前点击的item,数据传递给招工详情页面
    },
    scrolltolower () {
      this.loadMoreJob()
      console.log(7)
    },
    scroll (e) {
      console.log(6)
      console.log(e)
    }
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
    float: left;
    width: 50%;
    // position: fixed;
    // left: 0;
    // top: 0;
  }
  .work-select {
    float: right;
    width: 50%;
    // position: fixed;
    // left: 375rpx;
    // top: 0;
  }
}

.statistics {
  height: 36rpx;
  width: 100%;
  background-color: #ebebeb;
  border: 1px solid #c0c0c0;
  display: flex;
  flex-direction: row;
  // position:fixed;
  .works-num {
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 50%;
    font-size: 25rpx;
    text-align: center;
    .works-num-color {
      color: red;
    }
  }
  .people-num {
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 50%;
    font-size: 25rpx;
    text-align: center;
    .people-num-color {
      color: red;
    }
  }
}

.list {
  .job-list {
  }
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
    flex-direction: column;
    .top-----half {
      // background-color: cadetblue;
      height: 50%;
      display: flex;
      flex-direction: column;
      .one---row {
        height: 60%;
        // background-color:snow;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        .one-row-one {
          // width: 70%;
          padding-left: 25rpx;
          font-size: 50rpx;
          font-weight: bold;
        }
        .one-row-two {
          // margin-right: 25rxp;
          padding-right: 25rpx;
          // border-radius: 30rpx;
          // width: 30%;
          // background-color: blueviolet;
          .typeOfWork {
            font-size: 35rpx;
            border-radius: 30rpx;
            background-color: #97cbff;
            border: 1px solid #808080;
          }
        }
      }
      .two---row {
        height: 40%;
        // background-color:chartreuse;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        .two-row-one {
          padding-left: 25rpx;
          display: flex;
          .price {
            color: #fc0a77;
          }
        }
        .two-row-two {
          // width: 60%;
          // background-color:cornsilk;
          padding-right: 25rpx;
          display: flex;
          .worksAmount {
            color: #fc0a77;
          }
        }
      }
    }
    .bottom-----half {
      // background-color: salmon;
      height: 50%;
      display: flex;
      flex-direction: column;
      .three---row {
        height: 40%;
        // background-color:snow;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        font-size: 25rpx;
        color: #808080;
        .three-row-one {
          padding-left: 25rpx;
          // width: 50%;
        }
        .three-row-two {
          padding-right: 25rpx;
          // width: 50%;
          // background-color: blueviolet;
        }
      }
      .four---row {
        height: 60%;
        padding-left: 25rpx;
        padding-right: 25rpx;
        // background-color:chartreuse;
        border-top: solid 1rpx #b8b8b8;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        .four-row-one {
          display: flex;
          align-items: center;
          // width: 70%;
        }
        .four-row-two {
          font-size: 25rpx;
          color: #c0c0c0;
          // width: 30%;
          // background-color:cornsilk;
        }
      }
    }
  }
}
</style>
