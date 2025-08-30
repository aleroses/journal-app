import {
  Grid2,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { TurnedInNot } from "@mui/icons-material";
import { useMemo } from "react";

export const SideBarItem = ({ title = "", body, id }) => {
  const newTitle = useMemo(() => {
    return title.length > 17
      ? title.substring(0, 17) + "..."
      : title;
  }, [title]);

  return (
    <ListItem disablePadding>
      <ListItemButton component="a">
        <ListItemIcon>
          <TurnedInNot />
        </ListItemIcon>
        <Grid2 container>
          <ListItemText
            // primary={text}
            secondary={body}
          >
            {newTitle}
          </ListItemText>
        </Grid2>
      </ListItemButton>
    </ListItem>
  );
};
