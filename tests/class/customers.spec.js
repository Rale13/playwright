import { test, expect } from "@playwright/test";
import { BaseLoginAPI } from "../../pom/modules/api/basicLoginAPI";
import { CustomersAPI } from "../../pom/modules/api/customersAPI";
import { VALID_LOGIN_PAYLOAD } from "../../fixtures/userData";
import { ERROR_MESSAGE, STATUS } from "../../fixtures/http";
import { utils } from "../../fixtures";

test.describe("customers API tests", () => {
  let loginAPI, customersAPI;

  test.beforeEach("get auth token", async ({ page }) => {
    loginAPI = new BaseLoginAPI(page);
    const loginResponse = await loginAPI.login(VALID_LOGIN_PAYLOAD);
    customersAPI = new CustomersAPI(page, loginResponse.auth.token);
  });

  test("1should be able to get all customers", async () => {
    const response = await customersAPI.getAllCustomers();
    let previousId = 0;
    for (const customer of response.customers) {
      const currentId = customer.id;
      expect(currentId).toBeGreaterThan(previousId);
      previousId = currentId;
    }
  });

  test("should not be able to get all customers without token", async ({
    page,
  }) => {
    const customersAPIWithoutToken = new CustomersAPI(page);
    const response = await customersAPIWithoutToken.getAllCustomers();
    expect(response.message).toBe(ERROR_MESSAGE["UNAUTHENTICATED"]);
  });

  test("should be able to get single customer", async () => {
    const allCustomersResponse = await customersAPI.getAllCustomers();
    const numberOfCustomers = allCustomersResponse.customers.length;
    const randomId = utils.generateRandomNumber(numberOfCustomers);
    const response = await customersAPI.getCustomer(randomId);
    expect(response.status).toBe(STATUS["SUCCESS"]);
  });

  test("should be able to update a customers first name", async () => {
    const allCustomersResponse = await customersAPI.getAllCustomers();
    const numberOfCustomers = allCustomersResponse.customers.length;
    const randomId = utils.generateRandomNumber(numberOfCustomers);
    const customerToUpdate = await customersAPI.getCustomer(randomId);

    const customerInfo = customerToUpdate.customer;

    const response = await customersAPI.updateCustomer(customerInfo.id, {
      first_name: `Updated ${customerInfo.first_name}`,
    });
    expect(customerInfo.first_name).not.toBe(response.customer.first_name);
    expect(response.customer.first_name).toBe(
      `Updated ${customerInfo.first_name}`
    );
  });

  test("should be able to delete the last customer", async () => {
    const allCustomersResponse = await customersAPI.getAllCustomers();
    const lastCustomer = allCustomersResponse.customers[allCustomersResponse.customers.length - 1];
    const lastCustomerId = lastCustomer.id;
    const deleteResponse = await customersAPI.deleteCustomer(lastCustomerId);
    expect(deleteResponse.status).toBe(STATUS["SUCCESS"]);
    const getDeletedCustomer = await customersAPI.getCustomer(lastCustomerId);
    expect(getDeletedCustomer.error).toBe(
      ERROR_MESSAGE.NO_CUSTOMER_FOUND(lastCustomerId)
    );
});

});
