import { JournalLayout } from "../layout/JournalLayout";
import IconButton from "@mui/material/IconButton";
import { NothingSelectedView } from "../views/NothingSelectedView";
import { AddOutlined } from "@mui/icons-material";
import { startNewNote } from "../../store/journal/thunks";
import { useDispatch, useSelector } from "react-redux";
import { NoteView } from "../views/NoteView";

export const JournalPage = () => {
  const dispatch = useDispatch();
  const { isSaving, active } = useSelector(
    (state) => state.journal
  );

  const onClickNewNote = () => {
    dispatch(startNewNote());
  };

  return (
    <JournalLayout>

      {
        (!!active) ? <NoteView/> : <NothingSelectedView/>
      }

      <IconButton
        aria-label=""
        size="large"
        disabled={isSaving}
        sx={{
          color: "white",
          bgcolor: "error.main",
          ":hover": {
            bgcolor: "error.main",
            opacity: 0.9,
          },
          position: "fixed",
          right: 50,
          bottom: 50,
        }}
        onClick={onClickNewNote}
      >
        <AddOutlined sx={{ fontSize: 30 }} />
      </IconButton>
    </JournalLayout>
  );
};
