import { URLS } from "../../../fixtures";
import { BaseAPI } from "./baseApi";
import { ENDPOINTS } from "../../../fixtures/http"

export class BaseLoginAPI extends BaseAPI {
  constructor(page) {
    super(page)
    this.endpoint = ENDPOINTS["LOGIN"]
  }

  async login(payload) {
    return await this.post(this.endpoint, payload)
  }
}