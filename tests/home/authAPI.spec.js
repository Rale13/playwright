import { test, expect } from "@playwright/test";
import { RegisterAPI } from "../../pom/modules/api/registerAPI";
import { LoginAPI } from "../../pom/modules/api/loginAPI";
import { STATUS, ERRORS, userData} from "../../fixtures";

let loginAPI;
let registerAPI;

test.describe("Registration API tests", () => {
  test.beforeEach("start pom", async ({ page }) => {
    registerAPI = new RegisterAPI(page);
  });

  //negative cases
  test("Shouldn't be able to register without username", async () => {
    const response = await registerAPI.register(userData.REGISTER_EMPTY_USERNAME);
    expect(response.message).toBe(ERRORS["USERNAME"]);
  });

  test("Shouldn't be able to register without email", async () => {
    const response = await registerAPI.register(userData.REGISTER_EMPTY_EMAIL);
    expect(response).toHaveProperty("message", ERRORS["EMAIL"]);
  });

  test("Shouldn't be able to register without password", async () => {
    const response = await registerAPI.register(userData.REGISTER_EMPTY_PASSWORD)
    expect(response).toHaveProperty("message", ERRORS["PASSWORD"]);
  });

  test("Shouldn't be able to register with registered username", async () => {
    const response = await registerAPI.register(userData.REGISTERED_USER_PAYLOAD);
    expect(response).toHaveProperty("message", ERRORS["TAKEN_USER"]);
  });

  test("Shouldn't be able to register with registered email", async () => {
    const response = await registerAPI.register(userData.REGISTERED_EMAIL_PAYLOAD);
    expect(response.message).toBe(ERRORS["TAKEN_EMAIL"]);
  });

  test("Shouldn't be able to register with email of invalid format", async () => {
    const response = await registerAPI.register(userData.INVALID_EMALI_PAYLOAD);
    expect(response).toHaveProperty("message", ERRORS["INVALID_EMAIL"]);
  });

  test("should be able to register with valid credentials", async () => {
    const response = await registerAPI.register(userData.generateUserCredentials(8));
    expect(response.status).toBe(STATUS["SUCCESS"]);
    expect(response.auth).toHaveProperty("token");
  });
});


test.describe("Login API tests", () => {
  test.beforeEach("start pom", async ({ page }) => {
    loginAPI = new LoginAPI(page);
  });

  test("Shouldn't be able to login without email", async () => {
    const response = await loginAPI.login(userData.LOGIN_EMPTY_EMAIL);
    expect(response).toHaveProperty("message", ERRORS["EMAIL"]);
  });

  test("Shouldn't be able to login without password", async () => {
    const response = await loginAPI.login(userData.LOGIN_EMPTY_PASSWORD);
    expect(response).toHaveProperty("message", ERRORS["PASSWORD"]);
  });

  test("Shouldn't be able to login with invalid email", async () => {
    const response = await loginAPI.login(userData.LOGIN_INVALID_EMAIL);
    expect(response).toHaveProperty("error", STATUS["UNAUTHORIZED"]);
  });

  test("Shouldn't be able to login with invalid password", async () => {
    const response = await loginAPI.login(userData.LOGIN_INVALID_PASSWORD);
    expect(response).toHaveProperty("error", STATUS["UNAUTHORIZED"]);
  });

  test("Shouldn't be able to login with email of invalid format", async () => {
    const response = await loginAPI.login(userData.LOGIN_INVALID_EMAIL_FORMAT);
    expect(response).toHaveProperty("message", ERRORS["INVALID_EMAIL_L"]);
  });

  test("should be able to login with valid data", async () => {
    const response = await loginAPI.login(userData.VALID_LOGIN_PAYLOAD);
    expect(response.status).toBe(STATUS["SUCCESS"]);
    expect(response.user.email).toBe(userData.VALID_LOGIN_PAYLOAD.email);
  });
});
