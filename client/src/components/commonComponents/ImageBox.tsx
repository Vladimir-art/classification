import { Box, SxProps, Theme } from "@mui/material";
import { FC } from "react";

interface IImageBoxProps {
  path: string;
  height?: number;
  width?: number;
  props?: SxProps<Theme>;
}

const ImageBox: FC<IImageBoxProps> = ({
  path,
  height = 48,
  width = 48,
  props,
}) => {
  return (
    <Box
      component="img"
      sx={{
        height,
        width,
        ...props,
      }}
      alt="logo"
      src={path}
    />
  );
};

export default ImageBox;
