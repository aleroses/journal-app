import { useSelector } from "react-redux";
import {
  Button,
  Grid2,
  Typography,
  TextField,
} from "@mui/material";
import { SaveOutlined } from "@mui/icons-material";
import { ImageGallery } from "../components/ImageGallery";
import { useForm } from "../../hooks/useForm";
import { useMemo } from "react";

export const NoteView = () => {
  const { active: note } = useSelector(
    (state) => state.journal
  );
  const { body, title, date, onInputChange, formState } =
    useForm(note);

  const dateString = useMemo(() => {
    const newDate = new Date(date);
    return newDate.toUTCString();
  }, [date]);

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
          <Button color="primary" sx={{ padding: 2 }}>
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
            onChange={onInputChange}
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
            onChange={onInputChange}
          />
        </Grid2>

        {/* Image gallery */}
        <ImageGallery />
      </Grid2>
    </>
  );
};
