export class RegisterPage {
  constructor(page) {
    this.page = page;
    this.heading = page.locator("h1");
    this.usernameInput = page.locator("#username");
    this.emailInput = page.locator("#email");
    this.passwordlInput = page.locator("#password");
    this.registerButton = page.locator("button");
  }

  async register(username, email, password) {
    await this.usernameInput.fill(username);
    await this.emailInput.fill(email);
    await this.passwordlInput.fill(password);
    await this.registerButton.click();
  }
}
