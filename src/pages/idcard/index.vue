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
      <label>
        <checkbox-group class="checkbox-select" @change="checkboxChange">
          <checkbox :value="cheItem.value" :checked="cheItem.checked" />{{cheItem.name}}
        </checkbox-group>
      </label>
    </div>
    <!-- 列表单元 第三行 END -->

    <!-- 列表单元 第四行 START -->
    <div class="fourth-section">
      <button class="verify-button" type="primary" @click="verifyButton" :disabled="buttonDisabled">验&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;证</button>
    </div>
    <!-- 列表单元 第四行 END -->

    <!-- 列表单元 第四行 START -->
    <div class="fifth">
      <div v-html="exceptions">
      </div>
    </div>
    <!-- 列表单元 第四行 END -->
  </div>
</template>

<script>
import {
  identifyIdnum
} from '../../http/api.js'
import { noDuty } from '../../store/noduty.js'

export default {
  data () {
    return {
      // ************当前用户信息需要的数据************
      userInfoForAPI: null,

      realName: '', // 用户输入的真实姓名
      cardIdNum: '', // 用户输入的身份证号码
      cheItem: { name: '阅读并同意以下条款', value: 1, checked: false }, // checkBox的数据
      buttonDisabled: true, // 按钮是否可以的控制开关
      exceptions: noDuty,
      checkBoxFlage: undefined // watch函数通过这个数值来决定是否让按钮可用
    }
  },

  onLoad () {
    wx.showTabBar({ animation: true })
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#4b55b6'
    })
    wx.setNavigationBarTitle({
      title: '身份证认证'
    })
  },

  onShow () {
    wx.getStorage({
      key: 'userInfoForAPI',
      success: (res) => {
        console.log('userInfoForAPI 获取成功了!!!')
        this.userInfoForAPI = res.data
      }
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
      if (this.checkIDCard() === false) {
        console.log('身份证号码----非非非非非非法')
        // 提示框
        wx.showModal({
          content: '身份证号格式错误,重新输入',
          showCancel: false
        })
        return false
      }
      let data = {
        id_num: this.cardIdNum,
        realname: this.realName
      }
      // API 函数 身份证验证
      identifyIdnum(this.userInfoForAPI.id, data).then((response) => {
        console.log('then........')
        console.log(response)
        // 成功认证
        if (response.id) {
          // 把当前用户微信数保和KJob用户信息保存到全局变量userInfoForAPI中
          wx.setStorage({
            key: 'userInfoForAPI',
            data: response,
            success: (res) => {
              console.log('setStorage data 后得 res = ', res);
              console.log('userInfoForAPI 存储成功了!!!')
            },
            fail: () => {
              console.log('userInfoForAPI 存储失败了*******')
            }
          })
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 2000
          })
          // 跳转到上一个页面
          wx.navigateBack({ delta: 1 })
        }
      }).catch((error) => {
        console.log('catch........')
        console.log(error)
        // 提示框
        wx.showModal({
          content: '认证未通过,请重新检查!',
          showCancel: false
        })
      })
    },
    //****************身份证验证新算法***************** */
    checkIDCard () {
      console.log('新算法');
      var idNum = this.cardIdNum;
      // alert(idNum);
      var errors = new Array("验证通过", "身份证号码位数不对", "身份证含有非法字符", "身份证号码校验错误",
        "身份证地区非法");
      // 身份号码位数及格式检验
      var re;
      var len = idNum.length;
      // 身份证位数检验
      if (len != 15 && len != 18) {
        console.log(errors[1]);
        // return errors[1];
        return false;
      } else if (len == 15) {
        re = new RegExp(/^(\d{6})()?(\d{2})(\d{2})(\d{2})(\d{3})$/);
      } else {
        re = new RegExp(/^(\d{6})()?(\d{4})(\d{2})(\d{2})(\d{3})([0-9xX])$/);
      }
      var area = {
        11: "北京",
        12: "天津",
        13: "河北",
        14: "山西",
        15: "内蒙古",
        21: "辽宁",
        22: "吉林",
        23: "黑龙江",
        31: "上海",
        32: "江苏",
        33: "浙江",
        34: "安徽",
        35: "福建",
        36: "江西",
        37: "山东",
        41: "河南",
        42: "湖北",
        43: "湖南",
        44: "广东",
        45: "广西",
        46: "海南",
        50: "重庆",
        51: "四川",
        52: "贵州",
        53: "云南",
        54: "西藏",
        61: "陕西",
        62: "甘肃",
        63: "青海",
        64: "宁夏",
        65: "新疆",
        71: "台湾",
        81: "香港",
        82: "澳门",
        91: "国外"
      }
      var idcard_array = new Array();
      idcard_array = idNum.split("");
      // 地区检验
      if (area[parseInt(idNum.substr(0, 2))] == null) {
        console.log(errors[4]);
        // return errors[4];
        return false;
      }
      // 出生日期正确性检验
      var a = idNum.match(re);
      if (a != null) {
        if (len == 15) {
          var DD = new Date("19" + a[3] + "/" + a[4] + "/" + a[5]);
          var flag = DD.getYear() == a[3] && (DD.getMonth() + 1) == a[4]
            && DD.getDate() == a[5];
        } else if (len == 18) {
          DD = new Date(a[3] + "/" + a[4] + "/" + a[5]);
          flag = DD.getFullYear() == a[3] && (DD.getMonth() + 1) == a[4]
            && DD.getDate() == a[5];
        }
        if (!flag) {
          // return false;
          console.log("身份证出生日期不对！");
          // return "身份证出生日期不对！";
          return false;
        }
        // 检验校验位
        if (len == 18) {
          let S = (parseInt(idcard_array[0]) + parseInt(idcard_array[10])) * 7
            + (parseInt(idcard_array[1]) + parseInt(idcard_array[11]))
            * 9
            + (parseInt(idcard_array[2]) + parseInt(idcard_array[12]))
            * 10
            + (parseInt(idcard_array[3]) + parseInt(idcard_array[13]))
            * 5
            + (parseInt(idcard_array[4]) + parseInt(idcard_array[14]))
            * 8
            + (parseInt(idcard_array[5]) + parseInt(idcard_array[15]))
            * 4
            + (parseInt(idcard_array[6]) + parseInt(idcard_array[16]))
            * 2 + parseInt(idcard_array[7]) * 1
            + parseInt(idcard_array[8]) * 6 + parseInt(idcard_array[9])
            * 3;
          let Y = S % 11;
          let M = "F";
          let JYM = "10X98765432";
          M = JYM.substr(Y, 1); // 判断校验位
          // 检测ID的校验位
          if (M == idcard_array[17]) {
            console.log('好像是正确了');
            return true;
          } else {
            console.log(errors[3]);
            // return errors[3];
            return false;
          }
        }
      } else {
        console.log(errors[2]);
        // return errors[2];
        return false;
      }
      console.log('OK');
      return true;
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
