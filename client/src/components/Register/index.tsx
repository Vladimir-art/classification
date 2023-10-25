import { FC } from "react";
import PopupForm from "../PopupForm";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { isRegisterFormOpenedSelector } from "../../redux/selectors";
import { registerButtonClicked } from "../../redux/action";

const Register: FC = () => {
  const dispatch = useAppDispatch();
  const isRegisterClicked = useAppSelector(isRegisterFormOpenedSelector);

  return <PopupForm title="Register" isOpen={isRegisterClicked} onClose={() => dispatch(registerButtonClicked)} />;
};

export default Register;
