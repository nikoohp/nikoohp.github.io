import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions.js'
import * as getters from './getters.js'

Vue.use(Vuex)

const ref = new Wilddog("https://vue-test01.wilddogio.com/notes")


const state = {
  notes: [],
  activeNote: {},
  activeKey: '0'
}


function setFirstActive() {
  let arrNotes = []
  for (var note in state.notes) {
    arrNotes.push (state.notes[note])
  }
  state.activeNote = arrNotes[0]
  state.activeKey = arrNotes[0].id
}

ref.on('value', function (snap) {
  // 赋值
  state.notes = snap.val()
  // 初始化
  if (!state.activeNote.id) setFirstActive()
})
const mutations = {
  ADD_NOTE (state) {
    const newNote = {
      id: '',
      text: 'New Note',
      favorite: false
    }
    var addRef = ref.push()
    newNote.id = addRef.key()
    state.activeKey = addRef.key()
    addRef.set(newNote)
    state.activeNote = newNote
  },
  DELETE_NOTE (state) {
    ref.child(state.activeKey).set(null)
    // 设置删除后的高亮状态
    setFirstActive()
  },
  EDIT_NOTE (state, text) {
    ref.child(state.activeKey).update({
      'text': text
    })
  },
  CHANGE_ACTIVENOTE (state, acNote) {
    state.activeNote = acNote
    state.activeKey = acNote.id
  },
  TOGGLE_FAVORITOR (state) {
    state.activeNote.favorite = !state.activeNote.favorite
    ref.child(state.activeKey).update({
      'favorite': state.activeNote.favorite
    })
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})