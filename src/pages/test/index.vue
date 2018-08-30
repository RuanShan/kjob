<template>
  <div class="page">
    <checkbox-group @change="checkboxChange">
      <label class="weui-cell weui-check__label" v-for="(item, index) in checkboxItems" :key="index">
        <checkbox class="weui-check" :value="item.value" :checked="item.checked" />
        <div class="weui-cell__hd weui-check__hd_in-checkbox">
          <icon class="weui-icon-checkbox_circle" type="circle" size="23" v-if="!item.checked"></icon>
          <!-- <icon class="weui-icon-checkbox_success" type="success" size="23" v-if="item.checked"></icon> -->
        </div>
        <div class="weui-cell__bd">{{item.name}}</div>
      </label>
    </checkbox-group>
    <div>
      <checkbox class="weui-check" @click="che" :value="item.value" :checked="item.checked" />{{item.name}}
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      checkboxItems: [
        { name: 'standard is dealt for u.', value: '0', checked: true },
        { name: 'standard is dealicient for u.', value: '1', checked: false }
      ]
    }
  },
  methods: {
    checkboxChange (e) {
      console.log('checkbox发生change事件，携带value值为：' + e.mp.detail.value)
      let checkboxItems = this.checkboxItems
      let values = e.mp.detail.value
      for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
        checkboxItems[i].checked = false

        for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
          if (checkboxItems[i].value === values[j]) {
            checkboxItems[i].checked = true
            break
          }
        }
      }
      this.checkboxItems = checkboxItems
    },
    che () {
      console.log('adfafdaf')
    }
  }

}
</script>

<style>
.nones {
  color: red;
}
</style>