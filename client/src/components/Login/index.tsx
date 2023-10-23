import "./popupForm.css";
import { Box } from "@mui/material";
import { FC } from "react";

const Login: FC = () => {
  return (
    <Box
      component="div"
      sx={{
        width: "100%",
        height: "80%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        zIndex: "1",
      }}
    >
      <Box component="div" className="card">
        <Box component="div" className="circle"></Box>
        <Box component="div" className="circle"></Box>
        <Box component="div" className="card-inner"></Box>
      </Box>
    </Box>
  );
};

export default Login;
