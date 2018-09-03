<template>
  <div class="page">
    <button @click="netTestGet">网络测试-get</button>
    <button @click="netTestPost">网络测试-post</button>
  </div>
</template>

<script>
import Fly from 'flyio/dist/npm/wx'
export default {
  data () {
    return {

    }
  },
  methods: {
    netTestGet () {
      let fly = new Fly()
      fly.get('https://www.easy-mock.com/mock/5b409280aedea31f953c7898/test/weixin')
        .then(function (response) {
          console.log(response)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    netTestPost () {
      let fly = new Fly()
      fly.post('https://www.easy-mock.com/mock/5b409280aedea31f953c7898/test/test')
        .then(function (response) {
          console.log(response)
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}
</script>

<style>
</style>