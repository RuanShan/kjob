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
          <img style="width: 50rpx; height: 50rpx;" :src="userInfoForAPI.headimgurl">
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
          {{userInfoForAPI.realname}}
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
          {{userInfoForAPI.mobile}}
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
          <div class="input-choose">{{userInfoForAPI.computed_age}}</div>
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

      <!-- 列表单元 找活区域 使用的是mpvue-picker START -->
      <!-- <div class="my-info-list">
        <div class="one-and-two-col">
          <div class="icon">
            <img style="width: 50rpx; height: 50rpx;" src="../../../resources/icon/info-fill.png">
          </div>
          <div class="text">
            找活区域
          </div>
        </div>
        <mpvue-picker ref="mpvuePickerForRegion" :mode="modeForRegion" :deepLength="deepLengthForRegion" :pickerValueDefault="pickerRegionDefault" @onConfirm="onConfirmForRegion" @onCancel="onCancelForRegion" :pickerValueArray="pickerRegionArray"></mpvue-picker>
        <div class="three-col" @click="showPickerForRegion">
          <div class="input-choose">请选择(Max 3个)</div>
          <div class="chose-icon">
            <img style="width: 50rpx; height: 50rpx;" src="../../../resources/icon/adding.png">
          </div>
        </div>
      </div> -->
      <!-- 列表单元 找活区域 使用的是mpvue-picker END -->

      <!-- 列表单元 找活区域 START -->
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
      <!-- 列表单元 找活区域 END -->

      <!-- 列表单元 招工地点选择动态显示列表  START -->
      <div class="my-info-list" v-if="regionSelectedDisplay" v-for="(item, index) in resultRegionArray" :key="index">
        <div class="one-and-two-col">
          <div class="icon">
          </div>
          <div class="text">
          </div>
        </div>
        <div class="three-col" @click="deleteRegion(index)">
          <div class="work-type-choose">
            <!-- <div class="work-taxon">{{item}}</div> -->
            <div class="work-type">{{item}}</div>
          </div>
          <div class="chose-icon">
            <img style="width: 50rpx; height: 50rpx;" src="../../../resources/icon/minus.png">
          </div>
        </div>
      </div>
      <!-- 列表单元  招工地点选择动态显示列表   END -->

      <!-- 列表单元 我的工种 START -->
      <div class="my-info-list">
        <div class="one-and-two-col">
          <div class="icon">
            <img style="width: 50rpx; height: 50rpx;" src="../../../resources/icon/info-fill.png">
          </div>
          <div class="text">
            我的工种
          </div>
        </div>
        <mpvue-picker ref="mpvuePickerReleaseMy" :mode="mode" :deepLength="deepLength" :pickerValueArray="mulLinkageTwoPicker" :pickerValueDefault='pickerValueDefault' @onConfirm="onConfirm" @onCancel="onCancel"></mpvue-picker>
        <div class="three-col" @click="showPicker">
          <div class="input-choose">请选择(Max 3个)</div>
          <div class="chose-icon">
            <img style="width: 50rpx; height: 50rpx;" src="../../../resources/icon/adding.png">
          </div>
        </div>
      </div>
      <!-- 列表单元  END -->

      <!-- 列表单元 工种选择动态显示列表  START -->
      <div class="my-info-list" v-if="job_taxon_display" v-for="(item, index) in tpyeofWork" :key="index">
        <div class="one-and-two-col">
          <div class="icon">
          </div>
          <div class="text">
          </div>
        </div>
        <div class="three-col" @click="deleteWork(index)">
          <div class="work-type-choose">
            <div class="work-taxon">{{item.team}}</div>
            <div class="work-type">&nbsp;&nbsp;-&nbsp;&nbsp;{{item.item}}</div>
          </div>
          <div class="chose-icon">
            <img style="width: 50rpx; height: 50rpx;" src="../../../resources/icon/minus.png">
          </div>
        </div>
      </div>
      <!-- 列表单元  工种选择动态显示列表   END -->

      <!-- 列表单元 找活描述 START -->
      <div class="on-and-down">
        <div class="my-info-list-2">
          <div class="one-and-two-col">
            <div class="icon">
              <img style="width: 50rpx; height: 50rpx;" src="../../../resources/icon/info-fill.png">
            </div>
            <div class="text">
              找活描述
            </div>
          </div>
        </div>
        <div class="text-array-class">
          <textarea class="text-array" v-show="textareaDisplay" @input="textAreaInput" maxlength="150" placeholder="请根据实际情况,真实地填写描述.不可发布违法信息,否则后果自负." style="height: 150rpx; background-color: #d8d8d8; width: 700rpx; margin: 0rpx 25rpx 25rpx 25rpx;" />
        </div>
      </div>
      <!-- 列表单元 找活描述 END -->

      <!-- 列表单元 工种选择 START -->
      <div class="my-info-list">
        <div class="one-and-two-col">
          <div class="icon">
            <img style="width: 50rpx; height: 50rpx;" src="../../../resources/icon/info-fill.png">
          </div>
          <div class="text">
            发布时间
          </div>
        </div>
        <mpvue-picker ref="mpvuePickerForTime" :mode="modeForTime" :pickerValueDefault="pickerTimeDefault" :deepLength="deepLengthForTime" @onConfirm="onConfirmForTime" @onCancel="onCancelForTime" :pickerValueArray="pickerTimeArray"></mpvue-picker>
        <div class="three-col" @click="showPickerForTime">
          <div class="input-choose">{{resultReleaseTime}}</div>
          <div class="chose-icon">
            <img style="width: 50rpx; height: 50rpx;" src="../../../resources/icon/arrows.png">
          </div>
        </div>
      </div>
      <!-- 列表单元 工种选择 END -->

    </div>
    <!-- info-must END -->

    <div class="base-info">经验(可不填)</div>

    <div class="info-must">
      <!-- 列表单元 工作经历 START -->
      <div class="my-info-list">
        <div class="one-and-two-col">
          <div class="icon">
            <img style="width: 50rpx; height: 50rpx;" src="../../../resources/icon/info-fill.png">
          </div>
          <div class="text">
            工作经历
          </div>
        </div>
        <div class="three-col" @click="experienceAdd">
          <div class="input-choose">请选择(Max 3个)</div>
          <div class="chose-icon">
            <img style="width: 50rpx; height: 50rpx;" src="../../../resources/icon/adding.png">
          </div>
        </div>
      </div>
      <!-- 列表单元 工作经历 END -->

      <!-- 列表单元 工作经历选择动态显示列表  START -->
      <div style="border-bottom: solid 1rpx #808080;" v-for="(item, index) in experienseArray" :key="index">
        <div class="my-info-list-experiense">
          <div class="one-and-two-col">
            <div class="icon">
              <div style="font-size: 40rpx">
                {{item.name}}
              </div>
              <div>
                {{item.start_at}}&nbsp;-&nbsp;;{{item.end_at}}
              </div>
            </div>
            <div class="text">
            </div>
          </div>
          <div class="three-col" @click.stop="experienceDetails(index)">
            <div class="work-type-choose">
              查看
            </div>
            <div class="chose-icon">
              <img style="width: 50rpx; height: 50rpx;" src="../../../resources/icon/edit.png">
            </div>
          </div>
          <div class="three-col" @click.stop="deleteExperiense(index)">
            <div class="work-type-choose">
              删除
            </div>
            <div class="chose-icon">
              <img style="width: 50rpx; height: 50rpx;" src="../../../resources/icon/minus.png">
            </div>
          </div>
        </div>
        <!-- <div class="image-upload">
          <div class="pre-div-image">
            <block v-for="(ele, count) in experienseImages[count]" :key="count">
              <div class="uploader-pre-image" @click.stop="viewImage()" :id="ele">
                <image class="uploader__img" :src="ele" mode="aspectFill" />
              </div>
            </block>
          </div>
        </div> -->
      </div>
      <!-- 列表单元  工作经历选择动态显示列表   END -->

    </div>

    <!-- 列表单元 找活描述 START -->
    <!-- <div class="info-option" @click="toMyExperiense">
      点击展开选项
    </div> -->
    <!-- 列表单元 找活描述 END -->

    <div class="base-info"></div>
    <div class="skip">
      <button class="freeRelease" type="primary" @click="freeRelease">免费发布找活</button>
    </div>
  </div>
</template>

<script>
import mpvuePicker from 'mpvue-picker'
import {
  getRegionTree,
  getJobTaxonTree,
  addApplicant,
  delCustomerWork,
  getWxFollower
} from '../../http/api.js'

export default {
  components: {
    mpvuePicker
  },
  data () {
    return {
      userInfoForAPI: null, // 当前用户信息
      age: '28', // 年龄,来自用户信息
      sex: '', // 性别 , ,来自用户信息
      nation: '请选择', // 名族,输入
      members: '请选择', // 个人或班组,输入
      // district: '', // 找活区域,输入
      description: '', // 找活描述,输入
      // citys: ['请选择'], // 找活区域,输入

      // ************地区筛选数据************
      cityIndex: ['辽宁省', '大连市', '中山区'],
      resultRegionArray: [], // 点击'确认'后,把结果推入到这个数组中
      regionNum: 0, // 找活区域显示计数器
      regionSelectedDisplay: false, // 找活区域显示开关

      // ************五十六个民族 picker 需要的数据************
      nations: ['汉族', '蒙古族', '回族', '藏族', '维吾尔族', '苗族', '彝族', '壮族', '布依族', '朝鲜族', '满族', '侗族', '瑶族', '白族', '土家族',
        '哈尼族', '哈萨克族', '傣族', '黎族', '傈僳族', '佤族', '畲族', '高山族', '拉祜族', '水族', '东乡族', '纳西族', '景颇族', '柯尔克孜族',
        '土族', '达斡尔族', '仫佬族', '羌族', '布朗族', '撒拉族', '毛南族', '仡佬族', '锡伯族', '阿昌族', '普米族', '塔吉克族', '怒族', '乌孜别克族',
        '俄罗斯族', '鄂温克族', '德昂族', '保安族', '裕固族', '京族', '塔塔尔族', '独龙族', '鄂伦春族', '赫哲族', '门巴族', '珞巴族', '基诺族'],
      nationsObjArray: [{ 'id': 0, 'name': '汉族' }, { 'id': 1, 'name': '蒙古族' }, { 'id': 2, 'name': '回族' }, { 'id': 3, 'name': '藏族' }, { 'id': 4, 'name': '维吾尔族' }, { 'id': 5, 'name': '苗族' }, { 'id': 6, 'name': '彝族' }, { 'id': 7, 'name': '壮族' }, { 'id': 8, 'name': '布依族' }, { 'id': 9, 'name': '朝鲜族' }, { 'id': 10, 'name': '满族' }, { 'id': 11, 'name': '侗族' }, { 'id': 12, 'name': '瑶族' }, { 'id': 13, 'name': '白族' }, { 'id': 14, 'name': '土家族' }, { 'id': 15, 'name': '哈尼族' }, { 'id': 16, 'name': '哈萨克族' }, { 'id': 17, 'name': '傣族' }, { 'id': 18, 'name': '黎族' }, { 'id': 19, 'name': '傈僳族' }, { 'id': 20, 'name': '佤族' }, { 'id': 21, 'name': '畲族' }, { 'id': 22, 'name': '高山族' }, { 'id': 23, 'name': '拉祜族' }, { 'id': 24, 'name': '水族' }, { 'id': 25, 'name': '东乡族' }, { 'id': 26, 'name': '纳西族' }, { 'id': 27, 'name': '景颇族' }, { 'id': 28, 'name': '柯尔克孜族' }, { 'id': 29, 'name': '土族' }, { 'id': 30, 'name': '达斡尔族' }, { 'id': 31, 'name': '仫佬族' }, { 'id': 32, 'name': '羌族' }, { 'id': 33, 'name': '布朗族' }, { 'id': 34, 'name': '撒拉族' }, { 'id': 35, 'name': '毛南族' }, { 'id': 36, 'name': '仡佬族' }, { 'id': 37, 'name': '锡伯族' }, { 'id': 38, 'name': '阿昌族' }, { 'id': 39, 'name': '普米族' }, { 'id': 40, 'name': '塔吉克族' }, { 'id': 41, 'name': '怒族' }, { 'id': 42, 'name': '乌孜别克族' }, { 'id': 43, 'name': '俄罗斯族' }, { 'id': 44, 'name': '鄂温克族' }, { 'id': 45, 'name': '德昂族' }, { 'id': 46, 'name': '保安族' }, { 'id': 47, 'name': '裕固族' }, { 'id': 48, 'name': '京族' }, { 'id': 49, 'name': '塔塔尔族' }, { 'id': 50, 'name': '独龙族' }, { 'id': 51, 'name': '鄂伦春族' }, { 'id': 52, 'name': '赫哲族' }, { 'id': 53, 'name': '门巴族' }, { 'id': 54, 'name': '珞巴族' }, { 'id': 55, 'name': '基诺族' }],
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
      memberIndex: 0, // 默认

      // ************地区筛选数据************
      // modeForRegion: 'multiLinkageSelector',
      // pickerRegionArray: [],
      // pickerRegionDefault: [0, 0],
      // deepLengthForRegion: 2,
      // // resultRegionArray: [], // 点击'确认'后,把结果推入到这个数组中

      // ************textarea 数据**************
      textareaDisplay: true, // textarea标签是否显示开关

      // ************工种筛选数据, 还需要有个事件和处理函数showPicker()**************
      tpyeofWork: [], // 工种 ,输入 这个用于分开显示
      resultProfession: [], // 纯工种数组
      resultTypeOfWork: [], // 返回选择的工种类和工种
      pickerValueDefault: [0, 0],
      deepLength: 2,
      mode: 'multiLinkageSelector',
      mulLinkageTwoPicker: [],
      pickerNumber: 0, // picker点击的次数的计数器
      job_taxon_display: false, // 工种选项动态显示标志位

      // ************发布时间选数据**************
      resultReleaseTime: '请选择', // 发布时间 '请选择'之后通过用户输入改
      modeForTime: 'selector',
      pickerTimeDefault: [1],
      deepLengthForTime: 1,
      pickerTimeArray: [
        {
          label: '15天',
          value: 0
        },
        {
          label: '30天',
          value: 1
        },
        {
          label: '60天',
          value: 2
        }
      ],
      files: [], // 图片显示目录

      // ****************工作经验变量*******************
      experienceCount: 0, // 工作经验计数器
      // experienceDsiplay: true, // 动态显示工作经历开关
      experienseArray: [], // 工作经历数据存储数组
      experienseImages: [], // 经过整理的工作经历照片 
    }
  },

  async onLoad (option) {
    console.log('onLoad...........');

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

    // 程序进入当前页面后,先取得全局用户信息userInfoForAPI,然后根据id取云端userInfoFroAPI,再根据从云端取回来的数据存入本地userInfoForAPI
    wx.getStorage({
      key: 'userInfoForAPI',
      success: (res) => {
        console.log('userInfoForAPI 获取成功了!!!')
        this.userInfoForAPI = res.data;
        // 根据从KJob server得到的用户id,请求KJob Server 得到用户数据
        getWxFollower(this.userInfoForAPI.id).then((res) => {
          // 把当前用户微信数保和KJob用户信息保存到全局变量userInfoForAPI中
          wx.setStorage({
            key: 'userInfoForAPI',
            data: res,
            success: (res) => {
              console.log('setStorage data 后得 res = ', res);
              console.log('userInfoForAPI 存储成功了!!!')
              wx.getStorage({
                key: 'userInfoForAPI',
                success: (res) => {
                  console.log('userInfoForAPI 获取成功了!!!')
                  this.userInfoForAPI = res.data;
                  // 判断 男 女
                  if (this.userInfoForAPI.gender === 1) {
                    this.sex = '男'
                  } else {
                    this.sex = '女'
                  }
                  // 把工作经历给出去
                  this.experienseArray = this.userInfoForAPI.customer_works
                  this.experienseArray.forEach((value, index) => {
                    this.experienseImages[index] = value.work_images.map((ele) => { return ele.original_url })
                  })
                }
              })
            },
            fail: () => {
              console.log('userInfoForAPI 存储失败了*******')
            }
          })
        }).catch((err) => {
          console.log(err);
        })
      }
    })

    /* *************get kjob server 得到全国地区数据*************** */
    getRegionTree().then(res => {
      console.log('地区', res)
      this.pickerRegionArray = res;
    }).catch(function (error) {
      console.log('error', error)
    })
    /* *************get kjob server 得到工种数据*************** */
    getJobTaxonTree().then(res => {
      console.log('用工分类', res);
      this.mulLinkageTwoPicker = res
    }).catch(function (error) {
      console.log('error', error)
    })
  },

  async onShow () {
    console.log('noShow...........');
  },

  methods: {
    // **************民族选择处理函数**************
    chooseNation (e) {
      console.log('名族选择点击了************')
      // console.log('选择的民族是 : => ', e)
      console.log('e.mp.detail.value : => ', e.mp.detail.value)
      console.log(' 选择的民族是 : => ', this.nationsObjArray[e.mp.detail.value].name)
      this.nation = this.nationsObjArray[e.mp.detail.value].name
    },

    // **************个人或班组选择处理函数**************
    choosemembers (e) {
      console.log('找活区域选择点击了************')
      this.members = this.memberArray[e.mp.detail.value].name
      console.log(' 选择的班组是 : => ', this.memberArray[e.mp.detail.value].name)
    },

    // *******************************************地区筛选方法******************************************
    showPickerForRegion () {
      this.$refs.mpvuePickerForRegion.show();
      this.textareaDisplay = false  // 因为textarea有冲突,所以必须要关闭显示
    },

    // ******************找活区域选择处理函数******************
    cityChoose (e) {
      this.regionNum++
      if (this.regionNum === 4) {
        this.regionNum = 3
        wx.showModal({
          content: '最多只能选择3个区域',
          showCancel: false
        })
      } else {
        this.regionSelectedDisplay = true // 显示选择结果
        console.log('选中的城市为：', e.mp.detail.value)
        let tempDistrict = ''
        // 从数组中提取字符串
        for (let index = 0; index <= 2; index++) {
          if (index !== 0) {
            tempDistrict += '-'
          }
          tempDistrict += e.mp.detail.value[index]
        }
        console.log(tempDistrict);
        this.resultRegionArray.push(tempDistrict);
      }
    },

    /* ********地区筛选mpvuePicker点击确定事件处理函数******************** */
    onConfirmForRegion (e) {
      console.log(e);
      this.regionNum++
      if (this.regionNum === 4) {
        this.regionNum = 3
        wx.showModal({
          content: '最多只能选择3个区域',
          showCancel: false
        })
      } else {
        this.regionSelectedDisplay = true
        this.resultRegionArray.push(e.label)
      }
      this.textareaDisplay = true // textarea 显示打开
    },

    onCancelForRegion (e) {
      // this.textAreaDisplay = true;
      console.log(e);
      this.textareaDisplay = true // 打开显示textarea
    },

    /* ****************地区筛选,点击删除按钮事件处理函数******************** */
    deleteRegion (index) {
      // console.log(e);
      // 删除指定数组元素,根据index
      this.resultRegionArray.splice(this.resultRegionArray.findIndex((item, ind) => ind === index), 1)
      this.regionNum-- // 计数器减一
      if (this.regionNum === 0) { // 计数器减到0时,关闭显示开关
        this.regionSelectedDisplay = false
      }
    },

    // **********************************工种筛选方法,必须要有****************************************
    showPicker () {
      this.$refs.mpvuePickerReleaseMy.show()
      this.textareaDisplay = false  // 因为textarea有冲突,所以必须要关闭显示
    },

    /* ********mpvuePickerReleaseMy点击确定事件处理函数
    // 因为console.log(e)返回的是数组下标,故需要自己判断处理
    ******************** */
    onConfirm (e) {
      console.log('工种选择的e = ', e)
      // 得到选择的数组下标,给tempArray
      // 进来后加1,
      this.pickerNumber++
      // 判读第几次,如果大于3次就弹窗提示,并且再次把计算器赋值3;小于3次,加入工种数组
      if (this.pickerNumber > 3) {
        this.pickerNumber = 3
        wx.showModal({
          content: '最多只能选择3个工种',
          showCancel: false
        })
      } else {
        // log(e) 打印的数据是 lable:装修类-木工,把lable给resultTypeOfWork,主要是为了界面的要求,才给这样的数据{ team: '', item: '' }
        let tempIndex = 0
        let tempObj = { team: '', item: '' }
        let resultTypeOfWork = e.label
        console.log(resultTypeOfWork)
        this.resultTypeOfWork.push(resultTypeOfWork) // 把选择的结果推送到结果数组中
        tempIndex = resultTypeOfWork.indexOf('-')
        tempObj.team = resultTypeOfWork.substring(0, tempIndex)
        tempObj.item = resultTypeOfWork.substring(tempIndex + 1)
        this.tpyeofWork.push(tempObj) // team item 存入数组
        this.resultProfession.push(tempObj.item) // 纯工种存入数组
        this.job_taxon_display = true // 打开工种显示开关
      }
      this.textareaDisplay = true // textarea 显示打开
    },

    /* ********mpvuePickerReleaseMy 的取消点击确定事件处理函数
    // 把 textarea 标签显示打开
    ******************** */
    onCancel (e) {
      console.log('onCancel')
      this.textareaDisplay = true // 打开显示textarea
    },

    // *****工种删除点击处理函数,删除所选项*****
    deleteWork (index) {
      console.log(index)
      // 删除指定数组元素,根据index
      this.resultTypeOfWork.splice(this.resultTypeOfWork.findIndex((item, ind) => ind === index), 1)
      this.tpyeofWork.splice(this.tpyeofWork.findIndex((item, ind) => ind === index), 1)
      this.pickerNumber-- // 计数器减一
      if (this.pickerNumber === 0) { // 计数器减到0时,关闭显示开关
        this.job_taxon_display = false
      }
    },

    // *********************找活描述中,textArray 输入处理函数************************
    textAreaInput (e) {
      console.log(e.target.value)
      this.description = e.target.value
    },

    // ****************************时间筛选方法***********************************
    showPickerForTime () {
      this.$refs.mpvuePickerForTime.show();
      this.textAreaDisplay = false;
    },

    /* ********时间筛选mpvuePicker点击确定事件处理函数******** */
    onConfirmForTime (e) {
      console.log(e);
      this.textAreaDisplay = true;
      this.resultReleaseTime = e.label
    },

    onCancelForTime (e) {
      this.textAreaDisplay = true;
      console.log(e);
    },

    // *********经验点击处理函数-----跳转到我的经验页面*********
    toMyExperiense () {
      console.log('调到我的经验页面')
      wx.navigateTo({ url: '../myexperiense/main' }) // 跳转到我的经验页面
    },

    // *********点击免费发布找活按钮-----跳转到我的经验页面*********
    freeRelease () {
      console.log('免费发布找活按钮点击了....');
      if (this.nation === '请选择' || this.members == '请选择' || this.resultRegionArray.length === 0 || this.resultTypeOfWork.length === 0 || this.description === '' || this.resultReleaseTime === '请选择') {
        wx.showModal({
          content: '请填入必填信息,方能提交保存!',
          showCancel: false
        })
      } else { // 转换数据,提交KJob
        let applicant = this.dataTidy();
        console.log('applicant ==== > ', applicant);
        addApplicant(applicant).then((res) => {
          console.log('addApplicant 后 得到的 res = ', res);
        }).catch((err) => {
          console.log(err);
        })
        wx.reLaunch({ url: '../getworks/main' }) // 跳转到发布找活页面
      }
    },

    // *******************数据整理********************
    dataTidy () {
      let numForRegion = 1
      let numForProfession = 1
      let dataToServer = {}
      let tempArrayFroProfession = []; // 为了得到工种需要的临时数组
      dataToServer.headimgurl = this.userInfoForAPI.headimgurl
      dataToServer.customer_id = this.userInfoForAPI.id
      dataToServer.realname = this.userInfoForAPI.realname
      dataToServer.computed_age = this.userInfoForAPI.computed_age
      dataToServer.mobile = this.userInfoForAPI.mobile
      dataToServer.nation = this.nation
      dataToServer.gender = this.userInfoForAPI.gender // 恐怕是没有
      dataToServer.expire_in = this.resultReleaseTime // 恐怕是没有
      dataToServer.members = this.members // 个人或班组
      dataToServer.description = this.description

      // 因为API需要地区是字符串不是数组,所以需要把数组中的每个元素分别付给API需要的字符串属性
      this.resultRegionArray.forEach((value) => {
        let tempString = 'district' + numForRegion + '_fullname'
        // let tempString = 'district' + numForRegion + '_id'
        dataToServer[tempString] = value
        // console.log(tempString); // 每次循环变成 district1_fullname district2_fullname district3_fullname
        numForRegion++
      })

      // 遍历mulLinkageTwoPicker,得到工种的value,放入tempArrayFroProfession中
      this.resultProfession.forEach((valuePro) => {
        this.mulLinkageTwoPicker.forEach((valueMul) => {
          valueMul.children.forEach((valueChildren) => {
            if (valueChildren.label === valuePro) {
              tempArrayFroProfession.push(valueChildren.value)
            }
          })
        })
      })
      console.log('tempArrayFroProfession = ', tempArrayFroProfession);

      // 因为API需要地区是字符串不是数组,所以需要把数组中的每个元素分别付给API需要的字符串属性
      tempArrayFroProfession.forEach((value) => {
        let tempString = 'job_taxon' + numForProfession + '_id'
        dataToServer[tempString] = value
        // console.log(tempString); // 每次循环变成 district1_fullname district2_fullname district3_fullname
        numForProfession++
      })

      let applicant = {}
      applicant.applicant = dataToServer;
      console.log(applicant);
      return applicant;
    },

    // *********************预览图片处理函数************************
    // ***调用wx.previewImage***
    // ***************************************************************
    predivImage (e) {
      console.log(e)
      wx.previewImage({
        current: e.currentTarget.id, // 当前显示图片的http链接
        urls: this.files // 需要预览的图片http链接列表
      })
    },

    // *********************预览图片处理函数************************
    // ***调用wx.previewImage***
    // ***************************************************************
    viewImage (e) {
      console.log(e)
      // console.log(count)
      wx.previewImage({
        current: e.currentTarget.id, // 当前显示图片的http链接
        urls: this.experienseImages // 需要预览的图片http链接列表
      })
    },

    // *********************工作经验"+"号处理函数************************
    // ***如果3次添加工作经验,弹窗提示***
    // ***************************************************************
    experienceAdd () {
      if (this.experienseArray.length === 3) { // 多余3次点击了
        wx.showModal({
          content: '最多只能添加3个工种经验',
          showCancel: false
        })
      } else { // 没有到达3次,跳转我的工作经验
        wx.navigateTo({ url: '../myexperiense/main?isView=false' }) // 跳转到我的经验页面
      }
    },

    // *********************工作经验"-"号处理函数************************
    // ***点一次,计数器减一个***
    // ***************************************************************
    deleteExperiense (index) {
      let id = this.experienseArray[index].id
      console.log(' id = ', id);
      wx.showModal({
        title: '提示',
        content: '确定要删除这条工作经历吗?',
        success: (res) => {
          if (res.confirm) { // 点击确定
            console.log('用户点击确定')
            // 提交API 删除当前工作经历 , 1.成功后弹showToast成功,计数器减; 2.失败后弹showToast失败
            delCustomerWork(id).then((res) => {
              // 弹showToast
              wx.showToast({
                title: '成功',  //标题
                icon: 'success',  //图标，支持"success"、"loading"
                duration: 2000, //提示的延迟时间，单位毫秒，默认：1500
                mask: true,  //是否显示透明蒙层，防止触摸穿透，默认：false
              })
              // 删除数据从数组
              this.experienseArray.splice(index, 1)
              let userID = this.userInfoForAPI.id
              // 清空storage
              wx.clearStorage({
                success: () => {
                  getWxFollower(userID).then((res) => {
                    // this.userInfoForAPI = res
                    // 把当前用户微信数保和KJob用户信息保存到全局变量userInfoForAPI中
                    wx.setStorage({
                      key: 'userInfoForAPI',
                      data: res,
                      success: (res) => {
                        console.log('setStorage 删除数据 后得 res = ', res);
                        wx.getStorage({
                          key: 'userInfoForAPI',
                          success: (res) => {
                            console.log('userInfoForAPI 获取成功了!!!')
                            this.userInfoForAPI = res.data;
                            // 把工作经历给出去
                            this.experienseArray = this.userInfoForAPI.customer_works
                            this.experienseArray.forEach((value, index) => {
                              this.experienseImages[index] = value.work_images.map((ele) => { return ele.original_url })
                            })
                          }
                        })
                      },
                      fail: () => {
                        console.log('userInfoForAPI 存储失败了*******')
                      }
                    })
                  }).catch((err) => {
                    console.log(err);
                  })
                }
              })

            }).catch((err) => {
              console.log(err);
              wx.showToast({
                title: '未删除',  //标题
                icon: 'loading',  //图标，支持"success"、"loading"
                duration: 2000, //提示的延迟时间，单位毫秒，默认：1500
                mask: true,  //是否显示透明蒙层，防止触摸穿透，默认：false
              })
            })
          } else if (res.cancel) {  // 点击取消
            console.log('用户点击取消')
          }
        }
      })
    },

    // *********************工作经历点击详情处理函数************************
    // ***进入我的工作经历页面***
    // ***************************************************************
    experienceDetails (index) {
      console.log('experienceDetails index = ', index);
      let experienseItem = this.experienseArray[index]
      // 保存storage experienseItem
      wx.setStorage({
        key: 'experienseItem',
        data: experienseItem,
        success: (res) => {
          console.log('experienseItem data 后得 res = ', res);
          console.log('experienseItem 存储成功了!!!')
          wx.navigateTo({ url: '../myexperiense/main?isView=true' }) // 跳转到我的经验页面
        },
        fail: () => {
          console.log('experienseItem 存储失败了*******')
        }
      })
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
          font-size: 25rpx;
        }
        .text {
          margin-left: 25rpx;
        }
      }
      .three-col {
        display: flex;
        .work-type-choose {
          display: flex;
          .work-taxon {
            border-radius: 20rpx;
            background-color: #0080ff;
            border: solid 2rpx #006ddb;
            color: #ffffff;
            font-size: 30rpx;
            margin: auto 0;
          }
        }
      }
    }
    .my-info-list-experiense {
      display: flex;
      padding: 25rpx 25rpx 10rpx 25rpx;
      justify-content: space-between;
      .one-and-two-col {
        display: flex;
        .icon {
          font-size: 25rpx;
        }
        .text {
          margin-left: 25rpx;
        }
      }
      .three-col {
        display: flex;
        .work-type-choose {
          display: flex;
          font-size: 35rpx;
          .work-taxon {
            border-radius: 20rpx;
            background-color: #0080ff;
            border: solid 2rpx #006ddb;
            color: #ffffff;
            font-size: 30rpx;
            margin: auto 0;
          }
        }
      }
      .image-upload {
        height: 300rpx;
        background-color: #ffffff;
        .uploader-input-box {
          float: left;
          position: relative;
          margin-right: 9px;
          margin-bottom: 9px;
          width: 77px;
          height: 77px;
          // border: 1px solid #d9d9d9;
          .add-image {
            margin: 25rpx;
            height: 200rpx;
            width: 200rpx;
            background-color: #ffffff;
            border: solid 1rpx #0080ff;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
        .pre-div-image {
          .uploader__img {
            display: block;
            width: 200rpx;
            height: 200rpx;
          }
          .uploader-pre-image {
            float: left;
            margin: 25rpx;
            .delet-button {
              height: 50rpx;
              display: flex;
              align-items: center;
              font-size: 40rpx;
              justify-content: center;
            }
          }
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
