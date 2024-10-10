import { BaseAPI } from "./baseApi";

export class LoginAPI extends BaseAPI {
  constructor(page) {
    super(page)
    this.endpoint = '/api/v1/auth/login'
  }

  async login(payload) {
    return await this.post(this.endpoint, payload)
  }

  async loginWithoutEmail(password) {
    let response = await this.page.request.post("/api/v1/auth/login", {
      headers: { Accept: "application/json" },
      data: {
        password: password,
      },
    });

    let responseJson = await response.json();

    return responseJson;
  }

  async loginWithoutPassowrd(email) {
    let response = await this.page.request.post("/api/v1/auth/login", {
      headers: { Accept: "application/json" },
      data: {
        email: email,
      },
    });

    let responseJson = await response.json();

    return responseJson;
  }
}