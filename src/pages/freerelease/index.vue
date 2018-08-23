<template>
  <div class="content">

    <div class="top">
      <div class="top-image">
        <img style="width: 350rpx; height: 350rpx;" src="../../../resources/images/worker.png">
      </div>
      <div class="top-text">
        我是工人,让老板来找我
      </div>
      <div class="top-button">
        <button class="releaseWorkerInfo" type="primary" @click="releaseWorkerInfo">免费发布找活</button>
      </div>
    </div>

    <div class="bottom">
      <div class="bottom-image">
        <img style="width: 350rpx; height: 350rpx;" src="../../../resources/images/boss.png">
      </div>
      <div class="bottom-text">
        我是老板,让工人来找我
      </div>
      <div class="bottom-button">
        <button class="releaseWorkerInfo" type="primary" @click="releaseJobInfo">免费发布招工</button>
      </div>
    </div>    
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
  },
  methods: {
    releaseWorkerInfo () {
      console.log('免费发布找活信息****')
    },
    releaseJobInfo () {
      console.log('免费发布招工信息%%%')
    }
  }
}
</script>

<style  lang='scss'>
page {
  height: 100%;
  background-color: #f0f0f0;
  .content {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .top {
      height: 49%;
      background-color: #ffffff;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      .top-image {
      }
      .top-text {
        font-size: 35rpx;
        color: #b8b8b8;        
      }
      .top-button {
        width: 80%;
        .releaseWorkerInfo {
          background-color: #2862f9;
        }
      }
    }
    .bottom {
      height: 49%;
      background-color: #ffffff;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      .bottom-image {
      }
      .bottom-text {
        font-size: 35rpx;
        color: #b8b8b8;        
      }
      .bottom-button {
        width: 80%;
        .releaseWorkerInfo {
          background-color: #ff8040;
        }
      }
    }  
  }
}
</style>
