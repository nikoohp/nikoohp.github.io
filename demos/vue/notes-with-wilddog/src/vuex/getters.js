export const getList = state => state.notes

export const activeNote = state => state.activeNote

export const activeKey = state => state.activeKey

export const getNoteText = state => state.activeNote.text

export const isFavorite = state => state.activeNote.favorite