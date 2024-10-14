import { BaseAPI } from "./baseApi";
import { ENDPOINTS } from "../../../fixtures/http"

export class BaseRegisterAPI extends BaseAPI {
  constructor(page) {
    super(page)
    this.endpoint = ENDPOINTS["REGISTER"]
  }

  async register(payload) {
    return await this.post(this.endpoint, payload)
  }
}