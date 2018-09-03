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
  <div class="list">
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
  </div>
  <!-- 列表概览 ===> END -->

</div>
</template>

<script>
import mpvuePicker from 'mpvue-picker'
import Fly from 'flyio/dist/npm/wx'
import {
  getJobTaxonTree,
  getRegionTree
} from '../../http/api.js'

export default {
  components: {
    mpvuePicker
  },
  data() {
    return {
      // ************当前用户信息需要的数据************
      // userInfo: [],
      // ************网络请求需要的数据************
      // wx_follower: {}, // 登录时sever需要的数据,根据userInfo修改得到
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
      mulLinkageTwoPicker: [{
          label: '全部',
          value: 0,
          children: [{
            label: '全部',
            value: 0
          }]
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
      // 招工列表数据
      // ************API数据************
      regionPickerData: [], //地区
      jobTaxonPickerData: [], //招工分类
      end: null
    }
  },

  async onLoad() {
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

    console.log("on loaded...")
    getRegionTree().then(res => {
      console.log(res)
    })
    getJobTaxonTree().then(res => {
      console.log(res)
    })

  },

  methods: {
    setData(ev) {
      console.log('开始发送 了!!!')
      console.log(ev)
      wx.setStorage({
        key: 'abc',
        data: 'hello WX !!!'
      })
      console.log('发送完毕了!!!')
    },
    CityChange(e) {
      console.log('选中的城市为：' + e.mp.detail.value)
    },
    // *****工种筛选方法*****
    showPicker() {
      this.$refs.mpvuePicker.show()
    },
    /* ********mpvuePicker点击确定事件处理函数
    // 因为console.log(e)返回的是数组下标,故需要自己判断处理
    ******************** */
    onConfirm(e) {
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
    detail(item) {
      console.log('工作详情页面 !!!')
      console.log('item = ', item)
      wx.navigateTo({
        url: '../workinfo/main?dataObj=' + JSON.stringify(item)
      }) // 当前点击的item,数据传递给招工详情页面
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
        left: 0;
        top: 0;
    }
    .work-select {
        // float: right;
        // position:fixed;
        width: 50%;
        position: fixed;
        left: 375rpx;
        top: 0;
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
