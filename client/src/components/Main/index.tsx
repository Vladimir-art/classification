import { Box } from "@mui/material";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { IImageData } from "../../App";
import ChooseFileBox from "../ChooseFileBox";
import DisplayResultBox from "../DisplayResultBox";

interface IMainProps {
  setImageData: Dispatch<SetStateAction<IImageData | undefined>>;
  setIsLoading: Dispatch<SetStateAction<boolean | undefined>>;
  isLoading?: boolean;
  classificationResult?: string;
}

const Main: FC<IMainProps> = ({
  setImageData,
  setIsLoading,
  isLoading,
  classificationResult,
}) => {
  const [imageSrc, setImageSrc] = useState<string>();
  return (
    <Box
      component="main"
      sx={{ display: "flex", padding: "1rem 0", width: "100%" }}
    >
      <ChooseFileBox
        setImageSrc={setImageSrc}
        setImageData={setImageData}
        setIsLoading={setIsLoading}
      />
      <DisplayResultBox
        imageSrc={imageSrc}
        isLoading={isLoading}
        classificationResult={classificationResult}
      />
    </Box>
  );
};

export default Main;
