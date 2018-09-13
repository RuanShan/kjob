<template>
  <div>
    <div class="info-must">
      <div class="base-info">基本信息(必填)</div>
      <!-- 列表单元 项目名称 START -->
      <div class="my-info-list">
        <div class="one-and-two-col">
          <div class="icon">
            <img style="width: 50rpx; height: 50rpx;" src="../../../resources/icon/info-fill.png">
          </div>
          <div class="text">
            项目名称
          </div>
        </div>
        <div class="three-col">
          <input class="wx-input" maxlength="10" type="text" placeholder="如:长海县一号工程" v-model="title" />
        </div>
      </div>
      <!-- 列表单元 项目名称 END -->

      <!-- 列表单元 完工时间 START -->
      <div class="my-info-list">
        <div class="one-and-two-col">
          <div class="icon">
            <img style="width: 50rpx; height: 50rpx;" src="../../../resources/icon/info-fill.png">
          </div>
          <div class="text">
            完工时间
          </div>
        </div>
        <div>
          <picker class="weui-btn" mode="date" start="1999-01-01" end="2099-01-01" @change="startDateChange">
            <div class="three-col">
              <div class="input-choose">{{startDate}}</div>
              <div class="chose-icon">
                <img style="width: 50rpx; height: 50rpx;" src="../../../resources/icon/arrows.png">
              </div>
            </div>
          </picker>
          <picker class="weui-btn" mode="date" start="1999-01-01" end="2099-01-01" @change="endDateChange">
            <div class="three-col">
              <div class="input-choose">{{endDate}}</div>
              <div class="chose-icon">
                <img style="width: 50rpx; height: 50rpx;" src="../../../resources/icon/arrows.png">
              </div>
            </div>
          </picker>
        </div>
      </div>
      <!-- 列表单元 完工时间 END -->

      <!-- 列表单元 完工地点 START -->
      <div class="my-info-list">
        <div class="one-and-two-col">
          <div class="icon">
            <img style="width: 50rpx; height: 50rpx;" src="../../../resources/icon/info-fill.png">
          </div>
          <div class="text">
            完工地点
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
      <!-- 列表单元 完工地点 END -->

      <!-- 列表单元 经历描述 START -->
      <div class="on-and-down">
        <div class="my-info-list-2">
          <div class="one-and-two-col">
            <div class="icon">
              <img style="width: 50rpx; height: 50rpx;" src="../../../resources/icon/info-fill.png">
            </div>
            <div class="text">
              经历描述
            </div>
          </div>
        </div>
        <div class="text-array-class">
          <textarea class="text-array" @input="textAreaInput" maxlength="150" placeholder="请根据实际情况,真实地填写描述.不可发布违法信息,否则后果自负." style="height: 150rpx; background-color: #d8d8d8; width: 700rpx; margin: 0rpx 25rpx 25rpx 25rpx;" />
        </div>
      </div>
      <!-- 列表单元 经历描述 END -->

      <div class="base-info">选填信息(可不填)</div>

      <!-- 列表单元 添加施工照片 START -->
      <div class="on-and-down">
        <div class="my-info-list-2">
          <div class="one-and-two-col">
            <div class="icon">
              <img style="width: 50rpx; height: 50rpx;" src="../../../resources/icon/info-fill.png">
            </div>
            <div class="text">
              添加施工照片
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
      <!-- 列表单元 添加施工照片 END -->

      <div class="base-info"></div>

      <!-- 列表单元 免费发布招工 START -->
      <div class="skip">
        <button class="freeRelease" type="primary" @click="freeRelease">保存</button>
      </div>
      <!-- 列表单元 免费发布招工 END -->

    </div>
  </div>
</template>

<script>
import mpvuePicker from 'mpvue-picker'
import { addCustomerWork } from '../../http/api.js'

export default {
  components: {
    mpvuePicker
  },
  data () {
    return {
      userInfoForAPI: null,
      title: '', // 输入的项目名称
      startDate: '请选择',
      endDate: '请选择',
      // ************地区筛选数据************
      cityIndex: ['辽宁省', '大连市', '中山区'], // 默认选中的省市区
      district_fullname: '请选择', // 用户选择的省市区,和在页面中显示的作用
      description: '', // 经历描述 输入
      // ************图片预览数据************
      files: [], // 图片保存位置
      addImageDisplay: true, // 图片添加显示开关
      addImageCount: 0, // 图片组的每个小照片的添加计数器
      returnPageData: { // 返回给我的找活页面数据对象
        count: 0, // 保存按钮点击的计数器
        imagesArray: [], // 图片保存API返回图片地址数组
      }
    }
  },

  async onLoad (option) {
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#4b55b6'
    })
    wx.setNavigationBarTitle({
      title: '我的经验'
    })
    wx.setBackgroundColor({
      backgroundColor: '#F0F0F0' // 窗口的背景色为灰色
    })
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
    // ********************开始时间选择处理函数*****************************
    startDateChange (e) {
      console.log('选中的日期为：' + e.mp.detail.value)
      this.startDate = e.mp.detail.value
    },

    // ********************结束时间选择处理函数*****************************
    endDateChange (e) {
      console.log('选中的日期为：' + e.mp.detail.value)
      this.endDate = e.mp.detail.value
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

    // ************找活描述中,textArray 输入处理函数***************
    textAreaInput (e) {
      console.log(e.target.value)
      this.description = e.target.value
    },

    // *********************点击添加图片处理函数************************
    // ***把图片添加到files[]中,成功后把图片添加的计数器加一***
    // ***************************************************************
    chooseImage (e) {
      let _this = this
      wx.chooseImage({
        sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
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
      this.files.splice(this.files.findIndex(item => item.id === index), 1)
      this.addImageCount--
    },

    // 免费发布找活按钮点击处理函数-----跳转到找活页面
    freeRelease () {
      console.log('保存,我的经验')
      if (this.title === '' || this.startDate === '请选择' || this.endDate === '请选择' || this.district_fullname === '请选择' || this.description === '') {
        wx.showModal({
          content: '请填入必填信息,方能提交保存!',
          showCancel: false
        })
      } else {
        let customer_work = this.dataFormat();
        // 添加工作经验API
        addCustomerWork({ customer_work }).then((res) => {
          console.log('addCustomerWork res = ', res);
          // 如果添加了图片,上传图片
          if (this.files.length !== 0) {
            let successUp = 0; //成功
            let failUp = 0; //失败
            let length = this.files.length; //总数
            let count = 0; //第几张
            let id = res.id; // API 需要的 id
            this.uploadOneByOne(this.files, successUp, failUp, count, length, id) // 上传图片
          }
        }).catch((err) => { console.log(err); })
        this.returnPageData.count++ // 点击了几次保存按钮的计数器
        // 1.把API的图片地址存起来; 2.把计算器加1,保存起来
        wx.setStorage({
          key: 'experienseItem',
          data: this.returnPageData,
          success: () => {
            console.log('experienseItem 存储成功了!!!')
          },
          fail: () => {
            console.log('experienseItem 存储失败了*******')
          }
        })
        wx.redirectTo({ url: '../releasemy/main' }) // 跳转到发布找活页面
      }
    },

    // To API 数据格式化
    dataFormat () {
      let customer_work = {}
      customer_work.name = this.title
      customer_work.start_at = this.startDate
      customer_work.end_at = this.endDate
      customer_work.description = this.description
      customer_work.district_fullname = this.district_fullname
      customer_work.customer_id = this.userInfoForAPI.customer_id
      return customer_work
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
        url: 'https://tapi.getstore.cn/api/v1/images/', //
        filePath: imgPaths[count],
        name: 'image[attachment]',  //示例，使用顺序给文件命名
        formData: { 'image[customer_work_id]': id },
        success: (e) => {
          successUp++;//成功+1
          console.log('上传成功' + successUp);
          console.log('uploadFile success e = ', e);
          // 每次成功都要把API返回的地址保存
          console.log(e.data.original_url); // 
          //????????? 第一个问题:  不知道为什么 undefined 
          //????????? 第二个问题:  我希望在uploadOneByOne()后把数据保存起来给后面的页面使用,但是,这是个异步操作,停不下来.不知道该如何了?
          //
          this.returnPageData.imagesArray.push(e.data.original_url)
          wx.setStorage({
            key: 'experienseItem',
            data: this.returnPageData,
            success: () => {
              console.log('experienseItem 存储成功了!!!')
            },
            fail: () => {
              console.log('experienseItem 存储失败了*******')
            }
          })
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
    // ***如果3次添加图片,不显示添加加号,否则显示***ffffff
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
  .base-info {
    font-size: 25rpx;
    margin: 10rpx 25rpx;
  }
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
          width: 320rpx;
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
      .image-upload {
        height: 300rpx;
        background-color: #e3e3e3;
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
