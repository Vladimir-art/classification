import { FC } from "react";
import PopupForm from "../PopupForm";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { isLoginFormOpenedSelector } from "../../redux/selectors";
import { loginButtonClicked } from "../../redux/action";

const Login: FC = () => {
  const isLoginClicked = useAppSelector(isLoginFormOpenedSelector);
  const dispatch = useAppDispatch();

  return <PopupForm title="Login" isOpen={isLoginClicked} onClose={() => dispatch(loginButtonClicked)} />;
};

export default Login;
