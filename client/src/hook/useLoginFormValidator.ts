import { useState } from "react";
import { emailValidator, passwordValidator } from "../utils/validator";
import { IFormValidation } from "../components/PopupForm/interface";

export const useLoginFormValidator = () => {
  const [errors, setErrors] = useState({
    email: {
      error: false,
      message: "",
    },
    password: {
      error: true,
      message: "",
    },
  });

  const validateForm = (form: IFormValidation) => {
    const { email, password } = form;

    const emailMessage = emailValidator(email);
    const passwordMessage = passwordValidator(password);

    const nextErrors = {
      email: {
        error: !!emailMessage,
        message: emailMessage,
      },
      password: {
        error: !!passwordMessage,
        message: passwordMessage,
      },
    };

    const isValid = !(nextErrors.email.error || nextErrors.password.error);

    setErrors(nextErrors);

    return {
      isValid,
      errors: nextErrors,
    };
  };

  return {
    validateForm,
  };
};
