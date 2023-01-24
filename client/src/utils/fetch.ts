import axios from "axios";
import { IImageData } from "../App";
import { baseUrl } from "./constants";

class ClassificationRequest {
  private async fetch(
    method: string,
    endpoint: string,
    options: IImageData
  ) {
    return axios({
      method,
      baseURL: baseUrl,
      url: endpoint,
      headers: {
        "Content-Type": "application/json",
      },
      data: options,
    });
  }

  public post(endpoint: string, imageData: IImageData) {
    return this.fetch("POST", endpoint, imageData);
  }
}

const classificationRequest = new ClassificationRequest();
export default classificationRequest;
