import "./popupForm.css";
import { Box } from "@mui/material";
import { FC } from "react";

const Login: FC = () => {
  return (
    <Box
      component="div"
      sx={{
        width: "80%",
        height: "100%",
        background: "rgba(40, 44, 52, .05)",
        boxShadow: "0 0 10px rgba(0,0,0,0.25)",
        backdropFilter: "blur(10px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
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
