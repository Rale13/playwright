import { test, expect } from "@playwright/test";
import { BaseLoginAPI } from "../../pom/modules/api/basicLoginAPI";
import {
  VALID_LOGIN_PAYLOAD,
  STATUS,
  generateUserCredentials,
  ERROR_MESSAGE,
} from "../../fixtures";

test.describe("login API tests", () => {
  let loginApi;

  test.beforeEach("instantiate POM", ({ page }) => {
    loginApi = new BaseLoginAPI(page);
  });

  test("should not be able to login with empty payload properties", async () => {
    const credentials = generateUserCredentials(0);
    const response = await loginApi.login({
      email: credentials.email,
      password: credentials.password,
    });

    expect(response.message).toBe(ERROR_MESSAGE["INVALID_EMAIL"]);
  });

  test("should be abel to login with valid data", async () => {
    const response = await loginApi.login(VALID_LOGIN_PAYLOAD);

    console.log("RESPONSE", response);
    expect(response.status).toBe(STATUS["SUCCESS"]);
    expect(response.user.email).toBe(VALID_LOGIN_PAYLOAD.email);
  });
});
