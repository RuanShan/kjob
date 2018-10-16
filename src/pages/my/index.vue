<template>
  <div>
    <!-- 列表单元 第一行 START -->
    <div class="first-section">
      <img class="background-img" src="../../../resources/images/bkg.jpg">
      <div class="one-colum">
        <!-- <img style="width: 160rpx; height: 160rpx;" src="/resources/headImage/姜亿万.png"> -->
        <img style="width: 160rpx; height: 160rpx;" :src="userInfoForAPI.headimgurl">
      </div>
      <div class="two-colum">
        <div class="name">
          {{userInfoForAPI.nickname}}
          <!-- 恭喜发财红包拿来8888888888888 -->
        </div>
      </div>
    </div>
    <!-- 列表单元 第一行 END -->

    <!-- 列表单元 第二行 START -->
    <div class="second-row">
      <div class="one-colum button-wrap">
        <button @click="toIDCard">
          <img style="width: 100rpx; height: 100rpx;" src="../../../resources/icon/peopleID.png">
          <icon type="success" class="weui-flex__item identified-icon" v-if="userInfoForAPI.id_num_identified_at" />
          <div class="words">身份认证</div>
        </button>
      </div>
      <div class="two-colum button-wrap">
        <button @click="toPhoneID">
          <img style="width: 100rpx; height: 100rpx;" src="../../../resources/icon/phoneID.png">
          <icon type="success" class="weui-flex__item identified-icon" v-if="userInfoForAPI.mobile_identified_at" />
          <div class="words">手机认证</div>
        </button>
      </div>
      <div class="three-colum button-wrap">
        <button open-type='share'>
          <!-- <button @click="shareButton"> -->
          <img style="width: 100rpx; height: 100rpx;" src="../../../resources/icon/share.png">
          <div class="words">分享</div>
        </button>
      </div>
    </div>
    <!-- 列表单元 第二行 END -->

    <!-- <dir>
      <input maxlength="18" type="text" placeholder="真实身份证号码填入" v-model="cardIdNum" />
      <button type="primary" @click="verifyButton" :disabled="buttonDisabled">老算法</button>
      <button type="primary" @click="checkIDCard" :disabled="buttonDisabled">新算法</button>
    </dir> -->

    <!-- 列表单元 第三行 START -->
    <div class="three-row">
      <img style="width: 300rpx; height: 300rpx;" src="../../../resources/images/WX-EWM.jpg">
    </div>
    <!-- 列表单元 第三行 END -->
  </div>
</template>

<script>

export default {
  data () {
    return {
      // userInfo: [] // 当前微信用户信息
      // ************当前用户信息需要的数据************
      userInfoForAPI: null,
      cardIdNum: '', // 用户输入的身份证号码

    }
  },

  onShareAppMessage (res) {
    return {
      title: '快来和我一起体验建筑用工小程序吧！',
      path: 'pages/index/main',
      imageUrl: 'https://api.yixingongcheng.com/wxshare2.jpg'
    }
  },


  onLoad () {
    wx.showTabBar({ animation: true })
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#4b55b6'
    })
    wx.setNavigationBarTitle({
      title: '我的'
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
    // *********************点击身份认证处理函数************************
    // ***跳转到身份证认证界面***
    // ***************************************************************
    toIDCard () {
      // 检查是否已经身份认证过了
      if (this.userInfoForAPI.id_num_identified_at != null) {
        // 提示框
        wx.showModal({
          content: '您的身份已经认证过了,无需再次认证',
          showCancel: false
        })
      } else {
        wx.navigateTo({ url: '../idcard/main' })
      }
    },

    // *********************点击手机号码认证处理函数************************
    // ***跳转到手机认证界面***
    // ***************************************************************
    toPhoneID () {
      // 检查是否已经身份认证过了
      if (this.userInfoForAPI.mobile_identified_at != null) {
        // 提示框
        wx.showModal({
          content: '您的手机已经认证过了,无需再次认证',
          showCancel: false
        })
      } else {
        wx.navigateTo({ url: '../phoneid/main' })
      }
    },
    // shareButton () {
    //   onShareAppMessage(() => {
    //     return {
    //       title: '分享',
    //       path: '/pages/index'
    //     }
    //   })
    // }
    // verifyButton () {
    //   if (this.realName === '') {
    //     console.log('姓名没有填写')
    //     // 提示框
    //     wx.showModal({
    //       content: '请填写姓名',
    //       showCancel: false
    //     })
    //     return false
    //   }
    //   if (!this.cardIdNum || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(this.cardIdNum)) {
    //     console.log('身份证号码----非非非非非非法')
    //     // 提示框
    //     wx.showModal({
    //       content: '身份证号格式错误',
    //       showCancel: false
    //     })
    //     console.log('身份证号格式错误');
    //   }
    //   else {
    //     console.log('正确');
    //   }


    // },
    // checkIDCard () {
    //   console.log('新算法');
    //   var idNum = this.cardIdNum;
    //   // alert(idNum);
    //   var errors = new Array("验证通过", "身份证号码位数不对", "身份证含有非法字符", "身份证号码校验错误",
    //     "身份证地区非法");
    //   // 身份号码位数及格式检验
    //   var re;
    //   var len = idNum.length;
    //   // 身份证位数检验
    //   if (len != 15 && len != 18) {
    //     console.log(errors[1]);
    //     // return errors[1];
    //     return false;
    //   } else if (len == 15) {
    //     re = new RegExp(/^(\d{6})()?(\d{2})(\d{2})(\d{2})(\d{3})$/);
    //   } else {
    //     re = new RegExp(/^(\d{6})()?(\d{4})(\d{2})(\d{2})(\d{3})([0-9xX])$/);
    //   }
    //   var area = {
    //     11: "北京",
    //     12: "天津",
    //     13: "河北",
    //     14: "山西",
    //     15: "内蒙古",
    //     21: "辽宁",
    //     22: "吉林",
    //     23: "黑龙江",
    //     31: "上海",
    //     32: "江苏",
    //     33: "浙江",
    //     34: "安徽",
    //     35: "福建",
    //     36: "江西",
    //     37: "山东",
    //     41: "河南",
    //     42: "湖北",
    //     43: "湖南",
    //     44: "广东",
    //     45: "广西",
    //     46: "海南",
    //     50: "重庆",
    //     51: "四川",
    //     52: "贵州",
    //     53: "云南",
    //     54: "西藏",
    //     61: "陕西",
    //     62: "甘肃",
    //     63: "青海",
    //     64: "宁夏",
    //     65: "新疆",
    //     71: "台湾",
    //     81: "香港",
    //     82: "澳门",
    //     91: "国外"
    //   }
    //   var idcard_array = new Array();
    //   idcard_array = idNum.split("");
    //   // 地区检验
    //   if (area[parseInt(idNum.substr(0, 2))] == null) {
    //     console.log(errors[4]);
    //     // return errors[4];
    //     return false;
    //   }
    //   // 出生日期正确性检验
    //   var a = idNum.match(re);
    //   if (a != null) {
    //     if (len == 15) {
    //       var DD = new Date("19" + a[3] + "/" + a[4] + "/" + a[5]);
    //       var flag = DD.getYear() == a[3] && (DD.getMonth() + 1) == a[4]
    //         && DD.getDate() == a[5];
    //     } else if (len == 18) {
    //       DD = new Date(a[3] + "/" + a[4] + "/" + a[5]);
    //       flag = DD.getFullYear() == a[3] && (DD.getMonth() + 1) == a[4]
    //         && DD.getDate() == a[5];
    //     }
    //     if (!flag) {
    //       // return false;
    //       console.log("身份证出生日期不对！");
    //       // return "身份证出生日期不对！";
    //       return false;
    //     }
    //     // 检验校验位
    //     if (len == 18) {
    //       let S = (parseInt(idcard_array[0]) + parseInt(idcard_array[10])) * 7
    //         + (parseInt(idcard_array[1]) + parseInt(idcard_array[11]))
    //         * 9
    //         + (parseInt(idcard_array[2]) + parseInt(idcard_array[12]))
    //         * 10
    //         + (parseInt(idcard_array[3]) + parseInt(idcard_array[13]))
    //         * 5
    //         + (parseInt(idcard_array[4]) + parseInt(idcard_array[14]))
    //         * 8
    //         + (parseInt(idcard_array[5]) + parseInt(idcard_array[15]))
    //         * 4
    //         + (parseInt(idcard_array[6]) + parseInt(idcard_array[16]))
    //         * 2 + parseInt(idcard_array[7]) * 1
    //         + parseInt(idcard_array[8]) * 6 + parseInt(idcard_array[9])
    //         * 3;
    //       let Y = S % 11;
    //       let M = "F";
    //       let JYM = "10X98765432";
    //       M = JYM.substr(Y, 1); // 判断校验位
    //       // 检测ID的校验位
    //       if (M == idcard_array[17]) {
    //         console.log('好像是正确了');
    //         return true;
    //       } else {
    //         console.log(errors[3]);
    //         // return errors[3];
    //         return false;
    //       }
    //     }
    //   } else {
    //     console.log(errors[2]);
    //     // return errors[2];
    //     return false;
    //   }
    //   console.log('OK');
    //   return true;
    // }

  }
}
</script>

<style lang='scss'>
page {
  height: 100%;
  background-color: #e7e7e7;
  .first-section {
    width: 750rpx;
    height: 500rpx;
    display: flex;
    flex-direction: column;
    background-color: aquamarine;
    .background-img {
      z-index: 1;
      width: 750rpx;
      height: 500rpx;
      position: absolute;
      left: 0;
      top: 0;
    }
    .one-colum {
      width: 750rpx;
      height: 90%;
      z-index: 2;
      display: flex;
      justify-content: center;
      align-items: center;
      // background-color: #0080c0;
    }
    .two-colum {
      width: 750rpx;
      height: 0%;
      margin-top:-78rpx;
      z-index: 3;
      font-size: 80rpx;
      color: #ffffff;
      display: flex;
      justify-content: center;
      align-items: center;
      // background-color: #ff80ff;
      .name {
        font-size: 40rpx;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
  .second-row {
    margin-top: 25rpx;
    width: 750prx;
    height: 220rpx;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: #ffffff;
    .one-colum {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .two-colum {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .three-colum {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .button-wrap {
      button {
        padding: 0;
        line-height: auto;
        display: inline;
        line-height: 1;
        border: none;
        background: transparent;
      }
      button::after {
        border: none;
      }
      .identified-icon {
        position: absolute;
        right: 0px;
        bottom: 20px;
      }
      .words {
        font-size: 28rpx;
      }
    }
  }
  .three-row {
    margin-top: 25rpx;
    width: 750prx;
    height: 350rpx;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: #ffffff;
  }
}
</style>
