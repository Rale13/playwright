import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pom/modules/ui/loginPage";
import { Dashboard } from "../../pom/modules/ui/dashboard";
import { generateUserCredentials, URLS, HEADINGS } from "../../fixtures";

let dashboar;
let loginPage;

const { registeredEmail, registeredPass } = generateUserCredentials();

test.describe("dashboar tests", () => {
  test.beforeEach("log in", async ({ page }) => {
    await page.goto(URLS["LOGIN"]);
    //Instantiate POM class
    loginPage = new LoginPage(page);
    dashboar = new Dashboard(page);
    loginPage.login(registeredEmail, registeredPass);
    await expect(page.getByText(HEADINGS["DASHBOARD"])).toBeVisible();
  });

  test("gear icon should be visible", async ({ page }) => {
    await expect(dashboar.gearLocator).toBeVisible();
  });

  test("filter list should be in viewport", async () => {
    await expect(dashboar.filter).toBeInViewport();
  });

  test("there should be 12 items per page", async () => {
    await expect(dashboar.productLocator).toHaveCount(12);
  });

  test("there should be 12 products on the second page", async ({ page }) => {
    await dashboar.pagButton.click();
    await expect(dashboar.productLocator).toHaveCount(12);
  });
});
