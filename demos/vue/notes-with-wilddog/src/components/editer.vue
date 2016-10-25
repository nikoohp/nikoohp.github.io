<template>
  <div id="editor">
    <textarea
    :value='text'
    @input='editNote'></textarea>
  </div>
</template>
<script>
  import {mapGetters, mapActions} from 'vuex'
  export default {
    computed: {
      ...mapGetters({
        text: 'getNoteText'
      })
    },
    methods: {
      ...mapActions({
        editNote: 'editNote'
      })
    }
  }
</script>
<style lang='sass'>
  #editor{
    margin-left: 380px;
    height: 100%;
    padding: 6px 12px;
    box-sizing: border-box;
    textarea{
      width: 100%;
      height: 100%;
      border: none;
      margin: 0;
      padding: 0;
      outline: none;
      font-size: 14px;
      line-height: 1.5;
      font-family: '微软雅黑';
    }
  }
</style>