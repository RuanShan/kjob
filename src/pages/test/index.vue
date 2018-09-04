<template>
  <div class="page">
    <button @click="netTestGet">得到用工分类数据</button>
    <button @click="showPickerForJob">用工分类mpvuePicker</button>
    <mpvue-picker ref="mpvuePickerForJob" :mode="modeForJob" :deepLength="deepLengthForJob" :pickerValueDefault="pickerJobDefault" @onChange="onChangeForJob" @onConfirm="onConfirmForJob" @onCancel="onCancelForJob" :pickerValueArray="pickerJobArray"></mpvue-picker>
  </div>
</template>

<script>
import { getJobTaxonTree } from '@/http/api.js'
import mpvuePicker from 'mpvue-picker'

export default {
  components: {
    mpvuePicker
  },
  data () {
    return {
      modeForJob: 'multiLinkageSelector',
      pickerJobArray: [],
      pickerJobDefault: [1],
      deepLengthForJob: 2
    }
  },
  methods: {
    netTestGet () {
      getJobTaxonTree().then(res => {
        console.log(res)
        this.pickerJobArray = res
      })
    },
    showPickerForJob () {
      this.$refs.mpvuePickerForJob.show();
    },
    onConfirmForJob (e) {
      console.log(e);
    },
    onChangeForJob (e) {
      console.log(e);
    },
    onCancelForJob (e) {
      console.log(e);
    }
  }
}
</script>

<style>
</style>