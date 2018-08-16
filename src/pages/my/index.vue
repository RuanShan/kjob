<template>
  <div>
    <h1> 我的</h1>
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
      title: '我的'
    })
  }
}
</script>

<style>

</style>
