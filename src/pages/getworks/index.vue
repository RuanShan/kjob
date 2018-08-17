<template>
  <div>
    <div class="sizer">
      <div class="position-select">
        <picker class="" mode="region" :value="region" @change="CityChange">
          <button type="default">地区筛选</button>
        </picker>
      </div>
      <div class="work-select">
        <button  @click="showPicker">工种筛选</button>
        <mpvue-picker ref="mpvuePicker" :mode="mode" :deepLength="deepLength" :pickerValueArray="mulLinkageTwoPicker" :pickerValueDefault='pickerValueDefault' @onConfirm="onConfirm"></mpvue-picker>
      </div>
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

  async onLoad () {
    wx.showTabBar({ animation: true })
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#4b55b6'
    })
    wx.setNavigationBarTitle({
      title: '招工列表'
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
      console.log(e)
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
    }
  }
}
</script>

<style lang='scss'>
.sizer {
  display: flex;
  flex-direction: row;
    .position-select {
      width: 50%;
    }
    .work-select {
      width: 50%;
    }
}


</style>
