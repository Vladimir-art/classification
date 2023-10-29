export interface IErrorValidation {
  email: {
    error: boolean;
    message: string;
  };
  password: {
    error: boolean;
    message: string;
  };
}
