import { test, expect } from "@playwright/test";
import { BaseLoginAPI } from "../../pom/modules/api/basicLoginAPI";
import { ProductsAPI } from "../../pom/modules/api/productsAPI";
import { VALID_LOGIN_PAYLOAD } from "../../fixtures/userData";
import { ERROR_MESSAGE, STATUS} from "../../fixtures/http";
import { utils } from "../../fixtures";

test.describe("products API tests", () => {
  let loginAPI, productsAPI;

  test.beforeEach("get auth token", async ({ page }) => {
    loginAPI = new BaseLoginAPI(page);
    const loginResponse = await loginAPI.login(VALID_LOGIN_PAYLOAD);
    productsAPI = new ProductsAPI(page, loginResponse.auth.token);
  });


  test("should be able to create a product", async () => {
    const response = await productsAPI.createProduct({
            name: utils.generateRandomString(5),
            description: "Random123455",
            price: Number(`${utils.generateRandomNumber(100)}.${utils.generateRandomNumber(99)}`),
            in_stock: true,
            quantity: 50,
            rating: Number(`${utils.generateRandomNumber(5)}.${utils.generateRandomNumber(9)}`),
  });
    console.log(response)
    expect(response.status).toBe(STATUS["SUCCESS"])
    expect(response.message).toBe('Product created successfully.')
  })
});
