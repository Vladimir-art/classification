import { FC } from "react";
import PopupForm from "../PopupForm";
import { useAppSelector } from "../../redux/hooks";
import { isLoginFormOpenedSelector } from "../../redux/selectors";

const Login: FC = () => {
  const isLoginClicked = useAppSelector(isLoginFormOpenedSelector);

  return <PopupForm title="Login" isOpen={isLoginClicked} />;
};

export default Login;
