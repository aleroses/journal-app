import { JournalLayout } from "../layout/JournalLayout";
import { NoteView } from "../views/NoteView";
import IconButton from "@mui/material/IconButton";
import { NothingSelectedView } from "../views/NothingSelectedView";
import { AddOutlined } from "@mui/icons-material";

export const JournalPage = () => {
  return (
    <JournalLayout>
      <NothingSelectedView />

      {/* <NoteView /> */}

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
      >
        <AddOutlined sx={{ fontSize: 30 }} />
      </IconButton>
    </JournalLayout>
  );
};
