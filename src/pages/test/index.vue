<template>
  <div class="mpvue-picer">
    <button @click="showPickerForTime">single mpvuePickerForTime</button>
    <mpvue-picker ref="mpvuePickerForTime" :mode="modeForTime" :pickerValueDefault="pickerTimeDefault" :deepLength="deepLengthForTime" @onConfirm="onConfirmForTime" @onCancel="onCancelForTime" :pickerValueArray="pickerTimeArray"></mpvue-picker>
  </div>
</template>

<script>
import mpvuePicker from 'mpvue-picker';
export default {
  data () {
    return {
      modeForTime: 'selector',
      pickerTimeDefault: [0],
      deepLengthForTime: 1,
      pickerTimeArray: [
        {
          label: '15天',
          value: 0
        },
        {
          label: '30天',
          value: 1
        },
        {
          label: '60天',
          value: 2
        }
      ],
    };
  },
  components: { mpvuePicker },
  methods: {
    showPickerForTime () {
      this.$refs.mpvuePickerForTime.show();
    },
    onConfirmForTime (e) {
      console.log(e);
    },
    onCancelForTime (e) {
      console.log(e);
      
    }
  }
};
</script>

<style>
</style>
