import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { loginButtonClicked, registerButtonClicked } from "../../redux/action";
import "./popupForm.css";
import "./registerFormStyle.css";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  Link,
  Typography,
} from "@mui/material";
import { useLoginFormValidator } from "../../hook/useLoginFormValidator";
import { IFormValidation } from "./interface";
import { IErrorValidation } from "../../hook/interface";
import loginRequest from "../../utils/loginApi";
import { setUser } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { loginUrl } from "../../utils/constants";

type SigninSignupFormTitle = "Login" | "Register";

interface IPopupForm {
  title: SigninSignupFormTitle;
  isOpen: boolean;
  onClose: () => void;
}

const PopupForm: FC<IPopupForm> = ({ title, isOpen, onClose }) => {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const [errorMessage, setErrorMessage] = useState<IErrorValidation>();
  const [registerError, setRegisterError] = useState<string>("");
  const [form, setForm] = useState<IFormValidation>({
    email: "",
    password: "",
  });
  const { validateForm } = useLoginFormValidator();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (overlayRef.current && overlayRef?.current === event.target) {
        onClose();
        setRegisterError("");
        formRef.current && formRef.current.reset();
      }
    };

    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const switchToAnotherForm = () => {
    dispatch(loginButtonClicked);
    dispatch(registerButtonClicked);
    setRegisterError("");
    formRef.current && formRef.current.reset();
  };

  const onSubmitForm = async (event: React.FormEvent) => {
    event.preventDefault();
    const { isValid, errors } = validateForm(form);
    setErrorMessage(errors);
    if (!isValid) return;
    const response = await loginRequest.post(`/${title.toLowerCase()}`, form);
    if (response.error) {
      setRegisterError(response.error);
      return;
    }
    const authResponse = await loginRequest.authPost("/classification", {
      token: response.token,
    });
    console.log("authResponse", authResponse);
    dispatch(setUser(authResponse));
    formRef.current && formRef.current.reset();
    if (title === "Register") {
      dispatch(registerButtonClicked);
    } else {
      dispatch(loginButtonClicked);
    }
    navigate("/classification");
  };

  const onUpdateField = (event: ChangeEvent<HTMLInputElement>) => {
    const nextFormState = {
      ...form,
      [event.target.name]: event.target.value,
    };
    setForm(nextFormState);
  };

  const githubAuth = () => {
    window.open(`${loginUrl}/auth/github`, "_self");
  };

  return (
    <Box
      component="div"
      sx={{
        width: "100%",
        height: "100%",
        display: isOpen ? "flex" : "none",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: "0",
        left: "0",
        background: "rgba(0,0,0,.6)",
        zIndex: "1",
      }}
      ref={overlayRef}
    >
      <Box component="div" className={`card ${title}-card`}>
        <Box component="div" className="circle"></Box>
        <Box component="div" className="circle"></Box>
        <Box component="div" className="card-inner">
          <Box component="div" className="form-container">
            <Typography variant="inherit" className="title">
              {title}
            </Typography>
            <form className="form" onSubmit={onSubmitForm} ref={formRef}>
              {title === "Register" && (
                <FormControl className="input-group" sx={{ width: "100%" }}>
                  <InputLabel htmlFor="name">Name</InputLabel>
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    aria-describedby="name-helper-text"
                    disableUnderline={true}
                    onChange={onUpdateField}
                    required
                  />
                  <FormHelperText
                    id="name-helper-text"
                    style={{ visibility: "hidden" }}
                  >
                    We'll never share your email.
                  </FormHelperText>
                </FormControl>
              )}
              <FormControl className="input-group" sx={{ width: "100%" }}>
                <InputLabel htmlFor="email">Email</InputLabel>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  aria-describedby="email-helper-text"
                  disableUnderline={true}
                  onChange={onUpdateField}
                  required
                />
                <FormHelperText
                  id="email-helper-text"
                  style={{
                    visibility: errorMessage?.email.error
                      ? "visible"
                      : "hidden",
                    color: "#B22222",
                  }}
                >
                  {errorMessage?.email.message}.
                </FormHelperText>
              </FormControl>
              <FormControl className="input-group" sx={{ width: "100%" }}>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  disableUnderline={true}
                  error={true}
                  aria-describedby="password-helper-text"
                  onChange={onUpdateField}
                  required
                />
                <FormHelperText
                  id="password-helper-text"
                  style={{
                    visibility: errorMessage?.password.error
                      ? "visible"
                      : "hidden",
                    color: "#B22222",
                  }}
                >
                  {errorMessage?.password.message}.
                </FormHelperText>
              </FormControl>
              <Box
                component={"span"}
                sx={{
                  visibility: registerError ? "visible" : "hidden",
                  height: "15px",
                  color: "#B22222",
                  marginBottom: "5px",
                }}
              >
                {registerError}.
              </Box>
              <Button
                className="sign"
                type="submit"
                sx={{
                  display: "block",
                  width: "100%",
                  backgroundColor: "rgba(239, 145, 250, .8)",
                  paddingTop: "0.75rem",
                  textAlign: "center",
                  color: "rgba(17, 24, 39, 1)",
                  border: "none",
                  borderRadius: "0.375rem",
                  fontWeight: "600",
                  "&:hover": {
                    backgroundColor: "rgba(239, 145, 250, .6)",
                  },
                }}
              >
                {title === "Register" ? "Sign up" : "Sign in"}
              </Button>
            </form>
            <Box component="div" className="social-message">
              <Box component="div" className="line"></Box>
              <Typography variant="inherit" className="message">
                {title} with social accounts
              </Typography>
              <Box component="div" className="line"></Box>
            </Box>
            <Box component="div" className="social-icons">
              <Button aria-label="Log in with Google" className="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  className="w-5 h-5 fill-current"
                >
                  <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
                </svg>
              </Button>
              <Button aria-label="Log in with Twitter" className="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  className="w-5 h-5 fill-current"
                >
                  <path d="M31.937 6.093c-1.177 0.516-2.437 0.871-3.765 1.032 1.355-0.813 2.391-2.099 2.885-3.631-1.271 0.74-2.677 1.276-4.172 1.579-1.192-1.276-2.896-2.079-4.787-2.079-3.625 0-6.563 2.937-6.563 6.557 0 0.521 0.063 1.021 0.172 1.495-5.453-0.255-10.287-2.875-13.52-6.833-0.568 0.964-0.891 2.084-0.891 3.303 0 2.281 1.161 4.281 2.916 5.457-1.073-0.031-2.083-0.328-2.968-0.817v0.079c0 3.181 2.26 5.833 5.26 6.437-0.547 0.145-1.131 0.229-1.724 0.229-0.421 0-0.823-0.041-1.224-0.115 0.844 2.604 3.26 4.5 6.14 4.557-2.239 1.755-5.077 2.801-8.135 2.801-0.521 0-1.041-0.025-1.563-0.088 2.917 1.86 6.36 2.948 10.079 2.948 12.067 0 18.661-9.995 18.661-18.651 0-0.276 0-0.557-0.021-0.839 1.287-0.917 2.401-2.079 3.281-3.396z"></path>
                </svg>
              </Button>
              <Button
                aria-label="Log in with GitHub"
                className="icon"
                onClick={githubAuth}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  className="w-5 h-5 fill-current"
                >
                  <path d="M16 0.396c-8.839 0-16 7.167-16 16 0 7.073 4.584 13.068 10.937 15.183 0.803 0.151 1.093-0.344 1.093-0.772 0-0.38-0.009-1.385-0.015-2.719-4.453 0.964-5.391-2.151-5.391-2.151-0.729-1.844-1.781-2.339-1.781-2.339-1.448-0.989 0.115-0.968 0.115-0.968 1.604 0.109 2.448 1.645 2.448 1.645 1.427 2.448 3.744 1.74 4.661 1.328 0.14-1.031 0.557-1.74 1.011-2.135-3.552-0.401-7.287-1.776-7.287-7.907 0-1.751 0.62-3.177 1.645-4.297-0.177-0.401-0.719-2.031 0.141-4.235 0 0 1.339-0.427 4.4 1.641 1.281-0.355 2.641-0.532 4-0.541 1.36 0.009 2.719 0.187 4 0.541 3.043-2.068 4.381-1.641 4.381-1.641 0.859 2.204 0.317 3.833 0.161 4.235 1.015 1.12 1.635 2.547 1.635 4.297 0 6.145-3.74 7.5-7.296 7.891 0.556 0.479 1.077 1.464 1.077 2.959 0 2.14-0.020 3.864-0.020 4.385 0 0.416 0.28 0.916 1.104 0.755 6.4-2.093 10.979-8.093 10.979-15.156 0-8.833-7.161-16-16-16z"></path>
                </svg>
              </Button>
            </Box>
            <Typography variant="inherit" className="signup">
              {title === "Register"
                ? "Already member?"
                : "Don't have an account?"}
              &emsp;
              <Link
                rel="noopener noreferrer"
                href="#"
                onClick={() => switchToAnotherForm()}
              >
                {title === "Register" ? "Sign in" : "Sign up"}
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PopupForm;
