<template>
  <div id="app">
    <github></github>
  </div>
</template>

<script>
import github from './components/github.vue'
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components: {github}
}
</script>

<style>
@font-face {
  font-family: 'iconfont';
  src: url('./assets/font/iconfont.eot?t=1477057082'), /* IE9*/
  url('./assets/font/iconfont.woff?t=1477057082') format('woff'), /* chrome, firefox */
  url('./assets/font/iconfont.ttf?t=1477057082') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/
  url('./assets/font/iconfont.svg?t=1477057082#iconfont') format('svg'); /* iOS 4.1- */
}

#app {
  font-family: cursive, '微软雅黑';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 700px;
  min-height: 300px;
  margin: 20px auto;
  padding: 20px;
  box-sizing: border-box;
}

</style>
