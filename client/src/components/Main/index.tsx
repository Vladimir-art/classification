import { Box } from "@mui/material";
import { FC } from "react";
import ChooseFileBox from "../ChooseFileBox";
import DisplayResultBox from "../DisplayResultBox";

const Main: FC = () => {
  return (
    <Box component="main" sx={{ display: "flex", padding: "1rem 0" }}>
      <ChooseFileBox />
      <DisplayResultBox />
    </Box>
  );
};

export default Main;
