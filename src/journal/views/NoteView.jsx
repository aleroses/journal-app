import { useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Grid2,
  Typography,
  TextField,
  IconButton,
} from "@mui/material";
import {
  SaveOutlined,
  UploadOutlined,
} from "@mui/icons-material";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";

import { useForm } from "../../hooks/useForm";
import { ImageGallery } from "../components/ImageGallery";
import { setActiveNote } from "../../store/journal/journalSlice";
import {
  startSaveNote,
  startUploadingFiles,
} from "../../store/journal/thunks";

export const NoteView = () => {
  const dispatch = useDispatch();
  const {
    active: note,
    messageSaved,
    isSaving,
  } = useSelector((state) => state.journal);
  const { body, title, date, handleInputChange, formState } =
    useForm(note);

  const dateString = useMemo(() => {
    const newDate = new Date(date);
    return newDate.toUTCString();
  }, [date]);

  const fileInputRef = useRef();

  useEffect(() => {
    dispatch(setActiveNote(formState));
  }, [formState]);

  useEffect(() => {
    if (messageSaved.length > 0) {
      Swal.fire("Note updated.", messageSaved, "success");
    }
  }, [messageSaved]);

  const onSaveNote = () => {
    dispatch(startSaveNote());
  };

  const onFileInputChange = ({ target }) => {
    if (target.files === 0) return;

    dispatch(startUploadingFiles(target.files));
  };

  return (
    <>
      <Grid2
        className="animate__animated animate__fadeIn animate__faster"
        container
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 1 }}
      >
        <Grid2>
          <Typography
            variant="h5"
            fontSize={39}
            fontWeight="light"
          >
            {dateString}
          </Typography>
        </Grid2>

        <Grid2>
          <input
            type="file"
            multiple
            ref={fileInputRef}
            onChange={onFileInputChange}
            style={{
              display: "none",
            }}
          />

          <IconButton
            // aria-label=""
            color="primary"
            disabled={isSaving}
            onClick={() => fileInputRef.current.click()}
          >
            <UploadOutlined />
          </IconButton>

          <Button
            disabled={isSaving}
            onClick={onSaveNote}
            color="primary"
            sx={{ padding: 2 }}
          >
            <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
            Save
          </Button>
        </Grid2>

        <Grid2 container sx={{ flexGrow: 1 }}>
          <TextField
            id=""
            type="text"
            variant="filled"
            label="Title"
            placeholder="Enter a title"
            fullWidth
            sx={{ border: "none", mb: 1 }}
            name="title"
            value={title}
            onChange={handleInputChange}
          />
          <TextField
            id=""
            type="text"
            variant="filled"
            // label="Title"
            placeholder="What happened today?"
            fullWidth
            multiline
            minRows={5}
            sx={{ border: "none", mb: 1 }}
            name="body"
            value={body}
            onChange={handleInputChange}
          />
        </Grid2>

        {/* Image gallery */}
        <ImageGallery images={note.imageUrls} />
      </Grid2>
    </>
  );
};
