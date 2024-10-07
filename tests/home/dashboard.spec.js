import { test, expect} from "@playwright/test";
import { LoginPage } from "../../pom/modules/ui/loginPage";
import { Dashboard } from "../../pom/modules/ui/dashboard";
import { generateUserCredentials, URLS, HEADINGS, utils } from "../../fixtures";

let dashboard;
let loginPage;
let cards;
const { registeredEmail, registeredPass } = generateUserCredentials();

test.describe("dashboard tests", () => {
  test.beforeAll("log in", async ({browser}) => {
    const page = await browser.newPage();
    await page.goto(URLS["LOGIN"]);
    loginPage = new LoginPage(page);
    dashboard = new Dashboard(page);
    loginPage.login(registeredEmail, registeredPass);
    await expect (page.getByText(HEADINGS["DASHBOARD"])).toBeVisible();
    cards = await utils.iterateThroughElements(dashboard.productLocator, async (card) => {
      return card;
    });   
  });

  test("gear icon should be visible", async ({ page }) => {
    await expect(dashboard.gearLocator).toBeVisible();
  });

  test("filter list should be in viewport", async () => {
    await expect(dashboard.filter).toBeInViewport();
  });

  test("product card should have a title", async () => {
    for (const card of cards) {
      await expect(card).toHaveAttribute(dashboard.productTitle);
    }
  });

  test("product card should have an image", async () => {
    for (const card of cards) {
      await expect(card).toHaveAttribute(dashboard.productImg);
    }
  });

  test("product card should have a price", async () => {
    for (const card of cards) {
      await expect(card).toHaveAttribute(dashboard.productPrice);
    }
  });

  test("product card should have a cart button", async () => {
    for (const card of cards) {
      await expect(card).toHaveAttribute(dashboard.productCartBtn);
    }
  });

  test("there should be 12 products per page", async () => {
    for(const card of cards) {
      await expect(card).toHaveCount(12);
    } 
  });

  
});
