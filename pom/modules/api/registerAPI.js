import { BaseAPI } from "./baseApi";
import { ENDPOINTS } from "../../../fixtures/http";

export class RegisterAPI extends BaseAPI {
  constructor(page) {
    super(page);
    this.endpoint = ENDPOINTS["REGISTER"];
  }

  async register(payload) {
    return await this.post(this.endpoint, payload);
  }

  async registerWithoutUsername(email, password) {
    let response = await this.page.request.post(ENDPOINTS["REGISTER"], {
      headers: { Accept: "application/json" },
      data: {
        email: email,
        password: password,
      },
    });

    let responseJson = await response.json();

    return responseJson;
  }

  async registerWithoutEmail(username, password) {
    let response = await this.page.request.post(ENDPOINTS["REGISTER"], {
      headers: { Accept: "application/json" },
      data: {
        username: username,
        password: password,
      },
    });

    let responseJson = await response.json();

    return responseJson;
  }

  async registerWithoutPassword(username, email) {
    let response = await this.page.request.post(ENDPOINTS["REGISTER"], {
      headers: { Accept: "application/json" },
      data: {
        username: username,
        email: email,
      },
    });

    let responseJson = await response.json();

    return responseJson;
  }
}
