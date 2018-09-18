<template>
  <div>
    <!-- 列表单元 第一行 START -->
    <div class="first-section">
      <div class="one-column">
        <input class="wx-input" maxlength="11" type="number" placeholder="请填当前手机号码" v-model="phoneNum" />
      </div>
      <div class="two-column">
        <button class="verify-phone" type="default" @click="freeGetverifyCode" :disabled="getCodeButtonDis">{{getCode}}</button>
      </div>
    </div>
    <!-- 列表单元 第一行 END -->

    <!-- 列表单元 第二行 START -->
    <div class="second-section">
      <div class="one-column">
        <div>验</div>
        <div>证</div>
        <div>号&nbsp;&nbsp;:</div>
      </div>
      <div class="two-column">
        <input class="wx-input" maxlength="6" type="number" placeholder="收到的短信验证码" v-model="inputVerifyCode" />
      </div>
    </div>
    <!-- 列表单元 第二行 END -->

    <!-- 列表单元 第三行 START -->
    <div class="three-section">
      <label>
        <checkbox-group class="checkbox-select" @change="checkboxChange">
          <checkbox :value="cheItem.value" :checked="cheItem.checked" />{{cheItem.name}}
        </checkbox-group>
      </label>
    </div>
    <!-- 列表单元 第三行 END -->

    <!-- 列表单元 第四行 START -->
    <div class="fourth-section">
      <button class="verify-button" type="primary" @click="veriryButton" :disabled="buttonDisabled">验&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;证</button>
    </div>
    <!-- 列表单元 第四行 END -->

    <!-- 列表单元 第四行 START -->
    <div class="fifth">
      <div>
        {{exceptions}}
      </div>
    </div>
    <!-- 列表单元 第四行 END -->
  </div>
</template>

<script>
import {
  identifyMobile,
  getVerifyCode
} from '../../http/api.js'

export default {
  data () {
    return {
      phoneNum: null, // 用户输入的手机号码
      getCode: '免费获取验证码', // 1.显示字样; 2.点击按钮后计时,并显示时间
      getCodeButtonDis: false, // 免费获取验证吗按钮是否禁用开关
      timeNum: 60, // 时间计时
      verifyCode: '', // 用户输入的收到的验证码
      inputVerifyCode: '', // 用户输入的校验码
      cheItem: { name: '阅读并同意以下条款', value: 1, checked: false }, // checkBox的数据
      buttonDisabled: true, // 按钮是否可以的控制开关
      exceptions: '免责条款免责条款免责条款免责条款免责条款免责条款免责条款免责条款免责条款免责条款免责条款免责条款免责条款免责条款免责条款免责条款免责条款免责条款免责条款免责条款免责条款免责条款免责条款免责条款免责条款免责条款免责条款免责条款免责条款免责条款免责条款免责条款免责条款免责条款免责条款免责条款免责条款免责条款免责条款免责条款免责条款免责条款免责条款免责条款免责条款免责条款免责条款免责条款免责条款免责条款免责条款免责条款免责条款免责条款免责条款免责条款免责条款免责条款免责条款免责条款免责条款免责条款免责条款免责条款免责条款免责条款免责条款免责条款免责条款免责条款免责条款免责条款免责条款免责条款免责条款免责条款免责条款免责条款免责条款免责条款免责条款免责条款免责条款免责条款免责条款免责条款免责条款免责条款免责条款免责条款免责条款免责条款免责条款免责条款免责条款免责条款',
      checkBoxFlage: undefined // watch函数通过这个数值来决定是否让按钮可用
    }
  },

  async onLoad () {
    wx.showTabBar({ animation: true })
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#4b55b6'
    })
    wx.setNavigationBarTitle({
      title: '手机认证'
    })
  },

  methods: {
    // *********************点击验证按钮处理函数************************
    // ***用户输入的code和从kjob收到的code比较,相同->跳转;不同->弹窗***
    // ***************************************************************
    checkboxChange (e) {
      console.log(e);
      console.log(e.mp.detail.value[0])
      this.checkBoxFlage = e.mp.detail.value[0]
    },
    // *********************点击免费获取验证码处理函数************************
    // ***1.判断有没有电话号码: 1.1: 如果有->验证手机号码是否合法; 1.2: 如果没有->弹框***
    // ***1.1.1: 合法 提交到kjob server,得到code; 1.1.2: 不合法->弹窗***
    // ***************************************************************
    freeGetverifyCode () {
      // 手机号码规则
      let phoneReg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/
      let returnTimer = null
      console.log('点击了按钮')
      if (this.phoneNum !== null) { // 不为空,用户填写了数字
        if (phoneReg.test(this.phoneNum)) { // 根据规则校验
          console.log('手机号码----合法')

          // 访问kjob-server给从微信server得到的code和userInfo数据
          let data = { mobile: this.phoneNum }
          getVerifyCode(data).then((response) => {
            console.log('收到的response = ', response)
            if( response.ret == 1){
              //验证码获取成功
              console.log('获取手机验证码成功')
            }
            // console.log('根据手机号码得到的kjob的校验码 = ', response.code)
            //this.verifyCode = response.sms.code
          }).catch(function (error) {
            console.log('获取手机验证码失败 = ', error)
          })

          // 禁用,计时,然后变字样
          this.getCodeButtonDis = true // 免费获取验证码按钮禁用
          returnTimer = setInterval(() => {
            this.timeNum--
            this.getCode = "" + this.timeNum + "秒后重发"
            console.log(this.getCode);
            if (this.timeNum === 0) {
              this.getCodeButtonDis = false // 免费获取验证码按钮打开
              this.getCode = '免费获取验证码'
              this.timeNum = 60
              clearInterval(returnTimer)
            }
          }, 1000)
        } else { // 非法号码
          console.log('手机号码----非非非非非非法')
          // 提示框
          wx.showModal({
            content: '输入的手机号码非法,请重新输入',
            showCancel: false
          })
        }
      } else { // 电话号码为空
        // 提示框
        wx.showModal({
          content: '请填入当前手机号码',
          showCancel: false
        })
      }
    },
    // *********************点击 '验证'按钮 处理函数************************
    // ***1.判断验证号是否填写,没有填写弹窗,填写判读是否一致***
    // ******
    // ***************************************************************
    veriryButton () {
      if (this.inputVerifyCode.length < 6) {
        // 提示框
        wx.showModal({
          content: '验证码长度不正确',
          showCancel: false
        })
      } else {
        // 验证码正确 -> 1.跳转; 2.存入状态
        identifyMobile({mobile: this.phoneNum, code: this.inputVerifyCode}).then((res)=>{
          //返回 WxFollower, 需要更新storeage
          if (res.id) {
            wx.navigateBack({ delta: 1 })
          } else {
            // 提示框
            wx.showModal({
              content: '请输入正确的验证码',
              showCancel: false
            })
          }

        })
      }
    }
  },

  watch: {
    // *********************监测变化处理函数************************
    // ***变化来源于checkbox处理函数,如果=1 => 说明已经选择了checkbox,如果=undefined => 说明没有选中***
    // ***************************************************************
    checkBoxFlage: function () {
      if (this.checkBoxFlage === '1') {
        this.buttonDisabled = false // 按钮允许
        this.cheItem.checked = true // 确保checkbox为选中
      }
      if (this.checkBoxFlage === undefined) {
        this.buttonDisabled = true
        this.cheItem.checked = false
      }
    }
  }
}
</script>

<style lang='scss'>
page {
  height: 100%;
  background-color: #e7e7e7;
  .first-section {
    width: 100%;
    height: 100rpx;
    background-color: #ffffff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .one-column {
      // width: 30%;
      // height: 108%;
      // padding: 25rpx;
      // display: flex;
      // justify-content: space-between;
      // align-items: center;
      // background-color: #ff80ff;
      margin: 25rpx;
      .wx-input {
        border: solid 1rpx #d8d8d8;
        width: 326rpx;
      }
    }
    .two-column {
      // width: 70%;
      // height: 100%;
      // padding: 25rpx;
      // display: flex;
      // align-items: center;
      // // background-color: #80ffff;
      margin: 25rpx;
      .verify-phone {
        height: 86rpx;
      }
    }
  }
  .second-section {
    margin-top: 25rpx;
    width: 100%;
    height: 100rpx;
    background-color: #ffffff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .one-column {
      width: 30%;
      height: 108%;
      padding: 25rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      // background-color: #ff80ff;
    }
    .two-column {
      width: 70%;
      height: 100%;
      padding: 25rpx;
      display: flex;
      align-items: center;
      // background-color: #80ffff;
      .wx-input {
        border: solid 1rpx #d8d8d8;
        width: 457rpx;
      }
    }
  }
  .three-section {
    margin-top: 25rpx;
    width: 100%;
    height: 100rpx;
    background-color: #ffffff;
    display: flex;
    align-items: center;
    .checkbox-select {
      margin-left: 25rpx;
    }
  }
  .fourth-section {
    margin-top: 25rpx;
    width: 100%;
    // height: 100rpx;
    background-color: #ffffff;
    display: flex;
    align-items: center;
    .verify-button {
      height: 86rpx;
      width: 700rpx;
      // background-color: #2862f9;
      margin: 25rpx 25rpx;
      color: #ffffff;
    }
  }
  .fifth {
    margin: 25rpx;
  }
}
</style>
