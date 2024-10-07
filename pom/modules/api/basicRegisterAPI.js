import { BaseAPI } from "./baseApi";

export class BaseRegisterAPI extends BaseAPI {
  constructor(page) {
    super(page)
    this.endpoint = '/api/v1/auth/register'
  }

  async register(payload) {
    return await this.post(this.endpoint, payload)
  }
}