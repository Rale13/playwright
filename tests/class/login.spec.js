import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pom/modules/ui/loginPage";

let loginPage;

test.describe("login", () => {
  test.beforeEach("visi page and validte", async ({ page }) => {
    await page.goto("/login");
    await expect(page).toHaveURL(/.*login/);
    loginPage = new LoginPage(page);
  });

  test("for text input should be editable", async () => {
    await expect(loginPage.emailInput).toBeEditable();
    await expect(loginPage.passwordInput).toBeEditable();
  });

  test("form sould have 2 text inputs", async ({ page }) => {
    // >> if element is not direct child
    await expect(page.locator("form >> input")).toHaveCount(2);
  });

  test("form type input should have same classes", async () => {
    let classesToAssert = "w-full rounded p-inputtext p-component";

    await expect(loginPage.emailInput).toHaveClass(classesToAssert);
    await expect(loginPage.passwordInput).toHaveClass(classesToAssert);
  });

  test("form text input should both have id attributes", async () => {
    await expect(loginPage.emailInput).toHaveId("email");
    await expect(loginPage.passwordInput).toHaveId("password");
  });

  test("form text input should both have placeholder attributes", async () => {
    await expect(loginPage.emailInput).toHaveAttribute("placeholder");
    await expect(loginPage.passwordInput).toHaveAttribute("placeholder");
  });

  test("form text inputs should both have attribute with value", async () => {
    const emailPlaceholder = "Email address";
    const passwordPlaceholder = "Password";
    await expect(loginPage.emailInput).toHaveAttribute(
      "placeholder",
      emailPlaceholder
    );
    await expect(loginPage.passwordInput).toHaveAttribute(
      "placeholder",
      passwordPlaceholder
    );
  });

  test("form input fields have values when typed into", async () => {
    const emailValue = "test@gmail.com";
    const passValue = "test1234";

    await loginPage.emailInput.fill(emailValue);
    await expect(loginPage.emailInput).toHaveValue(emailValue);

    await loginPage.passwordInput.fill(passValue);
    await expect(loginPage.passwordInput).toHaveValue(passValue);
  });

  test("form text inputs should be enabled", async () => {
    await expect(loginPage.emailInput).toBeEnabled();
    await expect(loginPage.passwordInput).toBeEnabled();
  });

  test("form submit button should be enabled", async () => {
    await expect(loginPage.submitButton).toBeEnabled();
  });

  test("form input should be focused", async () => {
    await loginPage.emailInput.click();
    await expect(loginPage.emailInput).toBeFocused();

    await loginPage.passwordInput.click();
    await expect(loginPage.passwordInput).toBeFocused();
  });

  test("form texts input fields should be empty", async () => {
    await expect(loginPage.emailInput).toBeEmpty();
    await expect(loginPage.passwordInput).toBeEmpty();
  });

  test("form with all elements should be in viewport", async ({ page }) => {
    await expect(page.locator("form")).toBeInViewport();
    await expect(page.locator("form >> input").nth(0)).toBeInViewport();
    await expect(page.locator("form >> input").nth(1)).toBeInViewport();
    await expect(page.locator("form >> button")).toBeInViewport();
  });


});
