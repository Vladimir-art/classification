import { Box, Typography } from "@mui/material";
import { FC } from "react";
import ImageBox from "../commonComponents/ImageBox";
import testPic from "../../image/test.jpg";

const DisplayResultBox: FC = () => {
  return (
    <Box
      component="div"
      sx={{
        display: "flex",
        width: "50%",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
      }}
    >
      {/* <Box component="div" sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "300px",
        height: "300px",
        borderRadius: "1rem"
    }}>

    </Box> */}
      <ImageBox
        path={testPic}
        height={300}
        width={300}
        props={{
          marginBottom: "1rem",
          borderRadius: "1rem",
          boxShadow: "15px -15px rgba(255, 239, 213, .3)",
        }}
      />
      <Typography variant="h3" align="left" fontSize="1rem" fontWeight={500}>
        Choosen picture is <Box component="span" sx={{ color: 'primary.main' }}>{"Flower"}</Box>
      </Typography>
    </Box>
  );
};

export default DisplayResultBox;
