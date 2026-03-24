import { Page, Locator } from '@playwright/test';

export class SignUpPage {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly UsernameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly createAccountButton: Locator;
  readonly termsCheckbox: Locator;
  readonly privacyCheckbox: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.locator('input[placeholder*="first name" i], input[name*="first" i], input[id*="first" i]');
    this.lastNameInput = page.locator('input[placeholder*="last name" i], input[name*="last" i], input[id*="last" i]');
    this.UsernameInput = page.locator('input[placeholder*="username" i], input[name*="user" i], input[id*="user" i]');
    this.emailInput = page.locator('input[type="email"], input[placeholder*="email" i], input[name*="email" i], input[id*="email" i]');
    this.passwordInput = page.locator('input[type="password"]:near(label:has-text("Password")), input[placeholder*="password" i], input[name*="password" i], input[id*="password" i]');
    this.confirmPasswordInput = page.locator('input[placeholder*="confirm" i], input[name*="confirm" i], input[id*="confirm" i]');
    this.createAccountButton = page.locator('button[type="submit"]:has-text("Create Account"), button:has-text("Create Account"), button:has-text("Sign Up")');
    this.termsCheckbox = page.locator('input[type="checkbox"]').first();
    this.privacyCheckbox = page.locator('input[type="checkbox"]').nth(1);
  }

  async goto() {
    await this.page.goto('https://app.playonereal.com/agent-signup', { timeout: 60000 });
    await this.page.waitForLoadState('networkidle');
    await this.firstNameInput.first().waitFor({ state: 'visible', timeout: 60000 });
    await this.lastNameInput.first().waitFor({ state: 'visible', timeout: 60000 });
  }

  async screenshot(path: string) {
    await this.page.screenshot({ path, fullPage: true });
  }

  async fillSignUpForm(firstName: string, lastName: string, username: string, email: string, password: string) {
    await this.firstNameInput.first().waitFor({ state: 'visible', timeout: 60000 });
    await this.firstNameInput.first().fill(firstName, { timeout: 60000 });

    await this.lastNameInput.first().waitFor({ state: 'visible', timeout: 60000 });
    await this.lastNameInput.first().fill(lastName, { timeout: 60000 });

    await this.UsernameInput.first().waitFor({ state: 'visible', timeout: 60000 });
    await this.UsernameInput.first().fill(username, { timeout: 60000 });

    await this.emailInput.first().waitFor({ state: 'visible', timeout: 60000 });
    await this.emailInput.first().fill(email, { timeout: 60000 });

    await this.passwordInput.first().waitFor({ state: 'visible', timeout: 60000 });
    await this.passwordInput.first().fill(password, { timeout: 60000 });

    await this.confirmPasswordInput.first().waitFor({ state: 'visible', timeout: 60000 });
    await this.confirmPasswordInput.first().fill(password, { timeout: 60000 });

    if (await this.termsCheckbox.count() > 0) {
      await this.termsCheckbox.waitFor({ state: 'visible', timeout: 60000 });
      if (!(await this.termsCheckbox.isChecked())) await this.termsCheckbox.check({ timeout: 60000 });
    }

    if (await this.privacyCheckbox.count() > 0) {
      await this.privacyCheckbox.waitFor({ state: 'visible', timeout: 60000 });
      if (!(await this.privacyCheckbox.isChecked())) await this.privacyCheckbox.check({ timeout: 60000 });
    }
  }

  async checkTermsAndConditions() {
    if (!(await this.termsCheckbox.isChecked())) {
      await this.termsCheckbox.check();
    }
  }

  async checkPrivacyPolicy() {
    if (!(await this.privacyCheckbox.isChecked())) {
      await this.privacyCheckbox.check();
    }
  }

  async submit() {
    await this.createAccountButton.click();
  }

  async signUp(firstName: string, lastName: string, username: string, email: string, password: string) {
    await this.goto();
    await this.fillSignUpForm(firstName, lastName, username, email, password);
    await this.submit();
  }
}
