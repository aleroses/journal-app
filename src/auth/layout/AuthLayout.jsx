import { Box, Typography } from "@mui/material";

export const AuthLayout = ({ children, title = "" }) => {
  return (
    <Box
      component="main"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        bgcolor: "primary.main",
        // padding: 4,
      }}
    >
      <Box
        component="section"
        sx={{
          width: {
            xs: "80%",
            sm: "60%",
            md: "40%",
            lg: "30%",
          },
          bgcolor: "white",
          padding: { xs: 2, sm: 3, md: 4 },
          borderRadius: 2,
        }}
      >
        <Typography
          variant="h5"
          sx={{ mb: 2, textAlign: "center" }}
        >
          {title}
        </Typography>

        {/* Children */}
        {children}
      </Box>
    </Box>
  );
};
