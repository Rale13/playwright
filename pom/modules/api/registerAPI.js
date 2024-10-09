import { BaseAPI } from "./baseApi";

export class RegisterAPI extends BaseAPI {
  constructor(page) {
    super(page);
    this.endpoint = "/api/v1/auth/register";
  }

  async register(payload) {
    return await this.post(this.endpoint, payload);
  }

  async registerWithoutUsername(email,password) {
    let response = await this.page.request.post("/api/v1/auth/register", {
      headers: { Accept: "application/json" },
      data: {
        email: email,
        password: password,
      },
    });

    let responseJson = await response.json();

    return responseJson;
  }

  async registerWithoutEmail(username,password) {
    let response = await this.page.request.post("/api/v1/auth/register", {
      headers: { Accept: "application/json" },
      data: {
        username: username,
        password: password,
      },
    });

    let responseJson = await response.json();

    return responseJson;
  }

  async registerWithoutPassword(username,email) {
    let response = await this.page.request.post("/api/v1/auth/register", {
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
