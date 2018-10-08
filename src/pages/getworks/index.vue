<template>
  <div>
    <!-- 筛选 ===> START -->
    <div class="sizer">
      <div class="position-select">
        <button @click="showPickerForRegion">{{selectedRegionName}}</button>
        <mpvue-picker ref="mpvuePickerForRegion" :mode="modeForRegion" :deepLength="2" :pickerValueDefault="pickerRegionDefault" @onChange="onChangeForRegion" @onConfirm="onConfirmForRegion" @onCancel="onCancelForRegion" :pickerValueArray="pickerRegionArray"></mpvue-picker>
      </div>
      <div class="work-select">
        <button @click="showPickerForJob">{{selectedTaxonName}}</button>
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

      <scroll-view class="job-list" :style="computedHeightStyle" scroll-y  lower-threshold="150" @scrolltolower="scrolltolower" @scrolltoupper="scrolltoupper" >

        <div class="circular" v-for="item in jobs" :key="item.id" @click="detail(item)">
          <div class="top-----half">
            <div class="one---row">
              <div class="one-row-one">
                {{item.city}}&nbsp;招-{{item.job_taxon_name}}
              </div>
              <div class="one-row-two">
                <div class="typeOfWork">
                  &nbsp;{{item.job_taxon_name}}&nbsp;
                </div>
              </div>
            </div>
            <div class="two---row">
              <div class="two-row-one" v-if="item.isPartTime">
                工资标准:&nbsp;&nbsp;&nbsp;&nbsp;
                <div class="pay">
                  &nbsp;&nbsp;{{item.pay}}元/天
                </div>
              </div>
              <div class="two-row-one" v-if="!item.isPartTime">
                单位价格:&nbsp;&nbsp;&nbsp;&nbsp;
                <div class="pay">
                  &nbsp;&nbsp;{{item.pay}}元
                </div>
              </div>
              <div class="two-row-two" v-if="item.isPartTime">
                招工人数:
                <div class="worksAmount">
                  &nbsp;&nbsp;{{item.quantity}}
                </div>
              </div>
              <div class="two-row-two" v-if="!item.isPartTime">
                工程数量:
                <div class="worksAmount">
                  &nbsp;&nbsp;{{item.quantity}}平方米
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
                  <img style="width: 50rpx; height: 50rpx;" src="../../../resources/icon/dateTime.png">
                  <!-- <img style="width: 60rpx; height: 60rpx;" :src="userInfoForAPI.headimgurl"> -->
                </div>
                <div class="name">
                  &nbsp;&nbsp;联系人&nbsp;&nbsp;-&nbsp;&nbsp;{{item.customer_realname}}
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
import {
  getJobTaxonTree,
  //getRegionTree,
  searchJobs,
  wechatAppLogin,
  getWxFollower,
  getTodayCount,
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
          perPage: 20,
          total: 0,
          comboDistrictId: 0,
          jobTaxonId: 0
        },
        loading: false,
        loadEnd: false,
        noData: false,
      },
      selectedRegionName: '地区筛选',
      selectedTaxonName: '工种筛选',
      // ************当前用户信息需要的数据************
      userInfoForAPI: null,
      // ************网络请求需要的数据************
      // wx_follower: {}, // 登录时sever需要的数据,根据userInfo修改得到

      // ************地区筛选数据************
      modeForRegion: 'multiLinkageSelector',
      pickerRegionArray: [],
      pickerRegionDefault: [0, 0],
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
      pickerJobDefault: [0, 0],
      deepLengthForJob: 2,

      // ************招工数量和浏览人数************
      onLineworkersNum: '', // 招工数量
      browsedTimes: '', // 浏览人数

      // ************API数据************
      regionPickerData: [], //地区
      jobTaxonPickerData: [], //招工分类
      jobsTempData: null, // 数据格式化临时数据
      jobs: [], // ************招工列表************
      end: null
    }
  },
  computed: {
    computedHeightStyle () {
      return `height:${this.scrollViewHeight}px`
      //return `height:500px`
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
      success: (res) => {
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
          success: () => {
            // session_key 未过期，并且在本生命周期一直有效
            wx.login({
              // 访问微信 server 成功获取code后 微信返回的数据res
              success: (res) => {
                console.log('login success res = ', res)
                // let fly = new Fly()
                // 访问kjob-server给从微信server得到的code和userInfo数据
                // fly.post('https://kjob-api.firecart.cn/api/v1/wechat_app/login/', {
                //   code: res.code,
                //   wx_follower: follower
                // })

                // 微信app用户登录，wx.login成功之后调用，获取或创建系统内用户
                wechatAppLogin({
                  code: res.code,
                  wx_follower: follower
                }).then((data) => {
                  console.log('访问kjob 给code和整理后得userInfo后,得到的数据 = ', data)
                  // 根据从KJob server得到的用户id,请求KJob Server 得到用户数据
                  getWxFollower(data.id).then((res) => {
                    // console.log(res);
                    // 得到当前用户微信数保和KJob用户信息保持到userInfoForAPI中
                    this.userInfoForAPI = res;
                    // 把当前用户微信数保和KJob用户信息保存到全局变量userInfoForAPI中
                    wx.setStorage({
                      key: 'userInfoForAPI',
                      data: this.userInfoForAPI,
                      success: (res) => {
                        console.log('setStorage data 后得 res = ', res);
                        console.log('userInfoForAPI 存储成功了!!!')
                      },
                      fail: () => {
                        console.log('userInfoForAPI 存储失败了*******')
                      }
                    })
                  }).catch((err) => {
                    console.log("API - getWxFollower 错误 = ", err);
                  });
                }).catch(function (error) {
                  console.log('Fly 错误: = ', error)
                })
              }
            })
          },
          fail: () => {
            // session_key 已经失效，需要重新执行登录流程
            // 重新登录
            //  获取临时登录凭证（code）
            wx.login({
              // 访问微信 server 成功获取code后 微信返回的数据res
              success: (res) => {
                console.log('login success res = ', res)
                // let fly = new Fly()
                // 访问kjob-server给从微信server得到的code和userInfo数据
                // fly.post('https://kjob-api.firecart.cn/api/v1/wechat_app/login/', {
                //   code: res.code,
                //   wx_follower: follower
                // })

                // 微信app用户登录，wx.login成功之后调用，获取或创建系统内用户
                wechatAppLogin({
                  code: res.code,
                  wx_follower: follower
                }).then((data) => {
                  console.log('访问kjob 给code和整理后得userInfo后,得到的数据 = ', data)
                  // 根据从KJob server得到的用户id,请求KJob Server 得到用户数据
                  getWxFollower(data.id).then((res) => {
                    // console.log(res);
                    // 得到当前用户微信数保和KJob用户信息保持到userInfoForAPI中
                    this.userInfoForAPI = res;
                    // 把当前用户微信数保和KJob用户信息保存到全局变量userInfoForAPI中
                    wx.setStorage({
                      key: 'userInfoForAPI',
                      data: this.userInfoForAPI,
                      success: (res) => {
                        console.log('setStorage data 后得 res = ', res);
                        console.log('userInfoForAPI 存储成功了!!!')
                      },
                      fail: () => {
                        console.log('userInfoForAPI 存储失败了*******')
                      }
                    })
                  }).catch((err) => {
                    console.log("API - getWxFollower 错误 = ", err);
                  });
                }).catch(function (error) {
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
        console.log('statusBarHeight=' + res.statusBarHeight);
        this.scrollViewHeight = res.windowHeight - res.windowWidth / 750 * (92 + 36)
      }
    })
    console.log("on loaded...")

    // getRegionTree().then(res => {
    //   console.log('地区1', res)
    //   this.pickerRegionArray = regions
    //   console.log('地区2', this.pickerRegionArray)
    // }).catch(function (error) {
    //   console.log('error', error)
    // })
    getJobTaxonTree().then(res => {
      console.log('用工分类', res);
      let all = { value: 0, label: '全部', children: [{ value: 0, label: '全部' }] }
      res.unshift(all)
      this.pickerJobArray = res
    }).catch(function (error) {
      console.log('error', error)
    })
    this.pickerRegionArray = regions

    // ******************今日在线招工人数和浏览次数******************
    getTodayCount().then((res) => {
      console.log('getTodayCount = ', res);
      this.onLineworkersNum = res.job_count
      this.browsedTimes = res.uv_count
    }).catch((err) => {
      console.log('getTodayCount = ', err);
    })

    // ******************获取招工列表******************
    // searchJobs().then((res) => {
    //   console.log('获取招工类表 = ', res);
    //   this.dataFormat(res.jobs)
    //   console.log('dataFormat 后 = ', res.jobs);
    //   this.jobs = res.jobs
    // }).catch((err) => {
    //   console.log('err = ', err);
    // })

    this.loadJobs()
  },
  onShow () {
    console.log('onShow 生命周期来了........');
  },
  onReady () {
    console.log('onReady 生命周期来了........');
  },
  onPullDownRefresh (e) {
    console.log("onPullDownRefresh", e)
  },
  methods: {
    loadJobs () {
      this.state.q.page = 0
      this.jobs = []
      this.loadMoreJob()
    },
    buildParams () {
      let params = { page: this.state.q.page, per_page: this.state.q.perPage, q: {} }
      if (this.state.q.jobTaxonId > 0) {
        params.q.job_taxon_id_eq = this.state.q.jobTaxonId
      }
      if (parseInt(this.state.q.comboDistrictId) > 0) {
        params.q.combo_district_id_start = this.state.q.comboDistrictId
      }
      return params
    },
    async loadMoreJob () {
      if( !this.state.loading  )  {
        wx.showLoading("数据加载中...")
        this.state.q.page += 1
        let params = this.buildParams()
        let data = await searchJobs(params)
        wx.hideLoading()

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
        console.log("loadMoreJob=",  data)
        this.dataFormat(data.jobs)
        this.jobs = this.uniquelizeObjs( data.jobs.concat( this.jobs ))

      }
    },

    async refreshFirstPageJobs( ) {
      if( !this.state.loading  )  {

        let params = this.buildParams()
        params.page = 1
        let data = await searchJobs(params)

        this.dataFormat(data.jobs)
        console.log("refreshFirstPageJobs=", data )

        this.jobs = this.uniquelizeObjs( data.jobs.concat( this.jobs ))

      }
    },

    // ***************地区筛选方法***************
    showPickerForRegion () {
      this.$refs.mpvuePickerForRegion.show();
    },
    /* ********地区筛选mpvuePicker点击确定事件处理函数
    // 因为console.log(e)返回的是数组下标,故需要自己判断处理
    ******************** */
    onConfirmForRegion (e) {
      console.log("yes, calling onConfirmForRegion")
      console.log(e);
      let provinceId = this.pickerRegionArray[e.value[0]].value
      let cityId = this.pickerRegionArray[e.value[0]].children[e.value[1]].value
      this.state.q.comboDistrictId = `${provinceId}-${cityId}`

      if (parseInt(this.state.q.comboDistrictId) == 0) {
        //全部
        this.selectedRegionName = '地区筛选'
      } else {
        this.selectedRegionName = e.label.split('-')[1]
      }

      this.loadJobs()
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
      this.state.q.jobTaxonId = this.pickerJobArray[e.value[0]].children[e.value[1]].value
      if (this.state.q.jobTaxonId == 0) {
        //全部
        this.selectedTaxonName = '工种筛选'
      } else {
        this.selectedTaxonName = e.label.split('-')[1]
      }

      this.loadJobs()

    },

    onCancelForRegion (e) {
      console.log(e)

    },
    onChangeForRegion (e) {
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
      // wx.setStorage({
      //   key: 'worksItem', 
      //   data: item,
      //   success: () => {
      //     console.log('worksItem 存储成功了!!!')
      //   },
      //   fail: () => {
      //     console.log('worksItem 存储失败了*******')
      //   }
      // })
      this.$store.commit('setworkDetailStore',item) // 保存到VueX中
      // console.log('this.$store.state.workDetailStore = ',this.$store.state.workDetailStore);
      
      wx.navigateTo({
        url: '../workinfo/main'
      }) // 当前点击的item,数据传递给招工详情页面
    },

    scrolltolower () {
      console.log("scrolltolower")
      this.loadMoreJob()
     },
    scrolltoupper(e){
      console.log("scrolltoupper")
      this.refreshFirstPageJobs(  )
    },
    // *******************数据格式化*******************
    dataFormat (data) {
      data.forEach((element) => {
        let regions = element.district_fullname.split('-')
        element.city = regions[1] // city OK
        element.state = regions[0]
        element.isPartTime = element.worker_type == 'parttime'
        element.releaseTime = element.created_at.substring(0, 10) + ' ' + element.created_at.substring(11, 16) // releaseTime OK
      });
    },
    uniquelizeObjs (objs) {
      var keys = {}
      var newObjs = new Array();
      objs.forEach((obj) => {
        if (!keys[obj.id]) {
          newObjs.push(obj)
          keys[obj.id] = true
        }
      })
      return newObjs;
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
  border-bottom: 1px solid #c0c0c0;
  border-top: 1px solid #c0c0c0;
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
          font-size: 40rpx;
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
          .pay {
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
          .name {
            font-size: 35rpx;
          }
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
