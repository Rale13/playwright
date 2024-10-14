import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pom/modules/ui/loginPage";
import { URLS } from "../../fixtures";

let webContext;

test.describe("test saved state", () => {
  test.beforeAll("create context and log in", async ({ browser }) => {
    // initialize context
    const context = await browser.newContext();
    const page = await context.newPage();
    const logingPage = new LoginPage(page);

    await page.route("**/api/v1/auth/login", async (route, request) => {
      console.log("DATA", request.postData());

    //   await page.route("**/*", async (route, request) => {
    //     console.log("DATA", request.url());

      await route.continue();
    });

    //UI login
    await page.goto(URLS["LOGIN"]);
    await logingPage.login("rale13@gmail.com", "Test1234");
    await expect(page.getByText("Buy some stuff bruh")).toBeVisible();

    // save state
    await context.storageState({ path: "state.json" });

    //inject state
    webContext = await browser.newContext({ storageState: "state.json" });
  });

  test.only("numero uno", async () => {
    const page = await webContext.newPage();
    await page.goto(URLS["DASHBOARD"]);
    await expect(page.getByText("Buy some stuff bruh")).toBeVisible();
  });
});
