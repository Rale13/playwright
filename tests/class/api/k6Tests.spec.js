import { test, expect } from "@playwright/test";
import { LoginAPI } from "../../../pom/modules/api/loginAPI";
import fs from "fs";

let loginAPI;

test.describe.configure({ mode: "serial" });

test.describe("login and extract toke", () => {
  let users = [
    { email: "rale@gmail.com", password: "Test1234" },
    { email: "rale13@gmail.com", password: "Test1234" },
    { email: "rale5@gmail.com", password: "TE1234" },
  ];

  let tokens = [];

  test.beforeEach("start pom", async ({ page }) => {
    loginAPI = new LoginAPI(page);
  });

  test("should be able to login user", async () => {
    for (let user of users) {
      const response = await loginAPI.loginViaBE(user.email, user.password);
      tokens.push(response.auth.token);
      expect(response).toHaveProperty("status", "Success");
      expect(response.auth).toHaveProperty("token");
    }
  });

  test("should write token value in file", async () => {
    fs.writeFileSync(
      "/home/automaticity-01/Desktop/playwright/fixtures/tokens.json",
      JSON.stringify(tokens)
    );
  });
});
