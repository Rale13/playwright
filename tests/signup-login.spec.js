import { test, expect } from "@playwright/test";

test.describe("register", async () => {
  //helper function to generate random username
  function generateRandomUsername() {
    const randomString = Math.random().toString(36).substring(2, 8);
    return `${randomString}`;
  }
  const randomUsername = generateRandomUsername();

  test("Register user", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Register" }).click();

    //add user name and assert it's populated with right value
    await page.locator("#username").click();
    await page.locator("#username").fill(randomUsername);
    await expect(page.locator("#username")).toHaveValue(randomUsername);

    //add email and assert it's populated with right value
    await page.locator("#email").click();
    await page.locator("#email").fill("ra@g.com");
    await expect(page.locator("#email")).toHaveValue("ra@g.com");

    //add password and assert it's populated with right value
    await page.locator("#password").click();
    await page.locator("#password").fill("Test1234");
    await expect(page.locator("#password")).toHaveValue("Test1234");

    await page.getByLabel("Register").click();
  });
});
test.describe("login", async () => {
  test("Login user", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Log in" }).click();

    //add email and assert it's populated with right value
    await page.locator("#email").click();
    await page.locator("#email").fill("ra@g.com");
    await expect(page.locator("#email")).toHaveValue("ra@g.com");

    //add password and assert it's populated with right value
    await page.locator("#password").click();
    await page.locator("#password").fill("Test1234");
    await expect(page.locator("#password")).toHaveValue("Test1234");

    await page.getByLabel("Sign In").click();
    await expect(page.getByText("Buy some stuff bruh")).toBeVisible();
  });
});
