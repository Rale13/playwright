import { test, expect } from "@playwright/test";
import { generateUserCredentials, ERRORS } from "../fixtures";
import { RegisterAPI } from "../pom/modules/api/registerAPI";
import { LoginAPI } from "../pom/modules/api/loginAPI";

let loginAPI;
let registerAPI;
const { username, email, pass, registeredUser, registeredEmail ,invalidEmail} =
  generateUserCredentials(5);
let loginEmail = email;
let loginPassword = pass;

test.describe.configure({ mode: "serial" });

test.describe("Registration API tests", async () => {
  test.beforeEach("start pom", async ({ page }) => {
    registerAPI = new RegisterAPI(page);
  });

  //negative cases
  test("Shouldn't be able to register without username", async () => {
    const response = await registerAPI.registerWithoutUsername(email, pass);
    // Validate the registration response
    expect(response).toHaveProperty("message", ERRORS["USERNAME"]);
  });

  test("Shouldn't be able to register without email", async () => {
    const response = await registerAPI.registerWithoutEmail(username, pass);
    // Validate the registration response
    expect(response).toHaveProperty("message", ERRORS["EMAIL"]);
  });

  test("Shouldn't be able to register without password", async () => {
    const response = await registerAPI.registerWithoutPassword(username, email);
    // Validate the registration response
    expect(response).toHaveProperty("message", ERRORS["PASSWORD"]);
  });

  test("Shouldn't be able to register with registered username", async () => {
    const response = await registerAPI.registerViaBE(
      registeredUser,
      email,
      pass
    );
    // Validate the registration response
    expect(response).toHaveProperty("message", ERRORS["TAKEN_USER"]);
  });

  test("Shouldn't be able to register with registered email", async () => {
    const response = await registerAPI.registerViaBE(
      username,
      registeredEmail,
      pass
    );
    // Validate the registration response
    expect(response).toHaveProperty("message", ERRORS["TAKEN_EMAIL"]);
  });

  test("Shouldn't be able to register with email of invalid format", async () => {
    const response = await registerAPI.registerViaBE(username, username, pass);
    // Validate the registration response
    expect(response).toHaveProperty("message", ERRORS["INVALID_EMAIL"]);
  });

  test("register a new user via API", async () => {
    // Call the registerViaBE
    const response = await registerAPI.registerViaBE(username, email, pass);

    // Validate the registration response
    expect(response).toHaveProperty("status", "Success");
    expect(response.user).toHaveProperty("username", username);
    expect(response.auth).toHaveProperty("token");
  });
});


test.describe("Login API tests", async () => {
  test.beforeEach("start pom", async ({ page }) => {
    loginAPI = new LoginAPI(page);
  });

  test("Shouldn't be able to login without email", async () => {
    const response = await loginAPI.loginWithoutEmail(loginPassword);
    // Validate the registration response
    expect(response).toHaveProperty("message", ERRORS["EMAIL"]);
  });

  test("Shouldn't be able to login without password", async () => {
    const response = await loginAPI.loginWithoutPassowrd(loginEmail);
    // Validate the registration response
    expect(response).toHaveProperty("message", ERRORS["PASSWORD"]);
  });

  test("Shouldn't be able to login with invalid email", async () => {
    const response = await loginAPI.loginViaBE(invalidEmail, loginPassword);
    // Validate the registration response
    expect(response).toHaveProperty("error", "Unauthorized");
  });

  test("Shouldn't be able to login with invalid password", async () => {
    const response = await loginAPI.loginViaBE(loginEmail, username);
    // Validate the registration response
    expect(response).toHaveProperty("error", "Unauthorized");
  });

  test("Shouldn't be able to login with email of invalid format", async () => {
    const response = await loginAPI.loginViaBE(username, loginPassword);
    // Validate the registration response
    expect(response).toHaveProperty("message", ERRORS["INVALID_EMAIL_L"]);
  });

  test("login user via API", async () => {
    // Call the loginViaBE
    const response = await loginAPI.loginViaBE(loginEmail, loginPassword);
    // Validate the registration response
    expect(response).toHaveProperty("status", "Success");
    expect(response.auth).toHaveProperty("token");
  });
});
