const { test, expect } = require("@playwright/test");

test.describe("title", async () => {
  test.beforeEach("visit app", async ({ page }) => {
    await page.goto("https://automaticityacademy.ngrok.app/");
  });

  test("get by - full expression", async ({ page }) => {
    await expect(
      page.locator("span[class='text-5xl font-bold']")
    ).toBeVisible();
    await expect(page.locator("span[class='text-5xl font-bold']")).toHaveText(
      "AQA eShop"
    );
  });

  test("get by - specific class", async ({ page }) => {
    await expect(page.locator(".text-5xl")).toBeVisible();
    await expect(page.locator(".text-5xl")).toHaveText("AQA eShop");
  });

  test("get by -order", async ({ page }) => {
    //first()
    await expect(page.locator("span").first()).toBeVisible();
    await expect(page.locator("span").first()).toHaveText("AQA eShop");

    //nth()
    await expect(page.locator("span").nth(0)).toBeVisible();
    await expect(page.locator("span").nth(0)).toHaveText("AQA eShop");
  });

  test("get by -relation", async ({ page }) => {
    await expect(
      page.locator(
        "div[class='col-12 md:t-4 sm:t-2 md:col-6 p-6'] > section > span"
      )
    ).toBeVisible();
    await expect(
      page.locator(
        "div[class='col-12 md:t-4 sm:t-2 md:col-6 p-6'] > section > span"
      )
    ).toHaveText("AQA eShop");
  });

  //playwright built in locators
  test("get by -text", async ({ page }) => {
    await expect(page.getByText("AQA eShop")).toBeVisible();
  });

  test("get by -role", async ({ page }) => {
    await page.getByRole("link", { name: "Log in" }).click();
    await expect(page.locator("h1")).toHaveText("Welcome Back! 👋🏻");
  });

  test("get by -labe", async ({ page }) => {
    await page.getByRole("link", { name: "Log in" }).click();
    await expect(page.locator("h1")).toHaveText("Welcome Back! 👋🏻");

    await expect(page.getByLabel("Sign in")).toBeVisible();
  });
});

test.describe("subtitle", async () => {
  test.beforeEach("visit app", async ({ page }) => {
    await page.goto("https://automaticityacademy.ngrok.app/");
  });

  test("get by full expression", async ({ page }) => {
    await expect(
      page.locator("div[class='text-xl text-primary']")
    ).toBeVisible();
    await expect(page.locator("div[class='text-xl text-primary']")).toHaveText(
      "...test your automation skills"
    );
  });

  test("get by -order", async ({ page }) => {
    await expect(page.locator("div").nth(10)).toBeVisible();
    await expect(page.locator("div").nth(10)).toHaveText(
      "...test your automation skills"
    );
  });

  test("get by -class", async ({ page }) => {
    await expect(page.locator(".text-xl").first()).toBeVisible();
    await expect(page.locator(".text-xl").first()).toHaveText(
      "...test your automation skills"
    );
  });
});
