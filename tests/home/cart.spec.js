import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pom/modules/ui/loginPage";
import { Dashboard } from "../../pom/modules/ui/dashboard";
import { Headers } from "../../pom/modules/ui/header";
import { userData, URLS } from "../../fixtures";

let dashboard, loginPage, headers, cards;
const { registeredEmail, registeredPassword } =
  userData.generateUserCredentials();

test.describe("dashboard tests", () => {
  test.beforeAll("log in", async ({ browser }) => {
    const page = await browser.newPage();
    await page.goto(URLS["LOGIN"]);
    //instantiate pom's
    loginPage = new LoginPage(page);
    dashboard = new Dashboard(page);
    headers = new Headers(page);
    //log in
    loginPage.login(registeredEmail, registeredPassword);
    //assert that all elements are loaded
    await page.waitForURL(URLS["DASHBOARD"]);
    await page.waitForSelector(headers.loader, { state: "hidden" });
    cards = dashboard.productLocator;
  });

  test('Add product to cart', async ({ page }) => {
    const products = await dashboard.getProductData(dashboard);
    const availableProducts = products.filter((product) => !product.cartButton.disabled);
    expect(availableProducts.length).toBeGreaterThan(0);
    const randomProduct = availableProducts[Math.floor(Math.random() * availableProducts.length)];
    await randomProduct.cartButton.cartButton.click();
    console.log(dashboard.toastMessage)
    await page.waitForSelector(dashboard.toastMessage, { state: "visible" });
    await expect(dashboard.toastMessage).toHaveText("Product added successfully!")
  });


})