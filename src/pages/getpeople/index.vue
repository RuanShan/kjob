<template>
  <div>
    <!-- 筛选 ===> START -->
    <div class="sizer">
      <div class="position-select">
        <button @click="showPickerForRegion">{{selectedRegionName}}</button>
        <mpvue-picker ref="mpvuePickerForRegion" :mode="modeForRegion" :deepLength="deepLengthForRegion" :pickerValueDefault="pickerRegionDefault" @onConfirm="onConfirmForRegion" @onCancel="onCancelForRegion" :pickerValueArray="pickerRegionArray"></mpvue-picker>
      </div>
      <div class="work-select">
        <button @click="showPickerForJob">{{selectedTaxonName}}</button>
        <mpvue-picker ref="mpvuePickerForJob" :mode="modeForJob" :deepLength="deepLengthForJob" :pickerValueDefault="pickerJobDefault" @onConfirm="onConfirmForJob" @onCancel="onCancelForJob" :pickerValueArray="pickerJobArray"></mpvue-picker>
      </div>
    </div>
    <!-- 筛选 ===> END -->

    <!-- 列表概览 ===> START -->
    <div class="list">
      <scroll-view class="job-list" :style="computedHeightStyle" scroll-y @scrolltolower="scrolltolower" @scrolltoupper="scrolltoupper" >

        <div class="circular" v-for="(item, i) in peopleList" :key="item.id" @click="detail(item)">
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
                  民族:&nbsp;&nbsp;{{item.nation}}&nbsp;&nbsp;&nbsp;&nbsp;年龄:&nbsp;&nbsp;{{item.age}}&nbsp;&nbsp;岁
                  <div>
                    队伍:&nbsp;&nbsp;{{item.members}}人
                  </div>
                </div>
              </div>
            </div>
            <div class="left-bottom">
              <div class="job-item" v-show="item.job_taxon1_name">
                {{item.job_taxon1_name}}
              </div>
              <div class="job-item" v-show="item.job_taxon2_name">
                {{item.job_taxon2_name}}
              </div>
              <div class="job-item" v-show="item.job_taxon3_name">
                {{item.job_taxon3_name}}
              </div>
            </div>
          </div>
          <div class="div-right">
            <div class="right-top">
              <div v-for="(cityName, j) in item.city_names" :key="cityName">
                {{cityName}}
              </div>
            </div>
            <div class="right-bottom">
              发布时间:
              <div>
                {{item.releaseTime}}
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
  // getRegionTree,
  searchApplicants
} from '../../http/api.js'
import { regions } from '../../store/regions'

export default {
  components: {
    mpvuePicker
  },
  data () {
    return {
      state: {
        q: {
          page: 0,
          perPage: 12,
          comboDistrictId: 0,
          jobTaxonId: 0
        },
        loading: false,
        loadEnd: false,
        noData: false,
      },
      selectedRegionName: '地区筛选',
      selectedTaxonName: '工种筛选',
      // ************地区筛选数据************
      modeForRegion: 'multiLinkageSelector',
      pickerRegionArray: [],
      pickerRegionDefault: [0, 0],
      deepLengthForRegion: 2,

      // ************工种筛选数据**************
      resultTypeOfWork: { // 返回选择的工种类和工种
        team: '', // 工种类
        item: '' // 工种
      },
      modeForJob: 'multiLinkageSelector',
      pickerJobArray: [],
      pickerJobDefault: [0, 0],
      deepLengthForJob: 2,

      // ************招工数量和浏览人数************
      onLineworkersNum: '1234', // 招工数量
      browsedTimes: '5678', // 浏览人数

      // ************找活列表************
      peopleList: [
        // {
        //   'id': 2,
        //   'realname': '李大阳港', // 姓名
        //   'headimgurl': 'http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKQ6uAkRKEXBicIqEdKe4tkicM3Nr47VJq1HO5n2TkgGDg0AXXnfWtd3XQFQd3HyAOeYl15chtK6dRA/132',
        //   'age': '29', // 年龄
        //   'nation': '汉族', // 民族
        //   'members': 1, // 队伍 ****
        //   'description': 'this is desription', // 描述
        //   'state': 'pending', //
        //   'releaseTime': '2018-08-22', // 发布时间 ***** "created_at": "2018-09-11T14:59:18.000+08:00", 0~10
        //   'customer_realname': '',
        //   'district1': '北京市-北京市', // 地址 "district1_fullname": "北京市-北京市-东城区", 0~8
        //   'job_taxon1_name': '主体土建类', // 工种类 ****
        //   'job_taxon1_name': '木工', // 工种 ****
        //   'job_taxon2_name': '强弱电安装工', // 工种 ****
        //   'job_taxon3_name': '防水保温工' // 工种 ****
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
    // getRegionTree().then(res => {
    //   console.log('地区', res)
    //   this.pickerRegionArray = res;
    // }).catch(function (error) {
    //   console.log('error', error)
    // })
    this.pickerRegionArray = regions

    /* *************get kjob server 得到工种数据*************** */
    getJobTaxonTree().then(res => {
      console.log('用工分类', res);
      let all = { value: 0, label: '全部', children: [{ value: 0, label: '全部' }] }
      res.unshift(all)
      this.pickerJobArray = res
    }).catch(function (error) {
      console.log('error', error)
    })

    // 获取系统信息
    wx.getSystemInfo({
      success: (res) => {
        console.log(res);
        this.scrollViewHeight = res.windowHeight - res.windowWidth / 750 * (92)
      }
    })
    this.loadData()
  },

  async onShow () {
    console.log('onShow 了 ..........');
    // 删除storage
    // wx.removeStorage({
    //   key: 'peopleDetailItem',
    //   success: (res) => {
    //     console.log('删除peopleDetailItem,成功了......')
    //   }
    // })
  },

  onPullDownRefresh (e) {
    console.log("onPullDownRefresh", e)
  },
  methods: {
    loadData () {
      this.state.q.page = 0
      this.peopleList = []
      this.loadMoreJob()
    },
    buildParams () {
      let params = { page: this.state.q.page, per_page: this.state.q.perPage, q: {} }
      if (this.state.q.jobTaxonId > 0) {
        // job_taxon_id: 工种，job_taxon1_id, job_taxon2_id, job_taxon3_id
        params.q.job_taxon_id = this.state.q.jobTaxonId
      }
      // '0-0' => 0
      if (parseInt(this.state.q.comboDistrictId) > 0) {
        params.q.combo_district_id = this.state.q.comboDistrictId
      }
      return params
    },
    async loadMoreJob () {
      if (!this.state.loading) {
        this.state.loading = true
        this.state.q.page += 1
        let params = this.buildParams()
        let data = await searchApplicants(params)

        console.log('searchApplicants data = ', data)
        if (data.applicants.length === 0) {
          this.state.loading = false
          this.state.q.page -= 1
          if (this.state.q.page === 0) {
            this.state.noData = true
          } else {
            this.state.loadEnd = true
          }
          return
        } else if (data.length < this.state.q.perPage) {
          this.state.loadEnd = true
        }
        this.state.loading = false

        this.dataFormat(data.applicants)

        this.peopleList = this.uniquelizeObjs( this.peopleList.concat( data.applicants) )

        console.log("this.peopleList.length=" + this.peopleList.length)

      }
    },

    async refreshFirstPageJobs () {
      if (!this.state.loading) {
        console.log("refreshFirstPageJobs" )

        this.state.loading = true
        let params = this.buildParams()
        params.page = 1
        let data = await searchApplicants(params)

        this.state.loading = false
        console.log("refreshFirstPageJobs=", data )

        this.dataFormat(data.applicants)

        this.peopleList = this.uniquelizeObjs( data.applicants.concat(this.peopleList) )

      }
    },

    // 点击展开详情,打开详情页面
    detail (item) {
      console.log(' 找活详情页面 !!!')
      console.log('item = ', item)
      this.$store.commit('setApplicantReset')
      this.$store.commit('setApplicant', { applicant: item })
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
      //
      let provinceId = this.pickerRegionArray[e.value[0]].value
      let cityId = this.pickerRegionArray[e.value[0]].children[e.value[1]].value
      this.state.q.comboDistrictId = `${provinceId}-${cityId}`
      if (parseInt(this.state.q.comboDistrictId) == 0) {
        //全部
        this.selectedRegionName = '地区筛选'
      } else {
        this.selectedRegionName = e.label.split('-')[1]
      }

      this.loadData()
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
      console.log(e)
      this.state.q.jobTaxonId = this.pickerJobArray[e.value[0]].children[e.value[1]].value
      if (this.state.q.jobTaxonId == 0) {
        //全部
        this.selectedTaxonName = '工种筛选'
      } else {
        this.selectedTaxonName = e.label.split('-')[1]
      }

      this.loadData()
    },
    onCancelForJob (e) {
      console.log(e);
    },

    // *******************数据格式化*******************
    dataFormat (data) {
      data.forEach((element) => {
        let city_names = []
        element.job_taxon_names = []
        for (let i = 0; i < 3; i++) {
          let key = 'district' + (i + 1) + '_fullname'
          if (element[key]) {
            element['district' + (i + 1) + '_name'] = element[key].split('-')[1]
            city_names.push( element['district' + (i + 1) + '_name'] )
          }
        }
        element.city_names = Array.from(new Set(city_names))
        for (let i = 0; i < 3; i++) {
          let key = 'job_taxon' + (i + 1) + '_fullname'
          if (element[key]) {
            element['job_taxon' + (i + 1) + '_name'] = element[key].split('-')[1]
            element.job_taxon_names.push( element['job_taxon' + (i + 1) + '_name'] )
          }
        }
        // 格式化发布时间
        element.releaseTime = element.created_at.substring(0, 10)
      });
    },

    // **********j获取字符串中某字符第二次出现的下标****//str字符串 //cha字符 //num第几次*******
    find (str, cha, num) {
      var x = str.indexOf(cha);
      for (var i = 0; i < num; i++) {
        x = str.indexOf(cha, x + 1);
      }
      return x;
    },

    scrolltolower () {
      console.log("scrolltolower")
      this.loadMoreJob()
    },
    scrolltoupper(e){
      console.log("scrolltoupper")
      this.refreshFirstPageJobs(  )
    },

    uniquelizeObjs (objs) {
      console.log("uniquelizeObjs")
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
  },
  computed: {
    computedHeightStyle () {
      return `height:${this.scrollViewHeight}px`
      //return `height:500px`
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
  height: 106rpx;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  .position-select {
    float: left;
    width: 50%;
    // float: left;
    // width: 50%;
    // position: fixed;
    // left: 0rpx;
    // top: 0rpx;
  }
  .work-select {
    float: right;
    width: 50%;
    // float: right;
    // position:fixed;
    // width: 50%;
    // position: fixed;
    // left: 375rpx;
    // top: 0rpx;
  }
}

.list {
  // margin-top: 40rpx;
  .circular {
    margin: 25rpx auto;
    background: #ffffff;
    width: 700rpx;
    height: 276rpx;
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
              font-size: 40rpx;
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
                font-size: 17rpx;
                font-weight: bold;
                border-radius: 30rpx;
                border: solid 5rpx #fe0a9c;
                color: #f80404;
              }
            }
          }
          .left-top-two-bottom {
            color: #afafaf;
            width: 412rpx;
            height: 50%;
            // display: flex;
            // justify-content: center;
            // align-items: center;
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
          width: 211rpx;
          padding: 0rpx 18rpx;
          height: 40rpx;
          line-height:40rpx;
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
        height: 50%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        font-size: 29rpx;
        // background-color: darkorange;
      }
      .right-bottom {
        font-size: 30rpx;
        color: #b4b4b4;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 50%;
      }
    }
  }
}
</style>
