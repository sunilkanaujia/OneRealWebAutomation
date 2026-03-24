import { test, expect } from '@playwright/test';

test('inspect sign up form', async ({ page }) => {
  await page.goto('https://app.playonereal.com/agent-signup');

  // Wait for page to load
  await page.waitForLoadState('networkidle');

  // Try to find form elements by different methods
  console.log('=== Looking for input fields ===');

  // Try by placeholder
  const firstNameByPlaceholder = page.locator('input[placeholder*="First"], input[placeholder*="first"]');
  const lastNameByPlaceholder = page.locator('input[placeholder*="Last"], input[placeholder*="last"]');
  const emailByPlaceholder = page.locator('input[placeholder*="Email"], input[placeholder*="email"], input[type="email"]');
  const passwordByPlaceholder = page.locator('input[placeholder*="Password"], input[placeholder*="password"], input[type="password"]');

  console.log('First Name by placeholder:', await firstNameByPlaceholder.count());
  console.log('Last Name by placeholder:', await lastNameByPlaceholder.count());
  console.log('Email by placeholder:', await emailByPlaceholder.count());
  console.log('Password by placeholder:', await passwordByPlaceholder.count());

  // Try by name attribute
  const firstNameByName = page.locator('input[name*="first"], input[name*="First"]');
  const lastNameByName = page.locator('input[name*="last"], input[name*="Last"]');
  const usernameByName = page.locator('input[name*="user"], input[name*="User"]');
  const emailByName = page.locator('input[name*="email"], input[name*="Email"]');

  console.log('First Name by name:', await firstNameByName.count());
  console.log('Last Name by name:', await lastNameByName.count());
  console.log('Username by name:', await usernameByName.count());
  console.log('Email by name:', await emailByName.count());

  // Get all input elements and their attributes
  const allInputs = await page.locator('input').all();
  console.log(`\nFound ${allInputs.length} input elements:`);
  for (let i = 0; i < allInputs.length; i++) {
    const input = allInputs[i];
    const name = await input.getAttribute('name') || 'no name';
    const id = await input.getAttribute('id') || 'no id';
    const type = await input.getAttribute('type') || 'no type';
    const placeholder = await input.getAttribute('placeholder') || 'no placeholder';
    const className = await input.getAttribute('class') || 'no class';
    console.log(`${i}: name="${name}", id="${id}", type="${type}", placeholder="${placeholder}", class="${className}"`);
  }

  // Look for checkboxes
  const checkboxes = await page.locator('input[type="checkbox"]').all();
  console.log(`\nFound ${checkboxes.length} checkboxes:`);
  for (let i = 0; i < checkboxes.length; i++) {
    const checkbox = checkboxes[i];
    const name = await checkbox.getAttribute('name') || 'no name';
    const id = await checkbox.getAttribute('id') || 'no id';
    const text = await checkbox.locator('xpath=ancestor::label').textContent() || 'no label text';
    console.log(`${i}: name="${name}", id="${id}", label="${text.trim()}"`);
  }

  // Look for submit button
  const submitButtons = await page.locator('button[type="submit"], input[type="submit"], button:has-text("Create"), button:has-text("Sign"), button:has-text("Submit")').all();
  console.log(`\nFound ${submitButtons.length} submit buttons:`);
  for (let i = 0; i < submitButtons.length; i++) {
    const button = submitButtons[i];
    const text = await button.textContent();
    const type = await button.getAttribute('type');
    console.log(`${i}: text="${text?.trim()}", type="${type}"`);
  }
});