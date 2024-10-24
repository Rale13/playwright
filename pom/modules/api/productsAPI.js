import { BaseAPI } from "./baseApi";

export class ProductsAPI extends BaseAPI {
  constructor(page, token = "") {
    super(page, token);
    this.endpoint = "/api/v1/products";
  }

  async createProduct(payload) {
    return await this.post(this.endpoint, payload);
  }

}