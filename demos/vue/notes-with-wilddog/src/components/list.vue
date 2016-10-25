<template>
  <div id="list">
    <header class="list">
      <h2>NOTES | COLIGO</h2>
      <div class="btn">
        <a href="javascript:;"
        :class="{cur: query === 'all'}"
        @click='query = "all"'>
        ALL
        </a>
        <a href="javascript:;"
        :class="{cur: query === 'favorite'}"
        @click = 'query = "favorite"'>
        FAVORITOR
        </a>
      </div>
    </header>
    <ul>
      <li
        v-for='(item, index) in filterNotes'
        :class='{active: activeKey == item.id}'
        @click='changeActive(item)' :title='item.id'>
        {{item.text.trim().substring(0, 18)}}
      </li>
    </ul>
  </div>
</template>
<script>
  import {mapGetters, mapActions} from 'vuex'

  export default {
    name:'list',
    data () {
      return {
        query: 'all'
      }
    },
    computed: {
      ...mapGetters({
          getNotes: 'getList',
          activeKey: 'activeKey'
        }),
      filterNotes: function () {
        let favoriteNotes = []
        if (this.query === 'all') {
          return this.getNotes
        } else if (this.query === 'favorite') {
          for (var note in this.getNotes) {
            if (this.getNotes[note]['favorite']) {
              favoriteNotes.push( this.getNotes[note] )
            }
          }
          return favoriteNotes
        }
      }
    },
    methods: {
      ...mapActions({
        changeActive: 'changeActiveNoteAction'
      })
    }
  }
</script>
<style>
  ul{padding: 0;margin: 0;list-style: none;}
  #list{
    width: 300px;
    position: absolute;
    left: 80px;
    top: 0;
    bottom: 0;
    background-color: #f1f1f1;
    box-shadow: 1px 0 4px rgba(0, 0, 0, .075)
  }
  #list li{
    text-indent: 20px;
    background-color: #fff;
    cursor: pointer;
  }
   #list li.active{
    background-color: #337ab7;
    color: #fff;
   }
  #list header.list{
    box-sizing: border-box;
    padding: 0 20px 20px;
  }
  #list header.list h2{
    text-align: center;
  }
  #list header.list .btn{
    overflow: hidden;
  }
  #list header.list .btn a{
    float: left;
    text-decoration: none;
    width: 130px;
    text-align: center;
    height: 40px;
    line-height: 40px;
    color: #333;
    background-color: #fff;
    border:1px solid #adadad;
    border-radius: 3px;
    font-size: 12px;
    box-sizing: border-box;
  }
  #list header.list .btn a.cur{
    background-color: #e6e6e6;
    box-shadow: inset 0 3px 5px rgba(0, 0, 0, .125);
  }
  #list header.list .btn a:first-child{
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  #list header.list .btn a:last-child{
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
</style>