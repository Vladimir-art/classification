import { Box } from "@mui/material";
import { FC, useState } from "react";
import ChooseFileBox from "../ChooseFileBox";
import DisplayResultBox from "../DisplayResultBox";

const Main: FC = () => {
  const [imageSrc, setImageSrc] = useState<string>();
  return (
    <Box component="main" sx={{ display: "flex", padding: "1rem 0" }}>
      <ChooseFileBox setImageSrc={setImageSrc} />
      <DisplayResultBox imageSrc={imageSrc} />
    </Box>
  );
};

export default Main;
