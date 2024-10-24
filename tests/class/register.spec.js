import { test, expect } from "@playwright/test";
import { RegisterPage } from "../../pom/modules/ui/registerPage";

let registerPage;

test.describe("register", () => {
  test.beforeEach("visi page and validte", async ({ page }) => {
    await page.goto("/register");
    await expect(page).toHaveURL(/.*register/);
    registerPage = new RegisterPage(page);
  });

  test("form text input fields shoul be empty", async () => {
    await expect(registerPage.usernameInput).toBeEmpty();
    await expect(registerPage.emailInput).toBeEmpty();
    await expect(registerPage.passwordInput).toBeEmpty();
  });

  test("form heading should be visible", async () => {
    await expect(registerPage.heading).toBeVisible();
  });

  test("form submit button should be visible", async ({ page }) => {
    await expect(registerPage.registerButton).toBeVisible();
  });

  test("gear button should have alt attribute", async ({ page }) => {
    const gearLocator = page.locator("[src='/images/logo/-white.png']");
    await expect(gearLocator).toHaveAttribute("alt", "logo");
  });

});
