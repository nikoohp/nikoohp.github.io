<template>
  <div id="github">
    <header>
      <h1><i class="icon icon-github"></i>GitHub文件浏览器</h1>
      <label for="repo">Full Repo Name: </label>
      <input type="text" name='repo' placeholder='vuejs/vue' v-model='fullRepoName' @keyup.enter='getData'>
      <input type="button" value="获取" @click='getData'>
    </header>
    <file-list :userName='userName' :repoName='repoName'></file-list>
  </div>
</template>
<script>
import fileList from './fileList.vue'
export default {
  name: 'github',
  data () {
    return {
      fullRepoName: '',
      repoName: '',
      userName: ''
    }
  },
  components: {
    fileList: fileList
  },
  computed: {

  },
  methods: {
    getData: function () {
      this.userName = this.fullRepoName.split('/').slice(0, 1) + ''
      this.repoName = this.fullRepoName.split('/').slice(1) + ''
    }
  }
}
</script>
<style>
header{
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
}
h1{
  border-bottom: 2px solid #eee;
  padding-bottom: 12px;
}
.icon{
  display: inline-block;
  font-family: 'iconfont';
  font-style: normal;
  margin-right: 16px;
}
.icon-github::after{
  content: '\e602';
}
input[type='text']{
  border: 1px solid #ccc;
  border-radius: 3px;
  box-shadow: inset 0 1px 2px 0 #ccc;
  padding-left: 10px;
  margin-left: 8px;
  line-height: 2.2;
  outline: none;
}
input[type='button']{
  background-color: #27608f;
  color: #fff;
  border: 1px solid #27608f;
  outline: none;
  line-height: 2.2;
  padding: 0 20px;
  cursor: pointer;
  border-radius: 3px;
}
</style>