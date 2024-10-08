import { test, expect } from "@playwright/test";
import { userData, HEADINGS, URLS } from "../../fixtures";
import { RegisterPage } from "../../pom/modules/ui/registerPage";
import { LoginPage } from "../../pom/modules/ui/loginPage";

let loginEmail, loginPassword;

test.describe.configure({ mode: "serial" });

test.describe("register a user and log in", () => {
  test("register a user with valid data", async ({ page }) => {
    //generate random user credentials
    const { username, email, password } = userData.generateUserCredentials(5);
    loginEmail = email;
    loginPassword = password;

    //instantiate POM class
    const registerPage = new RegisterPage(page);

    //visit page and validate
    // await page.goto(URLS["REGISTER"]);
    // await expect(page.locator("h1")).toBeVisible();
    // await expect(page.locator("h1")).toHaveText(HEADINGS["REGISTER"]);

    await page.goto(URLS["REGISTER"]);
    await expect(registerPage.heading).toBeVisible();
    await expect(registerPage.heading).toHaveText(
      HEADINGS["REGISTER"]
    );

    // await page.locator("#username").fill(loginEmail);
    // await page.locator("#email").fill(loginEmail);
    // await page.locator("#password").fill(loginPassword);
    // await page.locator("button").click();

    //utils.fillAndSubmitForm(page, ["#username", "#email", "#password"], [username, email, pass])

    //fill in form and submit
    registerPage.register(username, email, password);

    //wait for and verify redirect
    await page.waitForURL(URLS["DASHBOARD"]);
    await expect(page.getByText(HEADINGS["DASHBOARD"])).toBeVisible();
  });

  test("login with registred user", async ({ page }) => {
    //instantiate POM class
    const loginPage = new LoginPage(page);

    //visit app and validate
    await page.goto(URLS["LOGIN"]);
    await expect(loginPage.heading).toBeVisible();
    await expect(loginPage.heading).toHaveText(HEADINGS["LOGIN"]);

    //fill in the form and submit
    // await page.locator("#email").fill(loginEmail);
    // await page.locator("#password").fill(loginPassword);
    // await page.locator("button").click();

    //utils.fillAndSubmitForm(page, ["#email", "#password"], [email, pass]);

    //fill in form and submit
    loginPage.login(loginEmail, loginPassword);

    //wait for and verify redirect
    await page.waitForURL(URLS["DASHBOARD"]);
    await expect(page.getByText(HEADINGS["DASHBOARD"])).toBeVisible();
  });
});
