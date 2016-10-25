export const addNoteAction = ({ commit }) => {
  commit('ADD_NOTE')
}
export const deleteNoteAction = ({ commit }) => {
  commit('DELETE_NOTE')
}
export const changeActiveNoteAction = ({ commit }, item) => {
  commit('CHANGE_ACTIVENOTE', item)
}
export const editNote = ({ commit }, e) => {
  commit('EDIT_NOTE', e.target.value)
}
export const toggleFavoritor = ({ commit }) => {
  commit('TOGGLE_FAVORITOR')
}
