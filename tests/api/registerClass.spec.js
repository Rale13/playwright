import { test, expect } from "@playwright/test";
import { BaseRegisterAPI } from "../../pom/modules/api/basicRegisterAPI";
import { STATUS, userData} from "../../fixtures";

test.describe("login API tests", () => {
  let registerApi;

  test.beforeEach("instantiate POM", ({ page }) => {
    registerApi = new BaseRegisterAPI(page);
  });

  test("should be abel to register with valid data", async () => {
    const response = await registerApi.register(userData.generateUserCredentials(8));
    expect(response.status).toBe(STATUS["SUCCESS"]);
  });
});
