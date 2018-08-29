<template>
  <div>
    <!-- 筛选 ===> START -->
    <div class="sizer">
      <div class="position-select">
        <picker class="" mode="region" :value="region" @change="CityChange">
          <button type="default">地区筛选</button>
        </picker>
      </div>
      <div class="work-select">
        <button @click="showPicker">工种筛选</button>
        <mpvue-picker ref="mpvuePicker" :mode="mode" :deepLength="deepLength" :pickerValueArray="mulLinkageTwoPicker" :pickerValueDefault='pickerValueDefault' @onConfirm="onConfirm"></mpvue-picker>
      </div>
    </div>
    <!-- 筛选 ===> END -->

    <!-- 列表概览 ===> START -->
    <div class="list">
      <div class="circular" v-for="item in peopleList" :key="item" @click="detail(item)">
        <div class="div-left">
          <div class="left-top">
            <div class="left-top-one">
              <img style="width: 80rpx; height: 80rpx;" src="../../../resources/headImage/姜亿万.png">
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
            <div class="job-item">
              {{item.job2_name}}
            </div>
            <div class="job-item">
              {{item.job3_name}}
            </div>
          </div>
        </div>
        <div class="div-right">
          <div class="right-top">
            <div>
              {{item.district1_fullname}}
            </div>
            <div>
              {{item.district1_fullname}}
            </div>
            <div>
              {{item.district1_fullname}}
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
export default {
  components: {
    mpvuePicker
  },
  data () {
    return {
      // ************地区筛选数据************
      region: ['广东省', '广州市', '海珠区'],
      // ************工种筛选数据**************
      // 返回选择的工种类和工种
      resultTypeOfWork: {
        // 工种类
        team: '',
        // 工种
        item: ''
      },
      pickerValueDefault: [0, 0],
      deepLength: 2,
      mode: 'multiLinkageSelector',
      mulLinkageTwoPicker: [
        {
          label: '全部',
          value: 0,
          children: [{
            label: '全部',
            value: 0
          }
          ]
        },
        {
          label: '主体土建类',
          value: 1,
          children: [{
            label: '全部',
            value: 0
          },
          {
            label: '木工',
            value: 1
          },
          {
            label: '铝膜工',
            value: 2
          },
          {
            label: '钢筋工',
            value: 3
          },
          {
            label: '架子工',
            value: 4
          },
          {
            label: '混凝土工',
            value: 5
          },
          {
            label: '水电工',
            value: 6
          },
          {
            label: '焊工/铆工',
            value: 7
          },
          {
            label: '防水保温工',
            value: 8
          },
          {
            label: '油漆工',
            value: 9
          },
          {
            label: '水暖管道工',
            value: 10
          },
          {
            label: '打桩/破桩工',
            value: 11
          },
          {
            label: '杂工',
            value: 12
          },
          {
            label: '爬架工',
            value: 13
          },
          {
            label: '钢筋压力焊',
            value: 14
          },
          {
            label: '钢筋车丝',
            value: 15
          },
          {
            label: '钢筋翻样',
            value: 16
          },
          {
            label: '钢结构/打板',
            value: 17
          }
          ]
        },
        {
          label: '主体装修安装类',
          value: 2,
          children: [{
            label: '全部',
            value: 0
          },
          {
            label: '泥瓦工',
            value: 1
          },
          {
            label: '贴砖工',
            value: 2
          },
          {
            label: '幕墙工',
            value: 3
          },
          {
            label: '门窗护栏扶手工',
            value: 4
          },
          {
            label: '内外墙腻子工',
            value: 5
          },
          {
            label: '防水保温工',
            value: 6
          },
          {
            label: '砌砖工',
            value: 7
          },
          {
            label: '抹灰工',
            value: 8
          },
          {
            label: '强弱电安装工',
            value: 9
          },
          {
            label: '消防管道工',
            value: 10
          },
          {
            label: '拉毛挂网红',
            value: 11
          },
          {
            label: '装修木工/吊顶',
            value: 12
          },
          {
            label: '打磨/抛光工',
            value: 13
          },
          {
            label: '地坪工',
            value: 14
          }
          ]
        },
        {
          label: '工程管理施工类',
          value: 3,
          children: [{
            label: '全部',
            value: 0
          },
          {
            label: '项目经理',
            value: 1
          },
          {
            label: '技术总工',
            value: 2
          },
          {
            label: '总工',
            value: 3
          },
          {
            label: '施工员',
            value: 4
          },
          {
            label: '测量放线员',
            value: 5
          },
          {
            label: '安全员',
            value: 6
          },
          {
            label: '资料员',
            value: 7
          },
          {
            label: '材料员',
            value: 8
          },
          {
            label: '造价员',
            value: 9
          },
          {
            label: '质检员',
            value: 10
          },
          {
            label: '预算员',
            value: 11
          },
          {
            label: '实验员',
            value: 12
          },
          {
            label: '监理',
            value: 13
          },
          {
            label: '水电员',
            value: 14
          },
          {
            label: '后勤',
            value: 15
          },
          {
            label: '安保门卫',
            value: 16
          },
          {
            label: '杂工',
            value: 17
          }
          ]
        },
        {
          label: '机械操作类',
          value: 4,
          children: [{
            label: '全部',
            value: 0
          },
          {
            label: '塔吊工',
            value: 1
          },
          {
            label: '信号工',
            value: 2
          },
          {
            label: '挖机工',
            value: 3
          },
          {
            label: '推土机工',
            value: 4
          },
          {
            label: '升降机工',
            value: 5
          },
          {
            label: '装卸机工',
            value: 6
          },
          {
            label: '起重机工',
            value: 7
          },
          {
            label: '铲车/叉车工',
            value: 8
          },
          {
            label: '升降电梯司机',
            value: 9
          }
          ]
        }
      ],

      // ************招工数量和浏览人数************
      onLineworkersNum: '1234', // 招工数量
      browsedTimes: '5678', // 浏览人数

      // ************找活列表************
      peopleList: [
        {
          'id': 2,
          'realname': '李大阳', // 姓名
          'headimgurl': 'http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKQ6uAkRKEXBicIqEdKe4tkicM3Nr47VJq1HO5n2TkgGDg0AXXnfWtd3XQFQd3HyAOeYl15chtK6dRA/132',
          'age': '29', // 年龄
          'nation': '汉族', // 民族
          'members': 1, // 队伍 ****
          'description': 'this is desription', // 描述
          'state': 'pending', //
          'created_at': '2018-08-22', // 发布时间 *****
          'customer_realname': '',
          'district1_fullname': '北京市-东城区', // 地址
          'job_taxon1_name': '主体土建类', // 工种类 ****
          'job1_name': '木工', // 工种 ****
          'job2_name': '强弱电安装工', // 工种 ****
          'job3_name': '防水保温工' // 工种 ****
        },
        {
          'id': 2,
          'realname': '李大阳', // 姓名
          'headimgurl': 'http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKQ6uAkRKEXBicIqEdKe4tkicM3Nr47VJq1HO5n2TkgGDg0AXXnfWtd3XQFQd3HyAOeYl15chtK6dRA/132',
          'age': '29', // 年龄
          'nation': '汉族', // 民族
          'members': 1, // 队伍 ****
          'description': 'this is desription', // 描述
          'state': 'pending', //
          'created_at': '2018-08-22', // 发布时间 *****
          'customer_realname': '',
          'district1_fullname': '北京市-东城区', // 地址
          'job_taxon1_name': '主体土建类', // 工种类 ****
          'job1_name': '木工', // 工种 ****
          'job2_name': '强弱电安装工', // 工种 ****
          'job3_name': '防水保温工' // 工种 ****
        },
        {
          'id': 2,
          'realname': '李大阳', // 姓名
          'headimgurl': 'http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKQ6uAkRKEXBicIqEdKe4tkicM3Nr47VJq1HO5n2TkgGDg0AXXnfWtd3XQFQd3HyAOeYl15chtK6dRA/132',
          'age': '29', // 年龄
          'nation': '汉族', // 民族
          'members': 1, // 队伍 ****
          'description': 'this is desription', // 描述
          'state': 'pending', //
          'created_at': '2018-08-22', // 发布时间 *****
          'customer_realname': '',
          'district1_fullname': '北京市-东城区', // 地址
          'job_taxon1_name': '主体土建类', // 工种类 ****
          'job1_name': '木工', // 工种 ****
          'job2_name': '强弱电安装工', // 工种 ****
          'job3_name': '防水保温工' // 工种 ****
        },
        {
          'id': 2,
          'realname': '李大阳', // 姓名
          'headimgurl': 'http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKQ6uAkRKEXBicIqEdKe4tkicM3Nr47VJq1HO5n2TkgGDg0AXXnfWtd3XQFQd3HyAOeYl15chtK6dRA/132',
          'age': '29', // 年龄
          'nation': '汉族', // 民族
          'members': 1, // 队伍 ****
          'description': 'this is desription', // 描述
          'state': 'pending', //
          'created_at': '2018-08-22', // 发布时间 *****
          'customer_realname': '',
          'district1_fullname': '北京市-东城区', // 地址
          'job_taxon1_name': '主体土建类', // 工种类 ****
          'job1_name': '木工', // 工种 ****
          'job2_name': '强弱电安装工', // 工种 ****
          'job3_name': '防水保温工' // 工种 ****
        },
        {
          'id': 2,
          'realname': '李大阳', // 姓名
          'headimgurl': 'http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKQ6uAkRKEXBicIqEdKe4tkicM3Nr47VJq1HO5n2TkgGDg0AXXnfWtd3XQFQd3HyAOeYl15chtK6dRA/132',
          'age': '29', // 年龄
          'nation': '汉族', // 民族
          'members': 1, // 队伍 ****
          'description': 'this is desription', // 描述
          'state': 'pending', //
          'created_at': '2018-08-22', // 发布时间 *****
          'customer_realname': '',
          'district1_fullname': '北京市-东城区', // 地址
          'job_taxon1_name': '主体土建类', // 工种类 ****
          'job1_name': '木工', // 工种 ****
          'job2_name': '强弱电安装工', // 工种 ****
          'job3_name': '防水保温工' // 工种 ****
        }
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
  },

  methods: {
    setData (ev) {
      console.log('开始发送 了!!!')
      console.log(ev)
      wx.setStorage({
        key: 'abc',
        data: 'hello WX !!!'
      })
      console.log('发送完毕了!!!')
    },
    CityChange (e) {
      console.log('选中的城市为：' + e.mp.detail.value)
    },
    // *****工种筛选方法*****
    showPicker () {
      this.$refs.mpvuePicker.show()
    },
    onConfirm (e) {
      // console.log (e)
      let tempArray = e
      this.mulLinkageTwoPicker.forEach((elem) => {
        if (tempArray[0] === elem.value) {
          this.resultTypeOfWork.team = elem.label
          elem.children.forEach((ele) => {
            if (tempArray[1] === ele.value) {
              this.resultTypeOfWork.item = ele.label
            }
          })
        }
      })
      console.log(this.resultTypeOfWork)
    },
    // 点击展开详情,打开详情页面
    detail (item) {
      console.log(' 找活详情页面 !!!')
      console.log('item = ', item)
      wx.navigateTo({ url: '../peopleinfo/main?dataObj=' + JSON.stringify(item) }) // 当前点击的item,数据传递给招工详情页面
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
                font-weight:bold;
                border-radius: 30rpx;
                border: solid 5rpx #fe0a9c;
                color: #f80404;
              }
            }
          }
          .left-top-two-bottom {
            color:#afafaf;
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
