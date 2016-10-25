<template>
  <div id="app">

    <toolbar></toolbar>
    <list></list>
    <editor></editor>
  </div>
</template>

<script>
import toolbar from './components/toolbar.vue'
import list from './components/list.vue'
import editor from './components/editer.vue'
export default {
  name: 'app',
  components: {
    toolbar,
    list,
    editor
  }
}
</script>

<style>
@font-face {
  font-family: 'iconfont';
  src: url('//at.alicdn.com/t/font_1477213997_7251806.eot'); /* IE9*/
  src: url('//at.alicdn.com/t/font_1477213997_7251806.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
  url('//at.alicdn.com/t/font_1477213997_7251806.woff') format('woff'), /* chrome、firefox */
  url('//at.alicdn.com/t/font_1477213997_7251806.ttf') format('truetype'), /* chrome、firefox、opera、Safari, Android, iOS 4.2+*/
  url('//at.alicdn.com/t/font_1477213997_7251806.svg#iconfont') format('svg'); /* iOS 4.1- */
}
html, body{
  padding: 0;
  margin: 0;
  height: 100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  line-height: 3;
}

a {
  color: #42b983;
}
</style>
