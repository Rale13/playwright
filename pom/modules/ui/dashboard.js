export class Dashboard {
  constructor(page) {
    this.page = page;
    this.gearLocator = page.locator("[src='/images/logo/-white.png']");
    this.productTitle = page.locator("h5");
    this.productImg = page.locator("img")
    this.productLocator = page.locator("[test-id='product-card']");
    this.productPrice = page.locator("div[class='flex justify-between px-3 py-1 border-t-2 border-t-gray-300 bg-gray-100']");
    this.productCartBtn = page.locator("button[class='p-button p-component']")
    this.filter = page.locator(
      "ul[class='layout-menu sm:w-48 md:w-72 bg-gray-200 rounded h-max']"
    );
    
    this.pagButton = page.getByLabel("2");
    //this.loader = ("div[class='h-48 w-48']");
  }
}
