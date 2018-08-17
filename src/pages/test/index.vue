<template>
  <div class="content">
    <div class="circular">
      <div class="top-----half">
        <div class="one---row">
          <div class="one-row-one">
            <!-- {{city}} -->
          </div>
          <div class="one-row-two">
            <!-- {{typeOfWork}} -->
          </div>
        </div>
        <div class="two---row">
          <div class="two-row-one">

          </div>
          <div class="two-row-two">
            
          </div>
        </div>
      </div>
      <div class="bottom-----half">
        <div class="three---row">
          <div class="three-row-one weui-form-preview__labe">
            <!-- {{city}} -->
            adlfjasdf
          </div>
          <div class="three-row-two">
            {{typeOfWork}}
          </div>
        </div>
        <div class="four---row">
          <div class="four-row-one">

          </div>
          <div class="four-row-two">
            
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import base64 from '../../images/base64'
export default {
  data () {
    return {
      icon20: base64.icon20,
      icon60: base64.icon60,
      city: '广西河池', // 城市
      typeOfWork: '抹灰工', // 工种
      price: '6.5', // 价格
      worksAmount: '7万平方米', // 工程量
      state: '广西壮族自治区', // 省
      releaseTime: '2018-06-06 10:55', // 时间
      headImage: '', // 头像
      publishName: '姜亿万' // 联系人姓名
    }
  },
  async onLoad () {
  }
}
</script>

<style scoped lang='scss'>
page {
  background-color: #e2e2e2;
}
.content {
  
}
.circular {
  margin: 25rpx auto;
  background: #ffffff;
  width: 700rpx;
  height: 350rpx;
  border: 2px solid #d6d6d6;
  border-radius: 30px;
  line-height: 200px;
  display: flex;
  flex-direction: column;
  .top-----half {
    background-color: cadetblue;
    height: 50%;
    display: flex;
    flex-direction: column;
    .one---row {
      height: 60%;
      background-color:snow;
      display: flex;
      flex-direction: row;
      .one-row-one {
        width: 70%;
      }
      .one-row-two {
        width: 30%;
        background-color: blueviolet;
      }
    }
    .two---row {
      height: 40%;
      background-color:chartreuse;
      display: flex;
      flex-direction: row;
       .two-row-one {
        width: 40%;
      }
      .two-row-two {
        width: 60%;
        background-color:cornsilk;
      }
    }
  }
  .bottom-----half {
    background-color: salmon;
    height: 50%;
    display: flex;
    flex-direction: column;
    .three---row {
      height: 40%;
      background-color:snow;
      display: flex;
      flex-direction: row;
      .three-row-one {
        width: 50%;
      }
      .three-row-two {
        width: 50%;
        background-color: blueviolet;
      }
    }
    .four---row {
      height: 60%;
      background-color:chartreuse;
      display: flex;
      flex-direction: row;
       .four-row-one {
        width: 70%;
      }
      .four-row-two {
        width: 30%;
        background-color:cornsilk;
      }
    }
  }
}
</style>