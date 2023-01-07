import { FC } from "react";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import star from "../../image/star.png";

const Header: FC = () => {
  return (
    <Box
      component="header"
      sx={{
        display: "flex",
        alignItems: "center",
        padding: "1rem",
        borderBottom: "1px solid rgba(255, 239, 213, .5)",
      }}
    >
      <Box
        component="img"
        sx={{
          height: 48,
          width: 48,
        }}
        alt="star logo"
        src={star}
      />
      <Typography variant="h1" align="center" fontSize="2rem" marginLeft="1rem">
        Entertainment
      </Typography>
    </Box>
  );
};

export default Header;
