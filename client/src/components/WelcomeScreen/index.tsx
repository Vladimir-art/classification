import { FC } from "react";
import { Box, Typography } from "@mui/material";
import { ColorButton } from "../commonComponents/ColorButton";
import { useAppDispatch } from "../../redux/hooks";
import { loginButtonClicked, registerButtonClicked } from "../../redux/action";

const WelcomePage: FC = () => {
  const dispatch = useAppDispatch();

  return (
    <Box
      component="div"
      sx={{
        width: "80%",
        height: "100%",
        background:
          "linear-gradient(#282c34, #282c34) padding-box, linear-gradient(145deg, transparent 35%,#ef91fa, #8adeff) border-box",
        border: "2px solid transparent",
        boxSizing: "border-box",
        borderRadius: "16px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h1"
        align="center"
        fontWeight={500}
        sx={{ whiteSpace: "pre-line", width: "80%" }}
      >
        Welcome to the application for image classification!
      </Typography>
      <Typography
        variant="h3"
        align="center"
        fontWeight={400}
        sx={{
          whiteSpace: "pre-line",
          width: "80%",
          background: "linear-gradient(to right, #e96af7, #3bc2f7)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Unlock the Power of Image Recognition
      </Typography>
      <Typography
        variant="h5"
        align="justify"
        fontStyle="italic"
        fontWeight={300}
        sx={{ whiteSpace: "pre-line", width: "80%" }}
      >
        Discover the future of image recognition with our application. Our
        cutting-edge technology enables you to analyze and understand images
        like never before. Whether you're looking to classify objects, detect
        patterns, or extract valuable insights, we've got you covered. Start
        your journey into the world of image recognition today.
      </Typography>
      <Box
        component="div"
        sx={{
          width: "30%",
          background: "transparent",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <ColorButton onClick={() => dispatch(loginButtonClicked)}>
          <Typography variant="body1" fontWeight={700}>
            Login
          </Typography>
          <Box
            component="div"
            className="colorButton-svg_container"
            sx={{
              width: "34px",
              marginLeft: "10px",
              height: "34px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <svg
              width="34"
              height="34"
              viewBox="0 0 74 74"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="37"
                cy="37"
                r="35.5"
                stroke="black"
                strokeWidth="3"
              ></circle>
              <path
                d="M25 35.5C24.1716 35.5 23.5 36.1716 23.5 37C23.5 37.8284 24.1716 38.5 25 38.5V35.5ZM49.0607 38.0607C49.6464 37.4749 49.6464 36.5251 49.0607 35.9393L39.5147 26.3934C38.9289 25.8076 37.9792 25.8076 37.3934 26.3934C36.8076 26.9792 36.8076 27.9289 37.3934 28.5147L45.8787 37L37.3934 45.4853C36.8076 46.0711 36.8076 47.0208 37.3934 47.6066C37.9792 48.1924 38.9289 48.1924 39.5147 47.6066L49.0607 38.0607ZM25 38.5L48 38.5V35.5L25 35.5V38.5Z"
                fill="black"
              ></path>
            </svg>
          </Box>
        </ColorButton>
        <ColorButton onClick={() => dispatch(registerButtonClicked)}>
          <Typography variant="body1" fontWeight={700}>
            Signup
          </Typography>
        </ColorButton>
      </Box>
    </Box>
  );
};

export default WelcomePage;
