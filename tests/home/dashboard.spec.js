import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pom/modules/ui/loginPage";
import { Dashboard } from "../../pom/modules/ui/dashboard";
import { generateUserCredentials, URLS } from "../../fixtures";

let dashboar
let loginPage;

const { registeredEmail, registeredPass } = generateUserCredentials();

test.describe("dashboar tests", () => {
  test.beforeEach("log in", async ({ page }) => {
    await page.goto(URLS["LOGIN"]);
    //Instantiate POM class
    loginPage = new LoginPage(page);
    dashboar = new Dashboard(page);
    loginPage.login(registeredEmail, registeredPass);
    await page.waitForURL(URLS["DASHBOARD"]);
  });

  test("gear icon should be visible", async ({ page }) => {
    await expect(dashboar.gearLocator).toBeVisible();
  });

  test("there should be 12 items per page", async () => {
    await expect(dashboar.productLocator).toHaveCount(12);
  });

  test("filter list should be in viewport", async () => {
    await expect(dashboar.filter).toBeInViewport();
  })

});
