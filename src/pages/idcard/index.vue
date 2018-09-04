<template>
  <div>
    <!-- 列表单元 第一行 START -->
    <div class="first-section">
      <div class="one-column">
        <div>姓</div>
        <div>名&nbsp;&nbsp;:</div>
      </div>
      <div class="two-column">
        <input class="wx-input" maxlength="8" type="text" placeholder="真实姓名填入" v-model="realName" />
      </div>
    </div>
    <!-- 列表单元 第一行 END -->

    <!-- 列表单元 第二行 START -->
    <div class="second-section">
      <div class="one-column">
        <div>身</div>
        <div>份</div>
        <div>证</div>
        <div>号&nbsp;&nbsp;:</div>
      </div>
      <div class="two-column">
        <input class="wx-input" maxlength="18" type="text" placeholder="真实身份证号码填入" v-model="cardIdNum" />
      </div>
    </div>
    <!-- 列表单元 第二行 END -->

    <!-- 列表单元 第三行 START -->
    <div class="three-section">
      <checkbox-group class="checkbox-select" @change="checkboxChange">
        <checkbox :value="cheItem.value" :checked="cheItem.checked" />{{cheItem.name}}
      </checkbox-group>
    </div>
    <!-- 列表单元 第三行 END -->

    <!-- 列表单元 第四行 START -->
    <div class="fourth-section">
      <button class="verify-button" type="primary" @click="verifyButton" :disabled="buttonDisabled">验&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;证</button>
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
import Fly from 'flyio/dist/npm/wx'

export default {
  data () {
    return {
      realName: '', // 用户输入的真实姓名
      cardIdNum: '', // 用户输入的身份证号码
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
      title: '身份证认证'
    })
  },

  methods: {
    checkboxChange (e) {
      console.log(e.mp.detail.value[0])
      this.checkBoxFlage = e.mp.detail.value[0]
    },
    // *********************点击 '验证'按钮 处理函数************************
    // ***1.判断身份证校验 , 2.姓名校验 ***
    // ******
    // ***************************************************************
    verifyButton () {
      if (this.realName === '') {
        console.log('姓名没有填写')
        // 提示框
        wx.showModal({
          content: '请填写姓名',
          showCancel: false
        })
        return false
      }
      if (!this.cardIdNum || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(this.cardIdNum)) {
        console.log('身份证号码----非非非非非非法')
        // 提示框
        wx.showModal({
          content: '身份证号格式错误',
          showCancel: false
        })
        return false
      }
      let fly = new Fly()
      fly.post(
        'https://kjob-api.firecart.cn/api/v1/wx_followers/1/identify_id_num',
        {
          id_num: this.cardIdNum,
          realname: this.realName
        })
        .then(function (response) {
          console.log('then........')
          console.log(response)
        })
        .catch(function (error) {
          console.log('catch........')
          console.log(error)
        })
    }
  },

  watch: {
    // *********************监测变化处理函数************************ 210203197611101013
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
