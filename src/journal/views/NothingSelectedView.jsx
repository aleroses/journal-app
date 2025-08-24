import { StarOutline } from "@mui/icons-material";
import { Box, Grid2, Typography } from "@mui/material";

export const NothingSelectedView = () => {
  return (
    <Box
      className="animate__animated animate__fadeIn animate__faster"
      component="main"
      sx={{
        minHeight: "calc(100vh - 110px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "primary.main",
        borderRadius: 5,
      }}
    >
      <Grid2>
        <StarOutline
          sx={{ fontSize: 100, color: "white" }}
        />
      </Grid2>
      <Grid2>
        <Typography variant="h5" color="white">
          Select or create a note.
        </Typography>
      </Grid2>
    </Box>
  );
};
