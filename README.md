# Playwright Typescript Automation Framework

This is a sample automation framework using Playwright and Typescript.
The framework is designed to run UI and API tests in multiple browsers. It uses eslint for linting, prettier for formatting, and husky to run pre-commit checks.

**Installing Dependencies:**

```bash
npm install
```

**Installing Playwright**

```bash
npx playwright install --with-deps --chromium
npx playwright install --with-deps --webkit
npx playwright install --with-deps --firefox
```

**Running the tests:**

```bash
npm run test - Run all tests
npm run test:chrome - Run UI tests in Chromium
npm run test:webkit - Run UI tests in Webkit
npm run test:firefox - Run UI tests in Webkit
npm run test:api - Run API tests
```

**Formatting:**

```bash
npm run format:fix
```

**Linting:**

```bash
npm run lint:fix
```
