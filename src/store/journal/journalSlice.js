import { createSlice } from "@reduxjs/toolkit";

export const journalSlice = createSlice({
  name: "journal",
  initialState: {
    isSaving: false,
    messageSaved: "",
    notes: [],
    active: null,
    // active: {
    //   id: "ABC123",
    //   title: "",
    //   body: "",
    //   date: 1234567,
    //   imageUrls: [],
    // },
  },
  reducers: {
    savingNewNote: (state, { payload }) => {
      state.isSaving = true;
    },
    addNewEmptyNote: (state, { payload }) => {
      state.notes.push(payload);
      state.isSaving = false;
    },
    setActiveNote: (state, { payload }) => {
      state.active = payload;
      state.messageSaved = "";
    },
    setNotes: (state, { payload }) => {
      state.notes = payload;
    },
    setSaving: (state) => {
      state.isSaving = true;
      state.messageSaved = "";
    },
    updateNote: (state, { payload }) => {
      state.isSaving = false;
      state.notes = state.notes.map((note) => {
        if (note.id === payload.id) {
          return payload;
        }

        return note;
      });

      state.messageSaved = `${payload.title}, updated correctly.`;
    },
    setPhotosToActiveNote: (state, action) => {
      state.active.imageUrls = [
        ...state.active.imageUrls,
        ...action.payload,
      ];
      state.isSaving = false;
    },
    clearNotesLogout: (state) => {
      state.isSaving = false;
      state.messageSaved = "";
      state.notes = [];
      state.active = null;
    },
    deleteNoteById: (state, action) => {
      state.active = null;
      state.notes = state.notes.filter(
        (note) => note.id !== action.payload
      );
    },
  },
});

export const {
  addNewEmptyNote,
  clearNotesLogout,
  deleteNoteById,
  savingNewNote,
  setActiveNote,
  setNotes,
  setPhotosToActiveNote,
  setSaving,
  updateNote,
} = journalSlice.actions;
