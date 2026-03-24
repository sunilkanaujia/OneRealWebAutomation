# OneRealWebAutomation
RealOneWebAutomation

This repository contains Playwright automation for the RealOne agent signup workflow, using a Page Object Model (POM) plus CSV test data-driven tests.

## ✅ Project Overview

- `pages/SignUpPages.ts`: POM wrapper for agent signup form elements and actions.
- `tests/signUpPage.spec.ts`: parameterized test suite that reads multiple records from `test-data/signupTestData.csv` and executes signup flow for each row.
- `tests/inspect-form.spec.ts`: inspection utility test for form discovery (debug helper).
- `utils/testDataReader.ts`: CSV reader utility mapping test data rows into typed objects.
- `playwright.config.ts`: Playwright configuration with reporter, browser settings, parallel workers, timeouts.
- `tsconfig.json`: TypeScript compile settings with Node + Playwright type support.

## 🛠️ Prerequisites

- Node.js 18+ installed
- npm installed (bundled with Node)
- Chrome/Chromium is auto-managed by Playwright

## 📦 Clone the project

```bash
# clone from your project remote (example)
git clone https://github.com/<your-org>/OneRealWebAutomation.git
cd OneRealWebAutomation
```

## ⚙️ Setup

```bash
npm install
npx playwright install
```

## ▶️ Run tests

Run all tests:

```bash
npx playwright test
```

Run a single file in headed mode:

```bash
npx playwright test tests/signUpPage.spec.ts --headed
```

Open last report:

```bash
npx playwright show-report
```

## 📁 Test data

CSV file is in `test-data/signupTestData.csv` and contains columns:
- `firstName`
- `lastName`
- `username`
- `email`
- `password`
- `testCase`

You can add new test variations directly in that CSV file.

## 🧩 How the POM works

`SignUpPage` exposes:
- `.goto()`
- `.fillSignUpForm(...)`
- `.checkTermsAndConditions()`
- `.checkPrivacyPolicy()`
- `.submit()`
- `.signUp(...)` (end-to-end helper)

## 🐛 Common fix

- If Playwright says 
  `Cannot find module '../pages/SignUpPages.ts'`, ensure your import path is correct and file name matches exactly.
- If `fs`/`path` types are missing in TS, run:
  `npm install --save-dev @types/node`.

## 🧪 Notes

- `tests/signUpPage.spec.ts` now runs all rows from CSV during startup and creates one test per row.
- `tests/inspect-form.spec.ts` has a checkbox label lookup timeout; adjust selectors or remove if not needed.

## 📌 Version control

- Add and commit:

```bash
git add .
git commit -m "Add README + data-driven signup tests"
git push origin main
```

---

If you want, I can also add quick optional sections for CI (GitHub Actions) and branching model guidelines.
