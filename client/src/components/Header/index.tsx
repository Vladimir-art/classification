import { FC } from "react";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import star from "../../image/star.png";
import ImageBox from "../commonComponents/ImageBox";

const Header: FC = () => {
  return (
    <Box
      component="header"
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        padding: "1rem",
        borderBottom: "1px solid rgba(255, 239, 213, .3)",
      }}
    >
      <ImageBox path={star} />
      <Typography variant="h1" align="center" fontSize="2rem" marginLeft="1rem">
        Classification
      </Typography>
    </Box>
  );
};

export default Header;
