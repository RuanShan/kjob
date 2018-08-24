<template>
  <div>
    <div class="base-info">基本信息(必填)</div>
    <div class="info-must">

      <!-- 列表单元  START -->
      <div class="my-info-list">
        <div class="one-and-two-col">
          <div class="icon">
            <img style="width: 50rpx; height: 50rpx;" src="../../../resources/icon/info-fill.png">
          </div>
          <div class="text">
            头像
          </div>
        </div>
        <div class="three-col">
          <img style="width: 50rpx; height: 50rpx;" src="../../../resources/headImage/姜亿万.png">
        </div>
      </div>
      <!-- 列表单元  END -->

      <!-- 列表单元  START -->
      <div class="my-info-list">
        <div class="one-and-two-col">
          <div class="icon">
            <img style="width: 50rpx; height: 50rpx;" src="../../../resources/icon/info-fill.png">
          </div>
          <div class="text">
            姓名
          </div>
        </div>
        <div class="three-col">
          {{realName}}
        </div>
      </div>
      <!-- 列表单元  END -->

      <!-- 列表单元  START -->
      <div class="my-info-list">
        <div class="one-and-two-col">
          <div class="icon">
            <img style="width: 50rpx; height: 50rpx;" src="../../../resources/icon/info-fill.png">
          </div>
          <div class="text">
            手机号码
          </div>
        </div>
        <div class="three-col">
          {{phone}}
        </div>
      </div>
      <!-- 列表单元  END -->

      <!-- 列表单元  START -->
      <div class="my-info-list">
        <div class="one-and-two-col">
          <div class="icon">
            <img style="width: 50rpx; height: 50rpx;" src="../../../resources/icon/info-fill.png">
          </div>
          <div class="text">
            性别
          </div>
        </div>
        <div class="three-col" @click="age">
          <div class="input-choose">{{sex}}</div>
          <div class="chose-icon">
          </div>
        </div>
      </div>
      <!-- 列表单元  END -->

      <!-- 列表单元  START -->
      <div class="my-info-list">
        <div class="one-and-two-col">
          <div class="icon">
            <img style="width: 50rpx; height: 50rpx;" src="../../../resources/icon/info-fill.png">
          </div>
          <div class="text">
            年龄
          </div>
        </div>
        <div class="three-col" @click="age">
          <div class="input-choose">{{age}}</div>
          <div class="chose-icon">
            岁
          </div>
        </div>
      </div>
      <!-- 列表单元  END -->

      <!-- 列表单元  START -->
      <div class="my-info-list">
        <div class="one-and-two-col">
          <div class="icon">
            <img style="width: 50rpx; height: 50rpx;" src="../../../resources/icon/info-fill.png">
          </div>
          <div class="text">
            民族
          </div>
        </div>
        <picker @change="chooseNation" :value="nationsIndex" :range="nations">
          <div class="three-col">
            <div class="input-choose">{{nation}}</div>
            <div class="chose-icon">
              <img style="width: 50rpx; height: 50rpx;" src="../../../resources/icon/arrows.png">
            </div>
          </div>
        </picker>
      </div>
      <!-- 列表单元  END -->

      <!-- 列表单元  START -->
      <div class="my-info-list">
        <div class="one-and-two-col">
          <div class="icon">
            <img style="width: 50rpx; height: 50rpx;" src="../../../resources/icon/info-fill.png">
          </div>
          <div class="text">
            个人或班组
          </div>
        </div>
        <picker @change="choosemembers" :value="memberIndex" :range="memberX">
          <div class="three-col">
            <div class="input-choose">{{members}}</div>
            <div class="chose-icon">
              <img style="width: 50rpx; height: 50rpx;" src="../../../resources/icon/arrows.png">
            </div>
          </div>
        </picker>
      </div>
      <!-- 列表单元  END -->

      <!-- 列表单元  START -->
      <div class="my-info-list">
        <div class="one-and-two-col">
          <div class="icon">
            <img style="width: 50rpx; height: 50rpx;" src="../../../resources/icon/info-fill.png">
          </div>
          <div class="text">
            找活区域
          </div>
        </div>
        <picker mode="region" :value="cityIndex" @change="cityChoose">
          <div class="three-col">
            <div class="input-choose">请选择(Max 3个)</div>
            <div class="chose-icon">
              <img style="width: 50rpx; height: 50rpx;" src="../../../resources/icon/adding.png">
            </div>
          </div>
        </picker>
      </div>
      <!-- 列表单元  END -->

      <!-- 列表单元 第一个选择的区域  START -->
      <div class="my-info-list" v-if="district1_display">
        <div class="one-and-two-col">
          <div class="icon">
          </div>
          <div class="text">
          </div>
        </div>
        <div class="three-col">
          <div class="input-choose">{{district1_id}}</div>
          <div class="chose-icon">
            <img style="width: 50rpx; height: 50rpx;" src="../../../resources/icon/minus.png">
          </div>
        </div>
      </div>
      <!-- 列表单元  第一个选择的区域   END -->

      <!-- 列表单元 第二个选择的区域  START -->
      <div class="my-info-list" v-if="district2_display">
        <div class="one-and-two-col">
          <div class="icon">
          </div>
          <div class="text">
          </div>
        </div>
        <div class="three-col">
          <div class="input-choose">{{district2_id}}</div>
          <div class="chose-icon">
            <img style="width: 50rpx; height: 50rpx;" src="../../../resources/icon/minus.png">
          </div>
        </div>
      </div>
      <!-- 列表单元  第二个选择的区域   END -->

      <!-- 列表单元 第三个选择的区域  START -->
      <div class="my-info-list" v-if="district3_display">
        <div class="one-and-two-col">
          <div class="icon">
          </div>
          <div class="text">
          </div>
        </div>
        <div class="three-col" @click="deleteCity">
          <div class="input-choose">{{district3_id}}</div>
          <div class="chose-icon">
            <img style="width: 50rpx; height: 50rpx;" src="../../../resources/icon/minus.png">
          </div>
        </div>
      </div>
      <!-- 列表单元  第三个选择的区域   END -->

    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      headImage: '', // 头像
      realName: '李大阳', // 姓名,来自用户信息
      phone: '13456789123', // 电话号码,来自用户信息
      age: '28', // 年龄,来自用户信息
      sex: '男', // 性别 , ,来自用户信息
      nation: '请选择', // 名族,输入
      members: '请选择', // 个人或班组,输入
      district: '', // 找活区域,输入
      tpyeofWork: [], // 工作 ,输入
      discription: '', // 找活描述,输入
      // citys: ['请选择'], // 找活区域,输入
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
      // ************多少个人数据 picker 需要的数据************
      memberX: ['个人', '1~5个人', '6~10个人', '11~20个人', '21~30个人', '31~40个人', '41人以上'],
      memberArray: [
        {
          id: 0,
          name: '个人'
        },
        {
          id: 1,
          name: '1~5个人'
        },
        {
          id: 2,
          name: '6~10个人'
        },
        {
          id: 3,
          name: '11~20个人'
        },
        {
          id: 4,
          name: '21~30个人'
        },
        {
          id: 5,
          name: '31~40个人'
        },
        {
          id: 6,
          name: '41人以上'
        }
      ],
      memberIndex: 0, // 民族默认选择-汉族
      // ************地区筛选数据************
      cityIndex: ['辽宁省', '大连市', '中山区'],
      // ************找活区域数据************
      district1_id: '',
      district2_id: '',
      district3_id: '',
      district1_display: false,
      district2_display: false,
      district3_display: false,
      district_number: 0,
      tempDistrict: ''
    }
  },

  async onLoad (option) {
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#4b55b6'
    })
    wx.setNavigationBarTitle({
      title: '我的找活'
    })
    wx.setBackgroundColor({
      backgroundColor: '#F0F0F0' // 窗口的背景色为灰色
    })
  },

  methods: {
    // 民族选择处理函数
    chooseNation (e) {
      console.log('名族选择点击了************')
      // console.log('选择的民族是 : => ', e)
      console.log('e.mp.detail.value : => ', e.mp.detail.value)
      console.log(' 选择的民族是 : => ', this.nationsObjArray[e.mp.detail.value].name)
      this.nation = this.nationsObjArray[e.mp.detail.value].name
    },
    // 个人或班组选择处理函数
    choosemembers (e) {
      console.log('找活区域选择点击了************')
      this.members = this.memberArray[e.mp.detail.value].name
      console.log(' 选择的班组是 : => ', this.memberArray[e.mp.detail.value].name)
    },
    // 找活区域选择处理函数
    cityChoose (e) {
      console.log('选中的城市为：', e.mp.detail.value)
      // 从数组中提取字符串
      for (let index = 0; index < 2; index++) {
        if (index !== 0) {
          this.tempDistrict += '-'
        }
        this.tempDistrict += e.mp.detail.value[index]
      }
      // 计数,判断
      this.district_number++
      if (this.district_number === 1) {
        this.district1_display = true // 打开第一个区域选择的显示
        this.district1_id = this.tempDistrict
        this.tempDistrict = ''
      }
      if (this.district_number === 2) {
        this.district2_display = true // 打开第二个区域选择的显示
        this.district2_id = this.tempDistrict
        this.tempDistrict = ''
      }
      if (this.district_number === 3) {
        this.district3_display = true // 打开第三个区域选择的显示
        this.district3_id = this.tempDistrict
        this.tempDistrict = ''
      }
      if (this.district_number === 4) {
        this.district_number = 3
        wx.showModal({
          content: '最多只能选择3个区域',
          showCancel: false
        })
      }
    },
    // 删除区域选择处理函数
    deleteCity (e) {
      console.log(e)
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
        .icon {
        }
        .text {
          margin-left: 25rpx;
        }
      }
      .three-col {
        display: flex;
      }
    }
  }
}
</style>
