import { SaveOutlined } from "@mui/icons-material";
import {
  Button,
  Grid2,
  Typography,
  TextField,
} from "@mui/material";
import { ImageGallery } from "../components/ImageGallery";

export const NoteView = () => {
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
            August 28, 2023
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
            value=""
            onChange=""
            placeholder="Enter a title"
            fullWidth
            sx={{ border: "none", mb: 1 }}
          />
          <TextField
            id=""
            type="text"
            variant="filled"
            // label="Title"
            value=""
            onChange=""
            placeholder="What happened today?"
            fullWidth
            multiline
            minRows={5}
            sx={{ border: "none", mb: 1 }}
          />
        </Grid2>

        {/* Image gallery */}
        <ImageGallery />
      </Grid2>
    </>
  );
};
