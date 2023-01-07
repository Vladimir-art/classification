import { Dispatch, FC, SetStateAction } from "react";
import { Box, Button, Typography } from "@mui/material";

interface IChooseFileBoxProps {
  setImageSrc: Dispatch<SetStateAction<string | undefined>>;
}

const ChooseFileBox: FC<IChooseFileBoxProps> = ({ setImageSrc }) => {
  const readImage = (src: string | ArrayBuffer | null) => {
    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = image.width;
      canvas.height = image.height;
      const context = canvas.getContext("2d");
      if (context) {
        context.drawImage(image, 0, 0);

        const { data: imageData } = context.getImageData(
          0,
          0,
          image.width,
          image.height
        );
      }
    };
    setImageSrc(src as string);
    // return src;
  };

  const getImageFromFile = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const tgt = evt.target;
    const files = tgt.files;
    // FileReader support
    if (FileReader && files && files.length) {
      const fr = new FileReader();
      fr.onload = () => readImage(fr.result);
      fr.readAsDataURL(files[0]);
    }
  };

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
      <Button variant="contained" color="secondary" component="label">
        Choose a file
        <input
          hidden
          accept=".png, .jpg"
          multiple
          type="file"
          onChange={getImageFromFile}
        />
      </Button>
    </Box>
  );
};

export default ChooseFileBox;
