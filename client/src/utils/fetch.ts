import axios from "axios";
import { baseUrl } from "./constants";

class ClassificationRequest {
  private async fetch(
    method: string,
    endpoint: string,
    options: Record<string, Uint8ClampedArray>
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

  public post(endpoint: string, imageData: Uint8ClampedArray) {
    return this.fetch("POST", endpoint, {
      message: imageData,
    });
  }
}

const classificationRequest = new ClassificationRequest();
export default classificationRequest;
