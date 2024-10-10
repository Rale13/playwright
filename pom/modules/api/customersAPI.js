import { BaseAPI } from "./baseApi";

export class CustomersAPI extends BaseAPI {
  constructor(page, token = "") {
    super(page, token);
    this.endpoint = "/api/v1/customers";
  }

  async getAllCustomers() {
    return await this.get(this.endpoint);
  }

  async getCustomer(id) {
    return await this.get(this.endpoint, id);
  }

  async updateCustomer(id, payload) {
    return await this.put(this.endpoint, id, payload);
  }

  async deleteCustomer(id) {
    return await this.delete(this.endpoint, id);
  }
}
