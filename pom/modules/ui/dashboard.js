export class Dashboard {
  constructor(page) {
    this.page = page;
    this.filter = page.locator(".layout-menu");
    this.productLocator = page.locator("[test-id='product-card']");
    this.productTitle = page.locator("h5");
    this.productImg = page.locator("img");
    this.productDesc = page.locator(".text-sm.text-gray-600");
    this.productPrice = page.locator(
      "div[class='flex justify-between px-3 py-1 border-t-2 border-t-gray-300 bg-gray-100']"
    );
    this.productCartBtn = page.locator("button[class='p-button p-component']");
    this.dissabled = page.locator(".p-disabled");
    this.paginationLocator = page.locator(".paginated");
  }

  // hellper functions
  switchBetweenPages = async (page, dashboard, pageBtn) => {
    await dashboard.paginationLocator.locator("button").nth(pageBtn).click();
    await page.waitForTimeout(1500);
  };

  //extract individual elements from a product
  getProductElements = async (productLocator, elementLocator) => {
    const productCards = productLocator;
    const cardCount = await productCards.count();
    const elements = [];
    for (let i = 0; i < cardCount; i++) {
      const element = productCards.nth(i).locator(elementLocator);
      elements.push(element);
    }
    return elements;
  };

  //get data for products on single page
  getProductData = async (dashboard) => {
    const productData = [];
    const productCount = await dashboard.productLocator.count();

    for (let j = 0; j < productCount; j++) {
      const title = await dashboard.productLocator
        .nth(j)
        .locator(dashboard.productTitle)
        .textContent();
      const imgSrc = await dashboard.productLocator
        .nth(j)
        .locator(dashboard.productImg)
        .getAttribute("src");
      const desc = await dashboard.productLocator
        .nth(j)
        .locator(dashboard.productDesc)
        .textContent();
      const price = await dashboard.productLocator
        .nth(j)
        .locator(dashboard.productPrice)
        .textContent();
      const cartButton = dashboard.productLocator
        .nth(j)
        .locator(dashboard.productCartBtn);
      const isDisabled = (await cartButton.getAttribute("disabled")) !== null;

      productData.push({
        title: title.trim(),
        image: imgSrc,
        description: desc.trim(),
        price: price.trim(),
        cartButton: {
          cartButton,
          disabled: isDisabled,
        },
      });
    }
    return productData;
  };

  //get data for products on all pages
  collectAllProductsData = async (page, dashboard) => {
    const allProductsData = [];
    const paginationButtons = await dashboard.paginationLocator
      .locator("button")
      .all();

    for (let i = 0; i < paginationButtons.length; i++) {
      await paginationButtons[i].click();
      await page.waitForTimeout(1500);
      const productCount = await dashboard.productLocator.count();

      for (let j = 0; j < productCount; j++) {
        const title = await dashboard.productLocator
          .nth(j)
          .locator(dashboard.productTitle)
          .textContent();
        const imgSrc = await dashboard.productLocator
          .nth(j)
          .locator(dashboard.productImg)
          .getAttribute("src");
        const desc = await dashboard.productLocator
          .nth(j)
          .locator(dashboard.productDesc)
          .textContent();
        const price = await dashboard.productLocator
          .nth(j)
          .locator(dashboard.productPrice)
          .textContent();
        const cartButton = dashboard.productLocator
          .nth(j)
          .locator(dashboard.productCartBtn);
        const isDisabled = (await cartButton.getAttribute("disabled")) !== null;

        allProductsData.push({
          title: title.trim(),
          image: imgSrc,
          description: desc.trim(),
          price: price.trim(),
          cartButton: {
            cartButton,
            disabled: isDisabled,
          },
        });
      }
    }
    return allProductsData;
  };
}
