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
      <checkbox-group @click="checkboxChange">
        <label class="checkbox" v-for="item in items" :key="item">
          <checkbox :value="item.name" :checked="item.checked" />{{item.value}}
        </label>
      </checkbox-group>
    </div>
    <!-- 列表单元 第三行 END -->
  </div>
</template>

<script>

export default {
  data () {
    return {
      realName: '', // 用户输入的真实姓名
      cardIdNum: '', // 用户输入的身份证号码
      items: [
        { name: 'CHN', value: '中国', checked: 'false' }
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
      title: '身份证认证'
    })
  },

  methods: {
    checkboxChange: function (e) {
      console.log(e)
      // console.log('checkbox发生change事件，携带value值为：', e.detail.value)
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
  }
}
</style>
