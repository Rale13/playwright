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

  test("filter list should be in viewport", async () => {
    await expect(dashboard.filter).toBeInViewport();
  });

  test("product cards should be visible", async () => {
    const allCards = await dashboard.getProductElements(cards, cards);
    allCards.forEach((card) => {
      expect(card).toBeTruthy();
    });
  });

  test("there should be 12 product cards on the first page", async () => {
    const cardCount = await cards.count();
    expect(cardCount).toBe(12);
  });

  test("there should be 12 different products on the second page", async ({
    page,
  }) => {
    const firstPageData = await dashboard.getProductData(dashboard);
    await dashboard.switchBetweenPages(page, dashboard, 1);
    const secondPageData = await dashboard.getProductData(dashboard);
    expect(firstPageData).not.toEqual(secondPageData);
  });

  test("product cards title should not be empty", async () => {
    const titles = await dashboard.getProductElements(
      cards,
      dashboard.productTitle
    );
    titles.forEach((title) => {
      expect(title).toBeDefined();
    });
  });

  test("product title should be visible", async () => {
    const titles = await dashboard.getProductElements(
      cards,
      dashboard.productTitle
    );
    titles.forEach((title) => {
      expect(title).toBeTruthy();
    });
  });

  test("product cards should have an image", async () => {
    const images = await dashboard.getProductElements(
      cards,
      dashboard.productImg
    );
    images.forEach((image) => {
      expect(image).toBeTruthy();
    });
  });

  test("product cards should have a price", async () => {
    const prices = await dashboard.getProductElements(
      cards,
      dashboard.productPrice
    );
    prices.forEach((price) => {
      expect(price).toBeTruthy();
    });
  });

  test("product cards should have a cart button", async () => {
    const cardBtns = await dashboard.getProductElements(
      cards,
      dashboard.productCartBtn
    );
    cardBtns.forEach((cardBtn) => {
      expect(cardBtn).toBeTruthy();
    });
  });

  test("out of stock items should have dissabled cart button", async ({
    page,
  }) => {
    const allProducts = await dashboard.collectAllProductsData(page, dashboard);
    const outOfStockProducts = allProducts.filter(
      (product) => product.cartButton.disabled
    );
    outOfStockProducts.forEach((product) => {
      expect(product.cartButton.disabled).toBe(true);
    });
  });
});
