import {
  collection,
  doc,
  setDoc,
} from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";

export const startNewNote = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    // uid

    const newNote = {
      title: "",
      body: "",
      date: new Date().getTime(),
    };

    const newDoc = doc(
      collection(FirebaseDB, `${uid}/journal/notes`)
    );

    // Para ver la info añadir variable y hacer console.log
    await setDoc(newDoc, newNote);

    // dispatch
    // dispatc(newNote)
    // dispatch(activarNote)
  };
};
