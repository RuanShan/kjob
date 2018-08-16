<template>
  <div>
    <h1> 我是招活界面</h1>
    <button @click="getData">接收数据</button>
    <h1>{{Data}}</h1>
  </div>
</template>

<script>

export default {
  data () {
    return {
      Data: null
    }
  },

  async onLoad () {
    wx.showTabBar({ animation: true })
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#4b55b6'
    })
    wx.setNavigationBarTitle({
      title: '找活列表'
    })
  },

  methods: {
    getData () {
      console.log('开始接收数据了')
      wx.getStorage({
        key: 'abc',
        success: (res) => {
          console.log(res.data)
          this.Data = res.data
        }
      })
    }
  }
}
</script>

<style>

</style>
