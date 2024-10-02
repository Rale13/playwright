import { test, expect } from "@playwright/test";
import {
  generateUserCredentials,
  HEADINGS,
  URLS,
  ERRORS,
  utils,
} from "../fixtures";
import { RegisterPage } from "../pom/modules/ui/registerPage";
import { LoginPage } from "../pom/modules/ui/loginPage";

let loginPage;
let registerPage;
//generate random user credentials
const { username, email, pass, registerdUser, registerdEmail } =
  generateUserCredentials(5);
let loginEmail = email;
let loginPassword = pass;

test.describe.configure({ mode: "serial" });

test.describe("register", async () => {
  test.beforeEach("visi page and validte", async ({ page }) => {
    //visit page and validate
    await page.goto(URLS["REGISTER"]);
    //initiate POM class
    registerPage = new RegisterPage(page);
  });
  //negative cases
  test("empty username", async ({ page }) => {
    //initiate POM class
    registerPage.emptyUsername(email, pass);
    //verify error message and url
    await expect(registerPage.errorMessage).toBeVisible();
    await expect(registerPage.errorMessage).toHaveText(ERRORS["USERNAME"]);
    await expect(page).toHaveURL(URLS["REGISTER"]);
  });

  test("empty email", async ({ page }) => {
    //initiate POM class
    registerPage.emptyEmail(username, pass);
    //verify error message and url
    await expect(registerPage.errorMessage).toBeVisible();
    await expect(registerPage.errorMessage).toHaveText(ERRORS["EMAIL"]);
    await expect(page).toHaveURL(URLS["REGISTER"]);
  });

  test("empty password", async ({ page }) => {
    //initiate POM class
    registerPage.emptyPassword(username, email);
    //verify error message and url
    await expect(registerPage.errorMessage).toBeVisible();
    await expect(registerPage.errorMessage).toHaveText(ERRORS["PASSWORD"]);
    await expect(page).toHaveURL(URLS["REGISTER"]);
  });

  test("existing username", async ({ page }) => {
    //fill in form and submit
    registerPage.register(registerdUser, email, pass);
    //verify error message and url
    await expect(registerPage.errorMessage).toBeVisible();
    await expect(registerPage.errorMessage).toHaveText(ERRORS["TAKEN_USER"]);
    await expect(page).toHaveURL(URLS["REGISTER"]);
  });

  test("existing email", async ({ page }) => {
    //fill in form and submit
    registerPage.register(username, registerdEmail, pass);
    //verify error message and url
    await expect(registerPage.errorMessage).toBeVisible();
    await expect(registerPage.errorMessage).toHaveText(ERRORS["TAKEN_EMAIL"]);
    await expect(page).toHaveURL(URLS["REGISTER"]);
  });

  test("invalid email", async ({ page }) => {
    //fill in form and submit
    registerPage.register(username, username, pass);
    //verify error message and url
    await expect(registerPage.errorMessage).toBeVisible();
    await expect(registerPage.errorMessage).toHaveText(ERRORS["INVALID_EMAIL"]);
    await expect(page).toHaveURL(URLS["REGISTER"]);
  });
  test("register user", async ({ page }) => {
    //validate page
    await expect(registerPage.heading).toBeVisible();
    await expect(registerPage.heading).toHaveText(HEADINGS["REGISTER"]);
    //fill in form and submit
    registerPage.register(username, email, pass);
    //wait for and verify redirect
    await page.waitForURL(URLS["DASHBOARD"]);
    await expect(page.getByText(HEADINGS["DASHBOARD"])).toBeVisible();
  });
});
test.describe("login", async () => {
  test("Login user", async ({ page }) => {
    //instantiate POM class
    const loginPage = new LoginPage(page);
    //visit app and validate
    await page.goto(URLS["LOGIN"]);
    await expect(loginPage.heading).toBeVisible();
    await expect(loginPage.heading).toHaveText(HEADINGS["LOGIN"]);
    //fill in form and submit
    loginPage.login(loginEmail, loginPassword);
    //wait for and verify redirect
    await page.waitForURL(URLS["DASHBOARD"]);
    await expect(page.getByText(HEADINGS["DASHBOARD"])).toBeVisible();
  });
});
