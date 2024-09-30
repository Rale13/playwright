export class LoginPage {
  constructor(page) {
    this.page = page;
    this.heading = page.locator("h1");
    this.emailInput = page.locator("#email");
    this.passwordlInput = page.locator("#password");
    this.submitButton = page.locator("button");
  }

  async login(email, password) {
    await this.emailInput.fill(email);
    await this.passwordlInput.fill(password);
    await this.submitButton.click();
  }
}
