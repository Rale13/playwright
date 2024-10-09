import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pom/modules/ui/loginPage";
import { Dashboard, getProductElements } from "../../pom/modules/ui/dashboard";
import { generateUserCredentials, URLS } from "../../fixtures";

let dashboard;
let loginPage;
let cards;
const { registeredEmail, registeredPass } = generateUserCredentials();

test.describe("dashboard tests", () => {
  test.beforeAll("log in", async ({ browser }) => {
    const page = await browser.newPage();
    await page.goto(URLS["LOGIN"]);
    //instantiate pom's
    loginPage = new LoginPage(page);
    dashboard = new Dashboard(page);
    //log in
    loginPage.login(registeredEmail, registeredPass);
    //assert that right page is opened
    await page.waitForURL(URLS["DASHBOARD"]);
    await page.waitForSelector(dashboard.loader, { state: "hidden" });
    cards = dashboard.productLocator;
  });

  test("gear icon should be visible", async () => {
    await expect(dashboard.gearLocator).toBeVisible();
  });

  test("filter list should be in viewport", async () => {
    await expect(dashboard.filter).toBeInViewport();
  });

  test("product cards title should not be empty", async () => {
    const titles = await getProductElements(
      dashboard.productLocator,
      dashboard.productTitle
    );
    titles.forEach((title) => {
      expect(title).toBeDefined();
    });
  });

  test("product title should be visible", async () => {
    const titles = await getProductElements(
      dashboard.productLocator,
      dashboard.productTitle
    );
    titles.forEach((title) => {
      expect(title).toBeTruthy();
    });
  });

  test("product cards should have an image", async () => {
    const images = await getProductElements(
      dashboard.productLocator,
      dashboard.productImg
    );
    images.forEach((image) => {
      expect(image).toBeTruthy();
    });
  });

  test("product cards should have a price", async () => {
    const prices = await getProductElements(
      dashboard.productLocator,
      dashboard.productPrice
    );
    prices.forEach((price) => {
      expect(price).toBeTruthy();
    });
  });

  test("product cards should have a cart button", async () => {
    const cardBtns = await getProductElements(
      dashboard.productLocator,
      dashboard.productCartBtn
    );
    cardBtns.forEach((cardBtn) => {
      expect(cardBtn).toBeTruthy();
    });
  });

  test("there should be 12 products on first page", async () => {
    const cardCount = await cards.count();
    expect(cardCount).toBe(12);
  });

  test("there should be 12 products on second page", async ({ page }) => {
    await dashboard.pagButton.click();
    const cardCount = await cards.count();
    expect(cardCount).toBe(12);
  });
});
