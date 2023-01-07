import { FC } from "react";
import { Box, Fab, Typography } from "@mui/material";
import ImageBox from "../commonComponents/ImageBox";
import dowloadLogo from "../../image/download.png";

const ChooseFileBox: FC = () => {
  return (
    <Box component="div" sx={{ width: "50%" }}>
      <Typography
        variant="h2"
        align="left"
        fontSize="3rem"
        fontWeight={700}
        sx={{ marginBottom: "4rem" }}
      >
        Welcome to the application! Let's try to predict what kind of picture is
        it...
      </Typography>
      <Fab variant="extended" color="secondary" sx={{ display: "flex" }}>
        <ImageBox
          path={dowloadLogo}
          height={25}
          width={25}
          props={{ marginRight: ".5rem" }}
        />
        Choose a file
      </Fab>
    </Box>
  );
};

export default ChooseFileBox;
