import { FC } from "react";
import {
  Box,
  Link,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import gitLogo from "../../image/git.png";

const Footer: FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        display: "flex",
        alignItems: "center",
        padding: "1rem",
        borderTop: "1px solid rgba(255, 239, 213, .3)",
      }}
    >
      <List component="nav" aria-label="main mailbox folders">
        <ListItemButton sx={{padding: 0, margin: 0}}>
          <ListItemIcon>
            <Box
              component="img"
              sx={{
                height: 48,
                width: 48,
              }}
              alt="star logo"
              src={gitLogo}
            />
          </ListItemIcon>
          <Link href="https://github.com/Vladimir-art" underline="hover" color="inherit">
            Vladimir Ermolaev
          </Link>
        </ListItemButton>
      </List>
    </Box>
  );
};

export default Footer;
