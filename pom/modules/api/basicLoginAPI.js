import { BaseAPI } from "./baseApi";

export class BaseLoginAPI extends BaseAPI {
  constructor(page) {
    super(page)
    this.endpoint = '/api/v1/auth/login'
  }

  async login(payload) {
    return await this.post(this.endpoint, payload)
  }
}