<template>
  <div>
    <div class="circular" v-for="item in jobList" :key="item" @click="detail">
      <div class="top-----half">
        <div class="one---row">
          <div class="one-row-one">
            {{item.city}}&nbsp;&nbsp;招&nbsp;-&nbsp;{{item.typeOfWork}}
          </div>
          <div class="one-row-two">
            <div class="typeOfWork">
              &nbsp;{{item.typeOfWork}}&nbsp;
            </div>
          </div>
        </div>
        <div class="two---row">
          <div class="two-row-one">
            价格:&nbsp;&nbsp;&nbsp;&nbsp;
            <div class="price">
              &nbsp;&nbsp;{{item.price}}
            </div>
          </div>
          <div class="two-row-two">
            工程量:
            <div class="worksAmount">
              &nbsp;&nbsp;{{item.worksAmount}}
            </div>
          </div>
        </div>
      </div>
      <div class="bottom-----half">
        <div class="three---row">
          <div class="three-row-one">
            <img style="width: 40rpx; height: 40rpx;" src="../../../resources/icon/location.png">
            {{item.state}}&nbsp;&nbsp;-&nbsp;&nbsp;{{item.city}}
          </div>
          <div class="three-row-two">
            <img style="width: 40rpx; height: 40rpx;" src="../../../resources/icon/dateTime.png">
            {{item.releaseTime}}
          </div>
        </div>
        <div class="four---row">
          <div class="four-row-one">
            <div class="image">
              <img style="width: 60rpx; height: 60rpx;" src="../../../resources/headImage/姜亿万.png">
            </div>
              <div class="publishName">
                &nbsp;&nbsp;联系人&nbsp;&nbsp;-&nbsp;&nbsp;{{item.publishName}}
              </div>
          </div>
          <div class="four-row-two">
            查看详情 >
          </div>
        </div>
      </div>
    </div>
  </div>
    
</template>

<script>
export default {
  data () {
    return {
      jobList: [{
        city: '广西河池', // 城市
        typeOfWork: '抹灰工', // 工种
        price: '6.5', // 价格
        worksAmount: '7万平方米', // 工程量
        state: '广西壮族自治区', // 省
        releaseTime: '2018-06-06 10:55', // 时间
        headImage: '', // 头像
        publishName: '姜亿万' // 联系人姓名
      },
      {
        city: '广西河池', // 城市
        typeOfWork: '抹灰工', // 工种
        price: '6.5', // 价格
        worksAmount: '7万平方米', // 工程量
        state: '广西壮族自治区', // 省
        releaseTime: '2018-06-06 10:55', // 时间
        headImage: '', // 头像
        publishName: '姜亿万' // 联系人姓名
      },
      {
        city: '广西河池', // 城市
        typeOfWork: '抹灰工', // 工种
        price: '6.5', // 价格
        worksAmount: '7万平方米', // 工程量
        state: '广西壮族自治区', // 省
        releaseTime: '2018-06-06 10:55', // 时间
        headImage: '', // 头像
        publishName: '姜亿万' // 联系人姓名
      },
      {
        city: '广西河池', // 城市
        typeOfWork: '抹灰工', // 工种
        price: '6.5', // 价格
        worksAmount: '7万平方米', // 工程量
        state: '广西壮族自治区', // 省
        releaseTime: '2018-06-06 10:55', // 时间
        headImage: '', // 头像
        publishName: '姜亿万' // 联系人姓名
      }
      ] // 招工列表数据
    }
  },
  async onLoad () {
    wx.setBackgroundColor({
      backgroundColor: '#dadada'
    })
  },
  methods: {
    // 点击展开详情
    detail () {
      console.log('Detail !!!')
    }
  }
}
</script>

<style scoped lang='scss'>
// page {
//   background-color: #dadada;
// }
.circular {
  margin: 25rpx auto;
  background: #ffffff;
  width: 700rpx;
  height: 350rpx;
  border: 2px solid #d6d6d6;
  border-radius: 30rpx;
  // line-height: 200px;
  display: flex;
  flex-direction: column;
  .top-----half {
    // background-color: cadetblue;
    height: 50%;
    display: flex;
    flex-direction: column;
    .one---row {
      height: 60%;
      // background-color:snow;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content:space-between;
      .one-row-one {
        // width: 70%;
        padding-left: 25rpx;
        font-size: 50rpx;
        font-weight: bold;
      }
      .one-row-two {
        // margin-right: 25rxp;
        padding-right: 25rpx;
        // border-radius: 30rpx;
        // width: 30%;
        // background-color: blueviolet;
        .typeOfWork {
          font-size: 35rpx;
          border-radius: 30rpx;
          background-color: #97cbff;
           border: 1px solid #808080;
        }
      }
    }
    .two---row {
      height: 40%;
      // background-color:chartreuse;
      display: flex;
      flex-direction: row;
      justify-content:space-between;
      align-items: center;
       .two-row-one {
        padding-left: 25rpx;
        display: flex;
        .price {
          color: #fc0a77;
        }
      }
      .two-row-two {
        // width: 60%;
        // background-color:cornsilk;
        padding-right: 25rpx;
        display: flex;
        .worksAmount {
          color: #fc0a77;
        }
      }
    }
  }
  .bottom-----half {
    // background-color: salmon;
    height: 50%;
    display: flex;
    flex-direction: column;
    .three---row {
      height: 40%;
      // background-color:snow;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content:space-between;
      font-size: 25rpx;
      color: #808080;
      .three-row-one {
        padding-left: 25rpx;
        // width: 50%;
      }
      .three-row-two {
        padding-right: 25rpx;
        // width: 50%;
        // background-color: blueviolet;
      }
    }
    .four---row {
      height: 60%;
      padding-left: 25rpx;
      padding-right: 25rpx;
      // background-color:chartreuse;
      border-top: solid 1rpx #b8b8b8;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content:space-between;
       .four-row-one {
        display: flex;
        align-items: center;
        // width: 70%;
      }
      .four-row-two {
        font-size: 25rpx;
        color: #c0c0c0;
        // width: 30%;
        // background-color:cornsilk;
      }
    }
  }
}
</style>