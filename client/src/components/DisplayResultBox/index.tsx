import { Box, CircularProgress, Typography } from "@mui/material";
import { FC } from "react";
import ImageBox from "../commonComponents/ImageBox";

interface IDisplayResultBoxProps {
  imageSrc?: string;
  isLoading?: boolean;
  classificationResult?: string;
}

const DisplayResultBox: FC<IDisplayResultBoxProps> = ({
  imageSrc,
  isLoading,
  classificationResult,
}) => {
  return (
    <Box
      component="div"
      sx={{
        display: "flex",
        width: "50%",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {isLoading ? (
        <CircularProgress color="secondary" />
      ) : (
        imageSrc && (
          <>
            <ImageBox
              path={imageSrc}
              height={300}
              width={300}
              props={{
                marginBottom: "1rem",
                borderRadius: "1rem",
                boxShadow: "15px -15px rgba(255, 239, 213, .3)",
              }}
            />
            <Typography
              variant="h3"
              align="left"
              fontSize="1rem"
              fontWeight={500}
            >
              Choosen picture is &nbsp;
              <Box
                component="span"
                fontSize="1.5rem"
                sx={{ color: "primary.main" }}
              >
                {classificationResult}
              </Box>
            </Typography>
          </>
        )
      )}
    </Box>
  );
};

export default DisplayResultBox;
