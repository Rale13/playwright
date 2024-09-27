const { test, expect } = require("@playwright/test");
const exp = require("constants");

test.describe("register", async () => {
  test("Register user", async ({ page }) => {
    await page.goto("https://automaticityacademy.ngrok.app/");
    await page.getByRole("link", { name: "Register" }).click();

    //add user name and assert it's populated with right value
    await page.locator("#username").click();
    await page.locator("#username").fill("Rale66");
    await expect(page.locator("#username")).toHaveValue("Rale2");

    //add email and assert it's populated with right value
    await page.locator("#email").click();
    await page.locator("#email").fill("rale12@gmail.com");
    await expect(page.locator("#email")).toHaveValue("rale12@gmail.com");

    //add password and assert it's populated with right value
    await page.locator("#password").click();
    await page.locator("#password").fill("Test1234");
    await expect(page.locator("#password")).toHaveValue("Test1234");

    await page.getByLabel("Register").click();
  });
});

test.describe("login", async () => {
  test("Login user", async ({ page }) => {
    await page.goto("https://automaticityacademy.ngrok.app/");
    await page.getByRole("link", { name: "Log in" }).click();

    //add email and assert it's populated with right value
    await page.locator("#email").click();
    await page.locator("#email").fill("rale@gmail.com");
    await expect(page.locator("#email")).toHaveValue("rale@gmail.com");

    //add password and assert it's populated with right value
    await page.locator("#password").click();
    await page.locator("#password").fill("Test1234");
    await expect(page.locator("#password")).toHaveValue("Test1234");

    await page.getByLabel("Sign In").click();
    await expect(page.getByText("Buy some stuff bruh")).toBeVisible();
  });
});
