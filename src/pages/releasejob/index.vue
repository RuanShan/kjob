<template>
  <div>
    <div class="base-info">基本信息(必填)</div>

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
          <input class="wx-input" maxlength="10" type="text" placeholder="如:深圳招电工" v-model="title" />
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

      <!-- 列表单元 招工地点 START -->
      <!-- <div class="my-info-list">
        <div class="one-and-two-col">
          <div class="icon">
            <img style="width: 50rpx; height: 50rpx;" src="../../../resources/icon/info-fill.png">
          </div>
          <div class="text">
            招工地点
          </div>
        </div>
        <mpvue-picker ref="mpvuePickerForRegion" :mode="modeForRegion" :deepLength="deepLengthForRegion" :pickerValueDefault="pickerRegionDefault" @onConfirm="onConfirmForRegion" @onCancel="onCancelForRegion" :pickerValueArray="pickerRegionArray"></mpvue-picker>
        <div class="three-col" @click="showPickerForRegion">
          <div class="input-choose">{{district_fullname}}</div>
          <div class="chose-icon">
            <img style="width: 50rpx; height: 50rpx;" src="../../../resources/icon/arrows.png">
          </div>
        </div>
      </div> -->
      <!-- 列表单元 招工地点 END -->

      <!-- 列表单元 招工地点 START -->
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
            <div class="input-choose">{{regionFullName}}</div>
            <div class="chose-icon">
              <img style="width: 50rpx; height: 50rpx;" src="../../../resources/icon/arrows.png">
            </div>
          </div>
        </picker>
      </div>
      <!-- 列表单元 招工地点 END -->

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
        <mpvue-picker ref="mpvuePickerForJob" :mode="modeForJob" :deepLength="deepLengthForJob" :pickerValueDefault="pickerJobDefault" @onConfirm="onConfirmForJob" @onCancel="onCancelForJob" :pickerValueArray="pickerJobArray"></mpvue-picker>
        <div class="three-col" @click="showPickerForJob">
          <div class="input-choose">{{profession}}</div>
          <div class="chose-icon">
            <img style="width: 50rpx; height: 50rpx;" src="../../../resources/icon/arrows.png">
          </div>
        </div>
      </div>
      <!-- 列表单元 工种选择 END -->

      <!-- 列表单元 招工人数 START -->
      <div class="my-info-list" v-if="timeWorkDisplay">
        <div class="one-and-two-col">
          <div class="icon">
            <img style="width: 50rpx; height: 50rpx;" src="../../../resources/icon/info-fill.png">
          </div>
          <div class="text">
            招工人数
          </div>
        </div>
        <div class="three-col">
          <input class="wx-input" maxlength="10" type="number" placeholder="多少人?只能数字" v-model="quantity" />
        </div>
      </div>
      <!-- 列表单元 招工人数 END -->

      <!-- 列表单元 工资标准 START -->
      <div class="my-info-list" v-if="timeWorkDisplay">
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

      <!-- 列表单元 工程数量 START -->
      <div class="my-info-list" v-if="allWorkDisplay">
        <div class="one-and-two-col">
          <div class="icon">
            <img style="width: 50rpx; height: 50rpx;" src="../../../resources/icon/info-fill.png">
          </div>
          <div class="text">
            工程数量
          </div>
        </div>
        <div class="three-col">
          <input class="wx-input" maxlength="15" type="text" placeholder="量+单位/可中文" v-model="quantity_desc" />
        </div>
      </div>
      <!-- 列表单元 工程数量 END -->

      <!-- 列表单元 单位价格 START -->
      <div class="my-info-list" v-if="allWorkDisplay">
        <div class="one-and-two-col">
          <div class="icon">
            <img style="width: 50rpx; height: 50rpx;" src="../../../resources/icon/info-fill.png">
          </div>
          <div class="text">
            单位价格
          </div>
        </div>
        <div class="three-col">
          <!-- <input class="wx-input" maxlength="10" type="number" placeholder="多少钱?只能数字" v-model="pay_desc" /> -->
          <input class="wx-input" maxlength="15" type="text" placeholder="价+单位/可中文" v-model="pay_desc" />
        </div>
      </div>
      <!-- 列表单元 单位价格 END -->

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
          <textarea class="text-array" v-show="textAreaDisplay" @input="textAreaInput" maxlength="150" placeholder="请根据实际情况,真实地填写描述.不可发布违法信息,否则后果自负." style="height: 150rpx; background-color: #d8d8d8; width: 700rpx; margin: 0rpx 25rpx 25rpx 25rpx;" />
          </div>
      </div>
      <!-- 列表单元 招工描述 END -->

      <!-- 列表单元 添加工程照片 START -->
      <div class="on-and-down">
        <div class="my-info-list-2">
          <div class="one-and-two-col">
            <div class="icon">
              <img style="width: 50rpx; height: 50rpx;" src="../../../resources/icon/info-fill.png">
            </div>
            <div class="text">
              添加工程照片
            </div>
          </div>
        </div>
        <div class="image-upload">
          <div class="pre-div-image">
            <block v-for="(item, index) in files" :key="index">
              <div class="uploader-pre-image" @click="predivImage" :id="item">
                <image class="uploader__img" :src="item" mode="aspectFill" />
                <button class="delet-button" @click.stop="deleteImage(index)">删除</button>
              </div>
            </block>
          </div>
          <div>
            <div class="uploader-input-box" v-if="addImageDisplay">
              <div class="add-image" @click="chooseImage">
                <img style="width: 160rpx; height: 160rpx;" src="../../../resources/icon/add-2.png">
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 列表单元 添加工程照片 END -->

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
          <div class="input-choose">{{releaseTime}}</div>
          <div class="chose-icon">
            <img style="width: 50rpx; height: 50rpx;" src="../../../resources/icon/arrows.png">
          </div>
        </div>
      </div>
      <!-- 列表单元 工种选择 END -->

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
          {{userInfoForAPI.realname}}
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
          {{userInfoForAPI.mobile}}
        </div>
      </div>
      <!-- 列表单元 联系电话 END -->

      <div class="base-info-space"></div>

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

      <div class="base-info-space"></div>

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
import { getRegionTree, getJobTaxonTree, addJob } from '../../http/api.js'
import config from '../../config'
const hostFly = config.host + '/api/v1/images/'

export default {
  components: {
    mpvuePicker
  },
  data () {
    return {
      userInfoForAPI: null, // 当前用户信息
      title: '', // 输入的招工名称

      // ************根据点工和包工选择数据,显示不同的内容************
      timeWorkDisplay: true, // 选择点工显示
      allWorkDisplay: false, // 选择包工显示

      // ************地区筛选数据************
      cityIndex: ['辽宁省', '大连市', '中山区'],
      regionFullName: '请选择',

      // ************地区筛选数据************
      modeForRegion: 'multiLinkageSelector',
      pickerRegionArray: [],
      pickerRegionDefault: [0, 0],
      deepLengthForRegion: 2,
      district_fullname: '请选择', // 用户选择的省市区,和在页面中显示的作用

      // ************工种筛选数据**************
      profession: '请选择', // 工种类别'装修类-木工'
      job_taxon_id: '', // 接口需要的数据
      modeForJob: 'multiLinkageSelector',
      pickerJobArray: [],
      pickerJobDefault: [0, 0],
      deepLengthForJob: 2,

      // ************发布时间选数据**************
      releaseTime: '请选择', // 发布时间 '请选择'之后通过用户输入改
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

      // ************图片预览数据************
      files: [], // 图片保存位置
      addImageDisplay: true, // 图片添加显示开关
      addImageCount: 0, // 图片添加计数器

      // ******************点工和包工使用的变量*********************
      radioItems: [
        { name: '点工', value: '0', checked: true },
        { name: '包工', value: '1' }
      ],
      worker_type: '点工', // 招工类型
      // numOfPeople: '', // 输入招工人数
      quantity: '', // 输入招工人数
      pay: '', // 输入的工资标准
      quantity_desc: '', // 输入工程数量
      pay_desc: '', // 输入单价
      description: '', // 招工描述 输入
      textAreaDisplay: true, // 招工描述显示开关
      disclaimer: '建筑用工郑重声明：招聘过程中禁止提前支付费费用，必须在附近验证身份后再带入工地现场，以免被骗！若双方发生经济纠纷本平台概不负责！举报客服电话：13042472444' // 免责声明 服务器给
    }
  },

  onLoad (option) {
    console.log('hostFly = ', hostFly);
    this.title = '' // 输入的招工名称
    this.timeWorkDisplay = true // 选择点工显示
    this.allWorkDisplay = false // 选择包工显示
    this.worker_type = '点工'
    this.regionFullName = '请选择'
    this.profession = '请选择'
    this.quantity = '' // 输入工程量和输入招工人数
    this.pay = '' // 输入的工资标准
    this.description = '' // 招工描述 输入
    this.files = []
    this.releaseTime = '请选择'
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
      this.pickerJobArray = res
    }).catch(function (error) {
      console.log('error', error)
    })
  },

  onShow () {
    // 程序进入当前页面后,先取得全局用户信息userInfoForAPI
    wx.getStorage({
      key: 'userInfoForAPI',
      success: (res) => {
        console.log('userInfoForAPI 获取成功了!!!')
        this.userInfoForAPI = res.data;
      }
    })
  },

  methods: {
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
      // 判断用户选择的是哪一个招工类型
      if (this.worker_type === '点工') {
        this.timeWorkDisplay = true
        this.allWorkDisplay = false
      } else {
        this.timeWorkDisplay = false
        this.allWorkDisplay = true
      }
    },

    // ************找活描述中,textArray 输入处理函数***************
    textAreaInput (e) {
      console.log(e.target.value)
      this.description = e.target.value
    },




    // *************************小程序picker 确定处理函数******************************
    cityChoose (e) {
      console.log('小程序Picker 点击确认事件', e.mp.detail.value);
      let tempDistrict = ''
      // 从数组中提取字符串
      for (let index = 0; index <= 2; index++) {
        if (index !== 0) {
          tempDistrict += '-'
        }
        tempDistrict += e.mp.detail.value[index]
      }
      this.regionFullName = tempDistrict
      console.log(tempDistrict);
    },

    // ***************地区筛选方法***************
    showPickerForRegion () {
      this.textAreaDisplay = false;
      this.$refs.mpvuePickerForRegion.show();
    },

    /* ********地区筛选mpvuePicker点击确定事件处理函数******************** */
    onConfirmForRegion (e) {
      console.log(e);
      this.district_fullname = e.label
      this.textAreaDisplay = true;
    },

    onCancelForRegion (e) {
      this.textAreaDisplay = true;
      console.log(e);
    },

    // ***************工种筛选方法***************
    showPickerForJob () {
      this.textAreaDisplay = false;
      this.$refs.mpvuePickerForJob.show();
    },

    /* ********工种筛选mpvuePicker点击确定事件处理函数******************** */
    onConfirmForJob (e) {
      console.log(e);
      this.textAreaDisplay = true;
      this.profession = e.label
      let n = e.value[0]
      let p = e.value[1]
      this.job_taxon_id = this.pickerJobArray[n].children[p].value
      console.log('this.job_taxon_id = ', this.job_taxon_id);
    },

    onCancelForJob (e) {
      console.log(e);
      this.textAreaDisplay = true;
    },

    // ****************************时间筛选方法***********************************
    showPickerForTime () {
      this.textAreaDisplay = false;
      this.$refs.mpvuePickerForTime.show();
    },

    /* ********时间筛选mpvuePicker点击确定事件处理函数******** */
    onConfirmForTime (e) {
      console.log(e);
      this.textAreaDisplay = true;
      this.releaseTime = e.label
    },

    onCancelForTime (e) {
      this.textAreaDisplay = true;
      console.log(e);
    },

    // *********************点击添加图片处理函数************************
    // ***把图片添加到files[]中,成功后把图片添加的计数器加一***
    // ***************************************************************
    chooseImage (e) {
      let _this = this
      wx.chooseImage({
        count: 3, // 只能选3张
        sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          console.log('chooseImage = ', res);
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          _this.files = _this.files.concat(res.tempFilePaths)
        },
        fail: function () {
          console.log('fail')
        },
        complete: function () {
          console.log('commplete')
          _this.addImageCount++
        }
      })
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

    // *********************删除图片处理函数************************
    // ***把图片从files[]中删除,图片计数器减一***
    // ***************************************************************
    deleteImage (index) {
      console.log(index)
      this.files.splice(index, 1)
      this.addImageCount--
    },


    // **********免费发布找活按钮点击处理函数-----跳转到找活页面************
    freeRelease () {
      console.log('免费发布找活了.....')
      let job = {}
      let dataToServer = {}
      dataToServer.name = this.title // 招工名称
      dataToServer.customer_id = this.userInfoForAPI.customer_id // 发布人id
      dataToServer.district_fullname = this.regionFullName // 招工地点
      dataToServer.job_taxon_id = this.job_taxon_id // 工种类别
      dataToServer.description = this.description // 招工描述
      dataToServer.expire_in = this.releaseTime.substring(0, 2) // 发布时间
      // dataToServer.job_images_attributes = this.files.map((file) => { return { attachment: file }})  // 照片
      console.log('dataToServer = ', dataToServer);

      if (this.worker_type === '点工') {
        dataToServer.worker_type = 'parttime' // 招工类型-点工
        // 如果没有填全,弹窗
        if (this.title === '' || this.regionFullName == '请选择' || this.profession === '请选择' || this.quantity === '' || this.pay === '' || this.description === '' || this.files.length === 0 || this.releaseTime === '请选择') {
          console.log('dataToServer = ', dataToServer);
          wx.showModal({
            content: '请填入必填信息,方能提交保存!',
            showCancel: false
          })
        } else { // 转换数据,提交KJob
          dataToServer.quantity = this.quantity // 招工人数或工程数量
          dataToServer.pay = this.pay // 工资标准
          job.job = dataToServer
          console.log(job);
          this.addJobInfo(job)
          // wx.reLaunch({ url: '../getworks/main' }) // 跳转到发布找活页面
        }
      }
      if (this.worker_type === '包工') {
        dataToServer.worker_type = 'contract' // 招工类型-包工
        if (this.title === '' || this.regionFullName == '请选择' || this.profession === '请选择' || this.quantity_desc === '' || this.pay_desc === '' || this.description === '' || this.files.length === 0 || this.releaseTime === '请选择') {
          // console.log('this.title = ', this.title);
          // console.log('this.regionFullName = ', this.regionFullName);
          // console.log('this.profession = ', this.profession);
          // console.log('this.pay_desc = ', this.pay_desc);
          // console.log('this.pay = ', this.pay);
          // console.log('this.description = ', this.description);
          // console.log('this.files = ', this.files);
          // console.log('this.releaseTime = ', this.releaseTime);
          wx.showModal({
            content: '请填入必填信息,方能提交保存!',
            showCancel: false
          })
        } else { // 转换数据,提交KJob
          dataToServer.quantity_desc = this.quantity_desc // 招工人数或工程数量
          dataToServer.pay_desc = this.pay_desc //单位价格
          job.job = dataToServer
          console.log(job);
          this.addJobInfo(job)
          // wx.reLaunch({ url: '../getworks/main' }) // 跳转到发布找活页面
        }
      }
    },

    // *************************添加招工信息API******************************
    addJobInfo (job) {
      addJob(job).then((res) => {
        console.log('addJobInfo res => ', res);
        let successUp = 0; //成功
        let failUp = 0; //失败
        let length = this.files.length; //总数
        let count = 0; //第几张
        let id = res.id; // API 需要的 id
        this.uploadOneByOne(this.files, successUp, failUp, count, length, id);
      }).catch((err) => {
        console.log(err);
      })
    },

    /**
  * 采用递归的方式上传
  */
    uploadOneByOne (imgPaths, successUp, failUp, count, length, id) {
      console.log('uploadOneByOne -> id = ', id);
      let that = this;
      wx.showLoading({
        title: '正在上传第' + count + '张',
      })
      wx.uploadFile({
        url: hostFly, //
        filePath: imgPaths[count],
        name: 'image[attachment]',  //示例，使用顺序给文件命名
        formData: { 'image[job_id]': id },
        success: (e) => {
          successUp++;//成功+1
          console.log('上传成功' + successUp);
        },
        fail: (e) => {
          failUp++;//失败+1
        },
        complete: (e) => {
          count++;//下一张
          if (count == length) {
            //上传完毕，作一下提示
            console.log('上传成功' + successUp + ',' + '失败' + failUp);
            wx.showToast({
              title: '上传成功' + successUp,
              icon: 'success',
              duration: 2000
            })
            wx.reLaunch({ url: '../getworks/main' }) // 跳转到发布找活页面
          } else {
            //递归调用，上传下一张
            that.uploadOneByOne(imgPaths, successUp, failUp, count, length, id);
            console.log('正在上传第' + count + '张');
          }
        }
      })
    },
  },

  watch: {
    // *********************监测计数器变化处理函数************************
    // ***如果3次添加图片,不显示添加加号,否则显示***
    // ***************************************************************
    addImageCount: function () {
      console.log(this.addImageCount)
      if (this.addImageCount >= 3) {
        this.addImageDisplay = false
      } else {
        this.addImageDisplay = true
      }
    }
  }
}
</script>

<style lang='scss'>
page {
  height: 100%;
  background-color: #f0f0f0;
  .base-info-space {
    height: 25rpx;
    background-color: #f0f0f0;
  }
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
        /*border: solid 1rpx #b1b1b1;*/
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
    // .add-Images {
    //   height: 100rpx;
    //   border: solid 1rpx #808080;
    //   background-color: #e5e5e5;
    //   width: 700rpx;
    //   margin: 0 25rpx 25rpx 25rpx;
    // }
  }
}
</style>
