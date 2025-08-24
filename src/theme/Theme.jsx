import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { purple } from "./purpleTheme";

export const Theme = ({ children }) => {
  return (
    <ThemeProvider theme={purple}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
