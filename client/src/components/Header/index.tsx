import { FC } from "react";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import star from "../../image/star.png";
import ImageBox from "../commonComponents/ImageBox";
import { ColorButton } from "../commonComponents/ColorButton";
import { useAppDispatch } from "../../redux/hooks";
import { resetUser } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";

const Header: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logout = () => {
    window.open("http://localhost:8000/logout", "_self");
    dispatch(resetUser());
    navigate("/")
  };

  return (
    <Box
      component="header"
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "1rem",
        borderBottom: "1px solid rgba(255, 239, 213, .3)",
      }}
    >
      <Box
        component="div"
        sx={{
          width: "25%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <ImageBox path={star} />
        <Typography
          variant="h1"
          align="center"
          fontSize="2rem"
          marginLeft="1rem"
        >
          Classification
        </Typography>
      </Box>
      <ColorButton onClick={logout}>
        <Typography variant="body1" fontWeight={700}>
          Logout
        </Typography>
      </ColorButton>
    </Box>
  );
};

export default Header;
