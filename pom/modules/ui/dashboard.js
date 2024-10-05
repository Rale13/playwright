export class Dashboard {
  constructor(page) {
    this.page = page;
    this.gearLocator = page.locator("[src='/images/logo/-white.png']");
    this.productTitle = page.locator("h5");
    this.productLocator = page.locator("[test-id='product-card']");
    this.filter = page.locator("ul[class='layout-menu sm:w-48 md:w-72 bg-gray-200 rounded h-max']")
  }
}
