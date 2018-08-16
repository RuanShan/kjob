<template>
  <div>
    <h1> 免费发布</h1>
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
      title: '免费发布'
    })
  }
}
</script>

<style>

</style>
