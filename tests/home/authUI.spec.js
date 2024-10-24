import { test, expect } from "@playwright/test";
import { userData, HEADINGS, URLS, ERRORS } from "../../fixtures";
import { RegisterPage } from "../../pom/modules/ui/registerPage";
import { LoginPage } from "../../pom/modules/ui/loginPage";

let loginPage;
let registerPage;
const {
  username,
  email,
  password,
  registeredUser,
  registeredEmail,
  invalidEmail,
} = userData.generateUserCredentials(5);
let loginEmail = email;
let loginPassword = password;

test.describe.configure({ mode: "serial" });

test.describe("register", () => {
  test.beforeEach("visi page and validte", async ({ page }) => {
    //visit page and validate
    await page.goto(URLS["REGISTER"]);
    //Instantiate POM class
    registerPage = new RegisterPage(page);
  });

  //negative cases
  test("Shouldn't be able to register without username", async ({ page }) => {
    //Instantiate POM class
    registerPage.emptyUsername(email, password);
    //verify error message and url
    await expect(registerPage.errorMessage).toBeVisible();
    await expect(registerPage.errorMessage).toHaveText(ERRORS["USERNAME"]);
    await expect(page).toHaveURL(URLS["REGISTER"]);
  });

  test("Shouldn't be able to register without email", async ({ page }) => {
    //Instantiate POM class
    registerPage.emptyEmail(username, password);
    //verify error message and url
    await expect(registerPage.errorMessage).toBeVisible();
    await expect(registerPage.errorMessage).toHaveText(ERRORS["EMAIL"]);
    await expect(page).toHaveURL(URLS["REGISTER"]);
  });

  test("Shouldn't be able to register without password", async ({ page }) => {
    //Instantiate POM class
    registerPage.emptyPassword(username, email);
    //verify error message and url
    await expect(registerPage.errorMessage).toBeVisible();
    await expect(registerPage.errorMessage).toHaveText(ERRORS["PASSWORD"]);
    await expect(page).toHaveURL(URLS["REGISTER"]);
  });

  test("Shouldn't be able to register with registered username", async ({
    page,
  }) => {
    //Instantiate POM class
    registerPage.register(registeredUser, email, password);
    //verify error message and url
    await expect(registerPage.errorMessage).toBeVisible();
    await expect(registerPage.errorMessage).toHaveText(ERRORS["TAKEN_USER"]);
    await expect(page).toHaveURL(URLS["REGISTER"]);
  });

  test("Shouldn't be able to register with registered email", async ({
    page,
  }) => {
    //Instantiate POM class
    registerPage.register(username, registeredEmail, password);
    //verify error message and url
    await expect(registerPage.errorMessage).toBeVisible();
    await expect(registerPage.errorMessage).toHaveText(ERRORS["TAKEN_EMAIL"]);
    await expect(page).toHaveURL(URLS["REGISTER"]);
  });

  test("Shouldn't be able to register with email of invalid format", async ({
    page,
  }) => {
    //Instantiate POM class
    registerPage.register(username, username, password);
    //verify error message and url
    await expect(registerPage.errorMessage).toBeVisible();
    await expect(registerPage.errorMessage).toHaveText(ERRORS["INVALID_EMAIL"]);
    await expect(page).toHaveURL(URLS["REGISTER"]);
  });

  test("register user", async ({ page }) => {
    //validate page
    await expect(registerPage.heading).toBeVisible();
    await expect(registerPage.heading).toHaveText(HEADINGS["REGISTER"]);
    //Instantiate POM class
    registerPage.register(username, email, password);
    //wait for and verify redirect
    await page.waitForURL(URLS["DASHBOARD"]);
    await expect(page.getByText(HEADINGS["DASHBOARD"])).toBeVisible();
  });
});

test.describe("login", () => {
  test.beforeEach("visi page and validte", async ({ page }) => {
    //visit page and validate
    await page.goto(URLS["LOGIN"]);
    //Instantiate POM class
    loginPage = new LoginPage(page);
  });

  test("Shouldn't be able to login without email", async ({ page }) => {
    //Instantiate POM class
    loginPage.emptyEmail(loginPassword);
    //verify error message and url
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toHaveText(ERRORS["EMAIL"]);
    await expect(page).toHaveURL(URLS["LOGIN"]);
  });

  test("Shouldn't be able to login without password", async ({ page }) => {
    //Instantiate POM class
    loginPage.emptyPassword(loginEmail);
    //verify error message and url
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toHaveText(ERRORS["PASSWORD"]);
    await expect(page).toHaveURL(URLS["LOGIN"]);
  });

  test("Shouldn't be able to login with invalid email", async ({ page }) => {
    //Instantiate POM class
    loginPage.login(invalidEmail, loginPassword);
    //verify error message and url
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toHaveText(ERRORS["INVALID_EP"]);
    await expect(page).toHaveURL(URLS["LOGIN"]);
  });

  test("Shouldn't be able to login with invalid password", async ({ page }) => {
    //Instantiate POM class
    loginPage.login(loginEmail, invalidEmail);
    //verify error message and url
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toHaveText(ERRORS["INVALID_EP"]);
    await expect(page).toHaveURL(URLS["LOGIN"]);
  });

  test("Shouldn't be able to login with email of invalid format", async ({
    page,
  }) => {
    //Instantiate POM class
    loginPage.login(username, password);
    //verify error message and url
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toHaveText(ERRORS["INVALID_EMAIL_L"]);
    await expect(page).toHaveURL(URLS["LOGIN"]);
  });

  test("Login user", async ({ page }) => {
    //visit app and validate
    await expect(loginPage.heading).toBeVisible();
    await expect(loginPage.heading).toHaveText(HEADINGS["LOGIN"]);
    //fill in form and submit
    loginPage.login(loginEmail, loginPassword);
    //wait for and verify redirect
    await page.waitForURL(URLS["DASHBOARD"]);
    await expect(page.getByText(HEADINGS["DASHBOARD"])).toBeVisible();
  });
});
