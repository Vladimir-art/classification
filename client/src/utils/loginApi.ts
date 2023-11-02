import axios from "axios";
import { loginUrl } from "./constants";
import { data } from "jquery";

interface ILoginOptions {
  email: string;
  password: string;
  name?: string;
}

interface ISuccessLoginOptions {
  token: string;
}

class LoginRequest {
  private async fetch(
    method: string,
    endpoint: string,
    options?: ILoginOptions | ISuccessLoginOptions
  ) {
    return axios({
      method,
      baseURL: loginUrl,
      url: endpoint,
      headers: {
        "Content-Type": "application/json",
      },
      ...(options && {
        data: options,
      }),
    })
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        console.log(error);
        return { error: error.response.data };
      });
  }

  public post(endpoint: string, options: ILoginOptions) {
    return this.fetch("POST", endpoint, options);
  }

  public authPost(endpoint: string, options: ISuccessLoginOptions) {
    return this.fetch("POST", endpoint, options);
  }

  public getGithubAuth(endpoint: string) {
    return this.fetch("GET", endpoint);
  }
}

const loginRequest = new LoginRequest();
export default loginRequest;