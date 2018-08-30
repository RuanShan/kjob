<template>
  <div>
    <!-- 列表单元 第一行 START -->
    <div class="first-section">
      <div class="one-row">

      </div>
      <div class="two-row">

      </div>
    </div>
    <!-- 列表单元 第一行 END -->

    <!-- 列表单元 第二行 START -->
    <div class="second-row">

    </div>
    <!-- 列表单元 第二行 END -->

    <!-- 列表单元 第三行 START -->
    <div class="three-row">
    </div>
    <!-- 列表单元 第三行 END -->
  </div>
</template>

<script>

export default {
  data () {
    return {
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
  }
}
</script>

<style lang='scss'>
page {
  height: 100%;
  background-color: #e7e7e7;
  .first-section {
    width: 100%;
    height: 200rpx;
    background-color: #ffffff;
    justify-content: space-between;
    align-items: center;
    .one-row {
      width: 30%;
      height: 100%;
      background-color: #ff80ff;
    }
    .two-row {
      width: 70%;
      height: 100%;
      background-color: #80ffff;
    }
  }
  .second-row {
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
