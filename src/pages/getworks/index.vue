<template>
  <div>
    <picker class="position-select" mode="region" :value="region" @change="CityChange">
      <button type="default">城市选择器</button>
    </picker>
  </div>
</template>

<script>

export default {
  data () {
    return {
      region: ['广东省', '广州市', '海珠区']
    }
  },

  async onLoad () {
    wx.showTabBar({ animation: true })
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#4b55b6'
    })
    wx.setNavigationBarTitle({
      title: '招工列表'
    })
  },

  methods: {
    setData (ev) {
      console.log('开始发送 了!!!')
      console.log(ev)
      wx.setStorage({
        key: 'abc',
        data: 'hello WX !!!'
      })
      console.log('发送完毕了!!!')
    },
    CityChange (e) {
      console.log('选中的城市为：' + e.mp.detail.value)
    }
  }
}
</script>

<style>
.position-select {
  width: 50%;
}
</style>
