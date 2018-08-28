<template>
  <div>
    <div class="info-must">
      <!-- 列表单元 招工名称 START -->
      <div class="my-info-list">
        <div class="one-and-two-col">
          <div class="icon">
            <img style="width: 50rpx; height: 50rpx;" src="../../../resources/icon/info-fill.png">
          </div>
          <div class="text">
            招工名称
          </div>
        </div>
        <div class="three-col">
          <input class="wx-input" maxlength="10" placeholder="如:深圳找电工" />
        </div>
      </div>
      <!-- 列表单元 招工名称 END -->

      <!-- 列表单元 招工类型 START -->
      <div class="my-info-list">
        <div class="one-and-two-col">
          <div class="icon">
            <img style="width: 50rpx; height: 50rpx;" src="../../../resources/icon/info-fill.png">
          </div>
          <div class="text">
            招工类型
          </div>
        </div>
        <div class="three-col">
          <button size="mini">点工
            <img style="width: 50rpx; height: 50rpx;" src="../../../resources/icon/ok.png">
          </button>
        </div>
      </div>
      <!-- 列表单元 招工类型 END -->

    </div>
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
      // ************五十六个民族 picker 需要的数据************
      nations: ['汉族', '蒙古族', '回族', '藏族', '维吾尔族', '苗族', '彝族', '壮族', '布依族', '朝鲜族', '满族', '侗族', '瑶族', '白族', '土家族',
        '哈尼族', '哈萨克族', '傣族', '黎族', '傈僳族', '佤族', '畲族', '高山族', '拉祜族', '水族', '东乡族', '纳西族', '景颇族', '柯尔克孜族',
        '土族', '达斡尔族', '仫佬族', '羌族', '布朗族', '撒拉族', '毛南族', '仡佬族', '锡伯族', '阿昌族', '普米族', '塔吉克族', '怒族', '乌孜别克族',
        '俄罗斯族', '鄂温克族', '德昂族', '保安族', '裕固族', '京族', '塔塔尔族', '独龙族', '鄂伦春族', '赫哲族', '门巴族', '珞巴族', '基诺族'],
      nationsObjArray: [
        {
          'id': 0,
          'name': '汉族'
        },
        {
          'id': 1,
          'name': '蒙古族'
        },
        {
          'id': 2,
          'name': '回族'
        },
        {
          'id': 3,
          'name': '藏族'
        },
        {
          'id': 4,
          'name': '维吾尔族'
        },
        {
          'id': 5,
          'name': '苗族'
        },
        {
          'id': 6,
          'name': '彝族'
        },
        {
          'id': 7,
          'name': '壮族'
        },
        {
          'id': 8,
          'name': '布依族'
        },
        {
          'id': 9,
          'name': '朝鲜族'
        },
        {
          'id': 10,
          'name': '满族'
        },
        {
          'id': 11,
          'name': '侗族'
        },
        {
          'id': 12,
          'name': '瑶族'
        },
        {
          'id': 13,
          'name': '白族'
        },
        {
          'id': 14,
          'name': '土家族'
        },
        {
          'id': 15,
          'name': '哈尼族'
        },
        {
          'id': 16,
          'name': '哈萨克族'
        },
        {
          'id': 17,
          'name': '傣族'
        },
        {
          'id': 18,
          'name': '黎族'
        },
        {
          'id': 19,
          'name': '傈僳族'
        },
        {
          'id': 20,
          'name': '佤族'
        },
        {
          'id': 21,
          'name': '畲族'
        },
        {
          'id': 22,
          'name': '高山族'
        },
        {
          'id': 23,
          'name': '拉祜族'
        },
        {
          'id': 24,
          'name': '水族'
        },
        {
          'id': 25,
          'name': '东乡族'
        },
        {
          'id': 26,
          'name': '纳西族'
        },
        {
          'id': 27,
          'name': '景颇族'
        },
        {
          'id': 28,
          'name': '柯尔克孜族'
        },
        {
          'id': 29,
          'name': '土族'
        },
        {
          'id': 30,
          'name': '达斡尔族'
        },
        {
          'id': 31,
          'name': '仫佬族'
        },
        {
          'id': 32,
          'name': '羌族'
        },
        {
          'id': 33,
          'name': '布朗族'
        },
        {
          'id': 34,
          'name': '撒拉族'
        },
        {
          'id': 35,
          'name': '毛南族'
        },
        {
          'id': 36,
          'name': '仡佬族'
        },
        {
          'id': 37,
          'name': '锡伯族'
        },
        {
          'id': 38,
          'name': '阿昌族'
        },
        {
          'id': 39,
          'name': '普米族'
        },
        {
          'id': 40,
          'name': '塔吉克族'
        },
        {
          'id': 41,
          'name': '怒族'
        },
        {
          'id': 42,
          'name': '乌孜别克族'
        },
        {
          'id': 43,
          'name': '俄罗斯族'
        },
        {
          'id': 44,
          'name': '鄂温克族'
        },
        {
          'id': 45,
          'name': '德昂族'
        },
        {
          'id': 46,
          'name': '保安族'
        },
        {
          'id': 47,
          'name': '裕固族'
        },
        {
          'id': 48,
          'name': '京族'
        },
        {
          'id': 49,
          'name': '塔塔尔族'
        },
        {
          'id': 50,
          'name': '独龙族'
        },
        {
          'id': 51,
          'name': '鄂伦春族'
        },
        {
          'id': 52,
          'name': '赫哲族'
        },
        {
          'id': 53,
          'name': '门巴族'
        },
        {
          'id': 54,
          'name': '珞巴族'
        },
        {
          'id': 55,
          'name': '基诺族'
        }
      ],
      nationsIndex: 0, // 民族默认选择-汉族
      // ************地区筛选数据************
      cityIndex: ['辽宁省', '大连市', '中山区'],
      // ************工种筛选数据, 还需要有个事件和处理函数showPicker()**************
      resultTypeOfWork: { // 返回选择的工种类和工种
        team: '', // 工种类
        item: '' // 工种
      },
      pickerValueDefault: [1, 1],
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
      ]
    }
  },

  async onLoad (option) {
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#4b55b6'
    })
    wx.setNavigationBarTitle({
      title: '发布招工'
    })
    wx.setBackgroundColor({
      backgroundColor: '#F0F0F0' // 窗口的背景色为灰色
    })
  },

  methods: {
    // *****工种筛选方法,必须要有*****
    showPicker () {
      this.$refs.mpvuePickerReleaseMy.show()
      // this.mulLinkDisplay = true
    },
    // 免费发布找活按钮点击处理函数-----跳转到找活页面
    freeRelease () {
      console.log('免费发布找活')
      wx.reLaunch({ url: '../getpeople/main' }) // 跳转到发布找活页面
    }
  }
}
</script>

<style lang='scss'>
page {
  height: 100%;
  background-color: #f0f0f0;
  .base-info {
    font-size: 25rpx;
    margin: 10rpx 25rpx;
  }
  .info-must {
    display: flex;
    flex-direction: column;
    background-color: #ffffff;
    .my-info-list {
      display: flex;
      padding: 25rpx 25rpx 10rpx 25rpx;
      justify-content: space-between;
      border-bottom: solid 1rpx #808080;
      .one-and-two-col {
        display: flex;
        .text {
          margin-left: 25rpx;
        }
      }
      .three-col {
        display: flex;
        .wx-input {
          border: solid 1rpx #d8d8d8;
          width:300rpx;
        }
      }
    }
    .on-and-down {
      border-bottom: solid 1rpx #808080;
      .my-info-list-2 {
        display: flex;
        padding: 25rpx 25rpx 10rpx 25rpx;
        justify-content: space-between;
        .one-and-two-col {
          display: flex;
          .text {
            margin-left: 25rpx;
          }
        }
      }
    }
  }
  .info-option {
    display: flex;
    flex-direction: column;
    background-color: #ffffff;
    border-bottom: solid 1rpx #808080;
    height: 100rpx;
    color: #808080;
    justify-content: center;
    align-items: center;
    font-size: 30rpx;
  }
  .skip {
    margin: 25rpx 0rpx;
  }
  .freeRelease {
    background-color: #2862f9;
    margin: 0rpx 25rpx;
  }
}
</style>
