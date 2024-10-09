export class Dashboard {
  constructor(page) {
    this.page = page;
    this.gearLocator = page.locator("[src='/images/logo/-white.png']");
    this.filter = page.locator(
      "ul[class='layout-menu sm:w-48 md:w-72 bg-gray-200 rounded h-max']"
    );
    this.productLocator = page.locator("[test-id='product-card']");
    this.productTitle = page.locator("h5");
    this.productImg = page.locator("img")
    this.productPrice = page.locator("div[class='flex justify-between px-3 py-1 border-t-2 border-t-gray-300 bg-gray-100']");
    this.productCartBtn = page.locator("button[class='p-button p-component']")
    this.pagButton = page.getByLabel("2");
    this.loader = ("div[class='h-48 w-48']");
  }
}

// hellper functions to get product elements
export const getProductElements = async (productLocator, elementLocator) => {
  const productCards = productLocator;
  const cardCount = await productCards.count();
  const elements = [];
  for (let i = 0; i < cardCount; i++) {
    const element = productCards.nth(i).locator(elementLocator);
    elements.push(element);
  }
  return elements;
}

