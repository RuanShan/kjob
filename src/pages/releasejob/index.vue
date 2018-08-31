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
          <input class="wx-input" maxlength="10" type="text" placeholder="如:深圳找电工" v-model="title" />
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
          <div class="two-button">
            <radio-group class="radio-group" @change="radioChange">
              <label class="button-point" v-for="(item,index) in radioItems" :key="index">
                <radio :value="item.value" :checked="item.checked" />
                <div class="">{{item.name}}</div>
              </label>
            </radio-group>
          </div>
        </div>
      </div>
      <!-- 列表单元 招工类型 END -->

      <!-- 列表单元 找活区域 START -->
      <div class="my-info-list">
        <div class="one-and-two-col">
          <div class="icon">
            <img style="width: 50rpx; height: 50rpx;" src="../../../resources/icon/info-fill.png">
          </div>
          <div class="text">
            招工地点
          </div>
        </div>
        <picker mode="region" :value="cityIndex" @change="cityChoose">
          <div class="three-col">
            <div class="input-choose">{{district_fullname}}</div>
            <div class="chose-icon">
              <img style="width: 50rpx; height: 50rpx;" src="../../../resources/icon/arrows.png">
            </div>
          </div>
        </picker>
      </div>
      <!-- 列表单元 找活区域 END -->

      <!-- 列表单元 工种选择 START -->
      <div class="my-info-list">
        <div class="one-and-two-col">
          <div class="icon">
            <img style="width: 50rpx; height: 50rpx;" src="../../../resources/icon/info-fill.png">
          </div>
          <div class="text">
            工种类别
          </div>
        </div>
        <div class="three-col">
          <mpvue-picker ref="mpvuePickerReleaseMy" :mode="mode" :deepLength="deepLength" :pickerValueArray="mulLinkageTwoPicker" :pickerValueDefault='pickerValueDefault' @onConfirm="onConfirm"></mpvue-picker>
          <div class="input-choose">{{job_taxon_id}}</div>
          <div class="chose-icon">
            <img @click="showPicker" style="width: 50rpx; height: 50rpx;" src="../../../resources/icon/arrows.png">
          </div>
        </div>
      </div>
      <!-- 列表单元 工种选择 END -->

      <!-- 列表单元 招工人数 START -->
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
          <input class="wx-input" maxlength="10" type="number" placeholder="多少人?只能数字" v-model="numOfPeople" />
        </div>
      </div>
      <!-- 列表单元 招工人数 END -->

      <!-- 列表单元 工资标准 START -->
      <div class="my-info-list">
        <div class="one-and-two-col">
          <div class="icon">
            <img style="width: 50rpx; height: 50rpx;" src="../../../resources/icon/info-fill.png">
          </div>
          <div class="text">
            工资标准
          </div>
        </div>
        <div class="three-col">
          <input class="wx-input" style="width:190rpx;" maxlength="10" type="number" placeholder="多少钱?" v-model="pay" /> &nbsp;&nbsp;元/天
        </div>
      </div>
      <!-- 列表单元 工资标准 END -->

      <!-- 列表单元 招工描述 START -->
      <div class="on-and-down">
        <div class="my-info-list-2">
          <div class="one-and-two-col">
            <div class="icon">
              <img style="width: 50rpx; height: 50rpx;" src="../../../resources/icon/info-fill.png">
            </div>
            <div class="text">
              招工描述
            </div>
          </div>
        </div>
        <div class="text-array-class">
          <textarea class="text-array" @input="textAreaInput" maxlength="150" placeholder="请根据实际情况,真实地填写描述.不可发布违法信息,否则后果自负." style="height: 150rpx; background-color: #d8d8d8; width: 700rpx; margin: 0rpx 25rpx 25rpx 25rpx;" />
        </div>
      </div>
      <!-- 列表单元 招工描述 END -->

      <div class="base-info"></div>

      <!-- 列表单元 发布人 START -->
      <div class="my-info-list">
        <div class="one-and-two-col">
          <div class="icon">
            <img style="width: 50rpx; height: 50rpx;" src="../../../resources/icon/releasePeople.png">
          </div>
          <div class="text">
            发布人
          </div>
        </div>
        <div class="three-col">
          李大眼
        </div>
      </div>
      <!-- 列表单元 发布人 END -->

      <!-- 列表单元 联系电话 START -->
      <div class="my-info-list">
        <div class="one-and-two-col">
          <div class="icon">
            <img style="width: 50rpx; height: 50rpx;" src="../../../resources/icon/phone-2.png">
          </div>
          <div class="text">
            联系电话
          </div>
        </div>
        <div class="three-col">
          13456789876
        </div>
      </div>
      <!-- 列表单元 联系电话 END -->

      <div class="base-info"></div>

      <!-- 列表单元 免责声明 START -->
      <div class="my-info-list">
        <div class="one-and-two-col">
          <div class="icon">
            <img style="width: 50rpx; height: 50rpx;" src="../../../resources/icon/warning-2.png">
          </div>
          <div class="text-disclaimer">
            {{disclaimer}}
          </div>
        </div>
      </div>
      <!-- 列表单元 免责声明 END -->

      <div class="base-info"></div>

      <!-- 列表单元 免费发布招工 START -->
      <div class="skip">
        <button class="freeRelease" type="primary" @click="freeRelease">免费发布招工</button>
      </div>
      <!-- 列表单元 免费发布招工 END -->

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
      title: '', // 输入的招工名称
      // ************地区筛选数据************
      cityIndex: ['辽宁省', '大连市', '中山区'], // 默认选中的省市区
      district_fullname: '请选择', // 用户选择的省市区,和在页面中显示的作用
      // ************工种筛选数据, 还需要有个事件和处理函数showPicker()**************
      resultTypeOfWork: { // 返回选择的工种类和工种
        team: '', // 工种类
        item: '' // 工种
      },
      job_taxon_id: '请选择', // 工种类别'装修类-木工'
      pickerValueDefault: [0, 0],
      deepLength: 2,
      mode: 'multiLinkageSelector',
      mulLinkageTwoPicker: [
        // {
        //   label: '全部',
        //   value: 0,
        //   children: [{
        //     label: '全部',
        //     value: 0
        //   }
        //   ]
        // },
        {
          label: '机械操作类',
          value: 0,
          children: [
            //   {
            //   label: '全部',
            //   value: 0
            // },
            {
              label: '升降电梯司机',
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
            }
          ]
        },
        {
          label: '主体土建类',
          value: 1,
          children: [
            // {
            //   label: '全部',
            //   value: 0
            // },
            {
              label: '钢结构/打板',
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
            }
          ]
        },
        {
          label: '主体装修安装类',
          value: 2,
          children: [
            //   {
            //   label: '全部',
            //   value: 0
            // },
            {
              label: '地坪工',
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
            }
          ]
        },
        {
          label: '工程管理施工类',
          value: 3,
          children: [
            //   {
            //   label: '全部',
            //   value: 0
            // },
            {
              label: '杂工',
              value: 17
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
            }
          ]
        }
      ],
      // ******************点工和包工使用的变量*********************
      radioItems: [
        { name: '点工', value: '0' },
        { name: '包工', value: '1', checked: true }
      ],
      worker_type: '', // 招工类型
      numOfPeople: '', // 输入招工人数
      pay: '', // 输入的工资标准
      description: '', // 招工描述 输入
      disclaimer: '双方联系时自行辨别真伪，求职过程请勿叫那样任何费用。包公头老板招人是最好唱拜师先。验证身份证后再带入项目。现场以免被讹.举报电话:0411-1234678' // 免责声明 服务器给
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
    // **********************招工类型点击事件**************************
    radioChange (e) {
      let resultData = e.mp.detail.value
      // console.log('radio发生change事件，携带value值为：' + e.mp.detail.value)
      // UI需要的处理程序
      let radioItems = this.radioItems
      for (let i = 0; i < radioItems.length; ++i) {
        radioItems[i].checked = radioItems[i].value === e.mp.detail.value
      }
      this.radioItems = radioItems
      // 得到选择的是什么程序
      // 遍历数组 得到返回的数值是哪一个value数组
      this.radioItems.forEach((val, index) => {
        if (val.value === resultData) {
          this.worker_type = this.radioItems[index].name
        }
      })
      console.log('radio 选择的是 : ' + this.worker_type)
    },
    // ************招工地点点击事件处理函数***************
    cityChoose (e) {
      this.district_fullname = ''
      let array = e.mp.detail.value
      let tempChar = '-'
      // e.mp.detail.value是有3个元素的数组分别是省市区
      console.log('选中的城市为：', e.mp.detail.value)
      // 循环分别得到省,市,区(value),第一个不加'-',后两个加,得到的结果是'辽宁省-大连市-高新园区'
      array.forEach((value, index) => {
        if (index === 0) {
          this.district_fullname = `${this.district_fullname}${value}`
        } else {
          this.district_fullname = `${this.district_fullname}${tempChar}${value}`
        }
      })
    },
    /* ********mpvuePickerReleaseMy点击确定事件处理函数
    // 因为console.log(e)返回的是数组下标,故需要自己判断处理,结果如这样 [1,2]
    ******************** */
    onConfirm (e) {
      console.log(e)
      let num = 0
      this.job_taxon_id = '' // 每次进来初始化
      e.forEach((value, index) => {
        if (index === 0) {
          num = value // 把数组0的值先给num,保存起来,
          this.job_taxon_id = `${this.mulLinkageTwoPicker[value].label}${'-'}`
        } else {
          // 拼接字符串
          this.job_taxon_id = `${this.job_taxon_id}${this.mulLinkageTwoPicker[num].children[value].label}`
        }
      })
    },
    // ************找活描述中,textArray 输入处理函数***************
    textAreaInput (e) {
      console.log(e.target.value)
      this.description = e.target.value
    },
    // 免费发布找活按钮点击处理函数-----跳转到找活页面
    freeRelease () {
      console.log('免费发布找活')
      wx.reLaunch({ url: '../getworks/main' }) // 跳转到发布找活页面
    }
  }
}
</script>

<style lang='scss'>
page {
  height: 100%;
  background-color: #f0f0f0;
  .base-info {
    height: 25rpx;
    background-color: #f0f0f0;
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
        .text-disclaimer {
          color: #ff0000;
          font-size: 30rpx;
          margin-bottom: 25rpx;
        }
      }
      .three-col {
        display: flex;
        .input-choose {
          font-size: 30rpx;
        }
        .wx-input {
          border: solid 1rpx #d8d8d8;
          width: 300rpx;
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
  .two-button {
    display: flex;
    // border: solid 1rpx #b1b1b1;
    border-radius: 20rpx;
    .radio-group {
      display: flex;
      .button-point {
        display: flex;
        border: solid 1rpx #b1b1b1;
        border-radius: 20rpx;
        // margin: 0 25rpx;
        .radio-input {
          display: flex;
        }
      }
    }
  }
  .release-people-info {
    height: 300rpx;
  }
}
</style>
