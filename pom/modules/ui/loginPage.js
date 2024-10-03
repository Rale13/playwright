export class LoginPage {
  constructor(page) {
    this.page = page;
    this.heading = page.locator("h1");
    this.emailInput = page.locator("#email");
    this.passwordlInput = page.locator("#password");
    this.submitButton = page.locator("button");
    this.errorMessage = page.locator(".text-red-600");
  }

  async login(email, password) {
    await this.emailInput.fill(email);
    await this.passwordlInput.fill(password);
    await this.submitButton.click();
  }

  async emptyEmail(password) {
    await this.passwordlInput.fill(password);
    await this.submitButton.click();
  }

  async emptyPassword(email) {
    await this.emailInput.fill(email);
    await this.submitButton.click();
  }
}
