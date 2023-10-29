export const emailValidator = (email: string) => {
  if (!email) {
    return "Email is required";
  }

  if (
    !new RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/).test(email)
  ) {
    return "Incorrect email format. Please try again";
  }

  return "";
};

export const passwordValidator = (password: string) => {
  if (!password) {
    return "Password is required";
  }

  if (
    !new RegExp(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    ).test(password)
  ) {
    return "The provided password is not strong";
  }

  return "";
};
