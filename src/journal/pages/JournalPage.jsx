import { JournalLayout } from "../layout/JournalLayout";
import IconButton from "@mui/material/IconButton";
import { NothingSelectedView } from "../views/NothingSelectedView";
import { AddOutlined } from "@mui/icons-material";
import { startNewNote } from "../../store/journal/thunks";
import { useDispatch } from "react-redux";

export const JournalPage = () => {
  const dispatch = useDispatch();

  const onClickNewNote = () => {
    dispatch(startNewNote());
  };

  return (
    <JournalLayout>
      <NothingSelectedView />

      <IconButton
        aria-label=""
        size="large"
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
