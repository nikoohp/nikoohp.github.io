<template>
  <div id="toolbar">
    <a href="javascript:;" @click='addNote'><i class="icon add"></i></a>
    <a href="javascript:;"
    @click='toggleFavoritor'
    :class='{favoritor: isFavorite}'><i class="icon favoritor"></i></a>
    <a href="javascript:;" @click='deleteNote'><i class="icon delete"></i></a>
  </div>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'toolbar',
    computed: {
      ...mapGetters({
        isFavorite: 'isFavorite'
      })
    },
    methods:{
      ...mapActions({
        addNote: 'addNoteAction',
        deleteNote: 'deleteNoteAction',
        toggleFavoritor: 'toggleFavoritor'
      }
      )
    }
  }
</script>
<style lang='sass'>
  #toolbar{
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 80px;
    padding-top: 60px;
    background-color: #42b983;
    box-sizing: border-box;
  }
  #toolbar a{
    display: block;
    color: #fff;
    text-decoration: none;
    line-height: 3;
    text-align: center;
  }
  #toolbar a:hover i.icon::before{
    color: #ddd;
  }
  #toolbar a.favoritor i.icon::before{
    color: #f2e97e;
  }
  i.icon::before{
    display: inline-block;
    font-family: 'iconfont';
    font-style: normal;
    font-size: 28px;
    color: #ccc;
    transition: .2s;
  }
  i.add::before{
    content: '\e606';
  }
  i.favoritor::before{
    content: '\e608';
  }
  i.delete::before{
    content: '\e607';
  }
</style>