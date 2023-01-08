import { Box } from "@mui/material";
import { Dispatch, FC, SetStateAction, useState } from "react";
import ChooseFileBox from "../ChooseFileBox";
import DisplayResultBox from "../DisplayResultBox";

interface IMainProps {
  setImageData: Dispatch<SetStateAction<Uint8ClampedArray | undefined>>;
  setIsLoading: Dispatch<SetStateAction<boolean | undefined>>;
  isLoading?: boolean;
}

const Main: FC<IMainProps> = ({ setImageData, setIsLoading, isLoading }) => {
  const [imageSrc, setImageSrc] = useState<string>();
  return (
    <Box component="main" sx={{ display: "flex", padding: "1rem 0" }}>
      <ChooseFileBox
        setImageSrc={setImageSrc}
        setImageData={setImageData}
        setIsLoading={setIsLoading}
      />
      <DisplayResultBox imageSrc={imageSrc} isLoading={isLoading} />
    </Box>
  );
};

export default Main;
