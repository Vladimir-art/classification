import styled from "@emotion/styled";
import { Button, ButtonProps } from "@mui/material";

export const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  cursor: "pointer",
  fontWeight: "700",
  transition: "all .2s",
  color: "#282c34",
  padding: "10px 20px",
  borderRadius: "100px",
  background: "#ef91fa",
  border: "1px solid transparent",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "15px",
  "&:hover": {
    background: "#bd607e",
  },
  "& > .colorButton-svg_container": {
    width: "34px",
    marginLeft: "10px",
    transition: "transform .3s ease-in-out",
  },
  "&:hover > .colorButton-svg_container": {
    transform: "translateX(5px)",
  },
  "&:active": {
    transform: "scale(0.95)",
  },
}));
