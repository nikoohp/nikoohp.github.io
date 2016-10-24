<template>
  <div id="filelist">
    <dl>
      <dt>当前路径：<a href="javascript:;" v-if='path!="/"' @click='changePath(path.slice(0, path.lastIndexOf("/")))'>[返回上一级]</a> {{path}}</dt>
      <dd v-for='item in sortData'>
        <i class="icon" :class="item.type == 'dir' ? 'icon-folder' : 'icon-file'"></i>
        <a :href="item.download_url" :download="item.name" v-if='item.type=="file"'>{{item.name}}</a>
        <a href="javascript:;" v-else @click='changePath(item.path)'>{{item.name}}</a>
      </dd>
    </dl>
    <div class="mask" v-show='off'>
      <div class="item">加载中，请稍后</div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'filelist',
    data () {
      return {
        fileData: [],
        path: '/',
        off: false
      }
    },
    props: {
      userName: String,
      repoName: String
    },
    computed: {
      fullRepoName: function () {
        return this.userName + '/' + this.repoName
      },
      sortData: function () {
        var data = this.fileData
        data = data.sort(function (a, b) {
          if (a.type === b.type) {
            if (a.name < b.name) return -1
              else return 1
          } else {
            if (a.type === 'dir') return -1
              else return 1
          }
        })
        return data
      }
    },
    methods: {
      getFiles: function () {
        this.off = true
        this.$http.get('https://api.github.com/repos/' +this.fullRepoName+ '/contents'+this.path).then((response) => {
            this.fileData = response.data
            this.off = false
          }, (err) => {});
      },
      changePath: function (path) {
        if (path.slice(0, 1) !== '/') this.path = '/' + path
          else this.path = path
        this.getFiles()
      }
    },
    watch: {
      repoName: function (val, oldVal) {
        if (val !== oldVal) {
          this.path = '/'
          this.getFiles()
        }
      }
    }
  }
</script>
<style>
  a{text-decoration: none;color: #4078c0;}
  dl, dt, dd{margin: 0;padding: 0;}
  dt, dd{
    border-bottom: 1px solid #ccc;
    line-height: 3;
  }
  .icon-folder::after{
    content: '\e603';
    color: #4078c0;
  }
  .icon-file::after{
    content: '\e601';
    color: #767676;
  }
  .icon-download::after{
    content: '\e604';
  }
  .icon.right{
    float: right;
  }
  .mask{
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    text-align: center;
    display: table;
    background: rgba(0, 0, 0, .4);
    z-index: 45;
  }
  .mask .item{
    display: table-cell;
    vertical-align: middle;
    color: #fff;
    font-size: 60px;
  }
</style>