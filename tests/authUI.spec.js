import { test, expect } from "@playwright/test";
import { generateUserCredentials, HEADINGS, URLS, ERRORS} from "../fixtures";
import { RegisterPage } from "../pom/modules/ui/registerPage";
import { LoginPage } from "../pom/modules/ui/loginPage";

let loginPage;
let registerPage;
//generate random user credentials
const { username, email, pass, registerdUser, registerdEmail, invalidEmail } = generateUserCredentials(5);
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
    //initiate POM class
    registerPage.register(registerdUser, email, pass);
    //verify error message and url
    await expect(registerPage.errorMessage).toBeVisible();
    await expect(registerPage.errorMessage).toHaveText(ERRORS["TAKEN_USER"]);
    await expect(page).toHaveURL(URLS["REGISTER"]);
  });

  test("existing email", async ({ page }) => {
    //initiate POM class
    registerPage.register(username, registerdEmail, pass);
    //verify error message and url
    await expect(registerPage.errorMessage).toBeVisible();
    await expect(registerPage.errorMessage).toHaveText(ERRORS["TAKEN_EMAIL"]);
    await expect(page).toHaveURL(URLS["REGISTER"]);
  });

  test("invalid email", async ({ page }) => {
    //initiate POM class
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
    //initiate POM class
    registerPage.register(username, email, pass);
    //wait for and verify redirect
    await page.waitForURL(URLS["DASHBOARD"]);
    await expect(page.getByText(HEADINGS["DASHBOARD"])).toBeVisible();
  });
});

test.describe("login", async () => {
  test.beforeEach("visi page and validte", async ({ page }) => {
    //visit page and validate
    await page.goto(URLS["LOGIN"]);
    //initiate POM class
    loginPage = new LoginPage(page);
  });

  test("empty email", async ({ page }) => {
    //initiate POM class
    loginPage.emptyEmail(loginPassword);
    //verify error message and url
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toHaveText(ERRORS["EMAIL"]);
    await expect(page).toHaveURL(URLS["LOGIN"]);
  });

  test("empty password", async ({ page }) => {
    //initiate POM class
    loginPage.emptyPassword(loginEmail);
    //verify error message and url
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toHaveText(ERRORS["PASSWORD"]);
    await expect(page).toHaveURL(URLS["LOGIN"]);
  });

  test("wrong email", async ({ page }) => {
    //initiate POM class
    loginPage.login(invalidEmail, loginPassword);
    //verify error message and url
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toHaveText(ERRORS["INVALID_EP"]);
    await expect(page).toHaveURL(URLS["LOGIN"]);
  });

  test("wrong password", async ({ page }) => {
    //initiate POM class
    loginPage.login(loginEmail, invalidEmail);
    //verify error message and url
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toHaveText(ERRORS["INVALID_EP"]);
    await expect(page).toHaveURL(URLS["LOGIN"]);
  });

  test("invalid email format", async ({ page }) => {
    //initiate POM class
    loginPage.login(username, pass);
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
