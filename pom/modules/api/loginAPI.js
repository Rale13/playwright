import { URLS } from "../../../fixtures";
import { BaseAPI } from "./baseApi";
import { ENDPOINTS } from "../../../fixtures/http";

export class LoginAPI extends BaseAPI {
  constructor(page) {
    super(page);
    this.endpoint = ENDPOINTS["LOGIN"];

  }

  async login(payload) {
    return await this.post(this.endpoint, payload);
  }

  async loginWithoutEmail(password) {
    let response = await this.page.request.post(ENDPOINTS["LOGIN"], {
      headers: { Accept: "application/json" },
      data: {
        password: password,
      },
    });

    let responseJson = await response.json();

    return responseJson;
  }

  async loginWithoutPassowrd(email) {
    let response = await this.page.request.post(ENDPOINTS["LOGIN"], {
      headers: { Accept: "application/json" },
      data: {
        email: email,
      },
    });

    let responseJson = await response.json();

    return responseJson;
  }
}
